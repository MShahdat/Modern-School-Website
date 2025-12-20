import React, { useEffect, useRef, useState } from "react";
import { Api_Base_Url } from "../../Config/Api";

const slides = [
  { src: "https://images.unsplash.com/photo-1643391448949-735f48c6ef66?q=80&w=2031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", label: "Building 1" },
  { src: "https://images.unsplash.com/photo-1595330448228-ccde89758273?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", label: "Building 2" },
  { src: "https://images.unsplash.com/photo-1667646639495-8865f3ea638b?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", label: "ICT Lab" },
  { src: "https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg", label: "Library" },
  { src: "https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", label: "Play Ground" },
];

const TRANSITION_MS = 2000;
const INTERVAL_MS = 3000;

const Ab = () => {
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
  }, []);

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

  // ---- early returns are now AFTER all hooks
  if (loading) {
    return <div className="text-center py-4 text-gray-500">Loading school information...</div>;
  }
  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <section className="w-full bg-gray-50 dark:bg-black dark:text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left */}
          <div>
            <h2 className=" text-3xl dark:text-white sm:text-4xl font-semibold text-slate-800">
              About Dania University Collage
            </h2>
            <div className="mt-3">
              <div className="h-[3px] w-28 bg-blue-400 rounded-full" />
              <div className="h-[3px] w-20 bg-blue-300 rounded-full mt-1" />
            </div>
            <p className="text-[16px] sm:text-[17px] leading-relaxed tracking-wider text-justify mt-4 text-black/70 dark:text-white/90 line-clamp-9">
              {schoolData?.about_text}
            </p>
            <a
              href="/about"
              className="inline-flex items-center font-semibold gap-2 mt-12 px-6 py-2.5 rounded text-white bg-blue-900 dark:bg-white dark:text-black/80 shadow-md transition"
            >
              Learn More About Us
            </a>
          </div>

          {/* Right: slider */}
          <div
            className="bg-white dark:text-black/80 rounded-3xl shadow-xl p-8 relative flex items-center justify-center min-h-[420px]"
            onMouseEnter={stopAuto}
            onMouseLeave={startAuto}
          >
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl h-66 sm:h-68 md:h-80 lg:h-80 xl:h-96 overflow-hidden">
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
                    <p className="text-center font-semibold mt-3">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={prev}
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow hover:bg-slate-100"
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow hover:bg-slate-100"
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
  );
};

export default Ab;
