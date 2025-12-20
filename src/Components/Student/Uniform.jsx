import React, { useEffect, useRef, useState } from "react";
import { Api_Base_Url } from "../../Config/Api";

const slides = [
  { src: "https://plus.unsplash.com/premium_photo-1666299838867-612f28932a3d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", label: "ICT Lab" },
  { src: "https://images.unsplash.com/photo-1765248150235-511eb3270671?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D", label: "Library" },
  { src: "https://images.unsplash.com/photo-1729284440498-19b2295ac7bb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", label: "Play Ground" },
];

const TRANSITION_MS = 2000;
const INTERVAL_MS = 3000;

const Uniform = () => {
  // ---- data hooks
  const [schoolData, setSchoolData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ---- slider hooks (MUST be before any early return)
  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];
  const [index, setIndex] = useState(1);
  const [transitionMs, setTransitionMs] = useState(TRANSITION_MS);
  const timerRef = useRef(null);

  const stopAuto = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  const startAuto = () => {
    stopAuto();
    timerRef.current = setInterval(() => {
      setIndex((i) => i + 1);
    }, INTERVAL_MS);
  };

  useEffect(() => {
    startAuto();
    return stopAuto;
  },);

  // fetch effect
  useEffect(() => {
    fetch(`${Api_Base_Url}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch school data");
        return res.json();
      })
      .then((data) => {
        setSchoolData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load school data.");
        setLoading(false);
      });
  }, []);

  const handleTransitionEnd = () => {
    if (index === extendedSlides.length - 1) {
      setTransitionMs(0);
      setIndex(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitionMs(TRANSITION_MS));
      });
    } else if (index === 0) {
      setTransitionMs(0);
      setIndex(extendedSlides.length - 2);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitionMs(TRANSITION_MS));
      });
    }
  };

  const goTo = (i) => {
    setTransitionMs(TRANSITION_MS);
    setIndex(i + 1);
  };
  const prev = () => setIndex((i) => i - 1);
  const next = () => setIndex((i) => i + 1);
  const realActive = (index - 1 + slides.length) % slides.length;

  // ---- loading shimmer (only this block is new)
  if (loading) {
    return (
      <section className="w-full bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left skeleton */}
            <div className="w-full">
              <div className="animate-pulse">
                <div className="h-8 sm:h-10 w-64 bg-gray-200 rounded mb-3" />
                <div className="space-y-1.5">
                  <div className="h-[3px] w-28 bg-gray-200 rounded-full" />
                  <div className="h-[3px] w-20 bg-gray-200 rounded-full" />
                </div>
                <div className="mt-4 space-y-3">
                  <div className="h-5 sm:h-6 w-full bg-gray-200 rounded" />
                  <div className="h-5 sm:h-6 w-11/12 bg-gray-200 rounded" />
                  <div className="h-5 sm:h-6 w-10/12 bg-gray-200 rounded" />
                  <div className="h-5 sm:h-6 w-9/12 bg-gray-200 rounded" />
                  <div className="h-5 sm:h-6 w-8/12 bg-gray-200 rounded" />
                  <div className="h-5 sm:h-6 w-7/12 bg-gray-200 rounded" />
                  <div className="h-5 sm:h-6 w-6/12 bg-gray-200 rounded" />
                  <div className="h-5 sm:h-6 w-5/12 bg-gray-200 rounded" />
                </div>
              </div>
            </div>

            {/* Right skeleton (card + image) */}
            <div className="bg-white rounded-3xl shadow-xl p-8 relative flex items-center justify-center min-h-[420px]">
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 overflow-hidden">
                <div className="w-full h-full animate-pulse">
                  <div className="w-full h-full bg-gray-200 rounded-xl" />
                  <div className="mt-3 h-4 w-24 bg-gray-200 rounded mx-auto" />
                </div>
              </div>

              {/* Dots */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="h-2.5 w-2.5 rounded-full bg-gray-200 animate-pulse"
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow opacity-60" />
              <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow opacity-60" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-50 dark:bg-black/80">
      <section className="w-full py-8">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left */}
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-slate-800 dark:text-white/90">
              Students Uniform
            </h2>
            <div className="mt-3">
              <div className="h-[3px] w-28 bg-blue-400 rounded-full" />
              <div className="h-[3px] w-20 bg-blue-300 rounded-full mt-1" />
            </div>
            <div className="text-[16px] md:text-[17px] text-justify mt-4 text-gray-600 line-clamp-14 dark:text-white/90 leading-relaxed tracking-wider">
                <div>
                  <p className="text-lg font-semibold underline ">Boys</p>
                  <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam impedit fuga fugit voluptate tempora ex nobis excepturi, quidem in quis minus itaque ipsam dicta ratione pariatur, officiis a autem distinctio corporis earum laudantium incidunt similique obcaecati deserunt! Esse, obcaecati aliquam?</p>
                </div>
                <div className="mt-4">
                  <p className="text-lg font-semibold underline ">Girls</p>
                  <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, eos? Quaerat obcaecati id distinctio quo corporis iusto tempora eius. Sint dolore explicabo provident, nostrum vel quam error autem laborum placeat?</p>
                </div>
            </div>
          </div>

          {/* Right: slider */}
          <div
            className="bg-white rounded-3xl shadow-xl p-8 relative flex items-center justify-center"
            onMouseEnter={stopAuto}
            onMouseLeave={startAuto}
          >
            <div className="w-full h-[400px] overflow-hidden">
              <div
                className="flex transition-transform ease-in-out h-full"
                style={{
                  transform: `translateX(-${index * 100}%)`,
                  transitionDuration: `${transitionMs}ms`,
                }}
                onTransitionEnd={handleTransitionEnd}
                aria-live="polite"
              >
                {extendedSlides.map((s, i) => (
                  <div key={`${s.src}-${i}`} className="w-full h-full flex-shrink-0 flex flex-col items-center">
                    <img
                      src={s.src}
                      alt={s.label}
                      className="w-full h-full object-cover border-4 border-white shadow-lg"
                    />
                    <p className="text-center text-black font-semibold mt-3">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={prev}
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/80 shadow hover:bg-slate-100"
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/80 shadow hover:bg-slate-100"
              aria-label="Next slide"
            >
              ›
            </button>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2.5 w-2.5 rounded-full ${i === realActive ? "bg-blue-300" : "bg-gray-200"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Uniform;
