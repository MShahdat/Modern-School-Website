import React, { useState, useEffect, useMemo } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { Api_Base_Url } from "../../Config/Api";

const roleTitle = (role = "") => {
  const r = role.toLowerCase();
  if (r.includes("principal")) return "Principal";
  if (r.includes("chairman")) return "Chairman";
  return "Leadership";
};

// Arrow buttons (unchanged)
const ArrowBtn = ({ direction = "prev", onClick, className = "", style = {} }) => {
  const sideStyle =
    direction === "prev" ? { left: "-12px", right: "auto" } : { right: "-12px", left: "auto" };

  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous" : "Next"}
      onClick={onClick}
      className={`${className} !grid place-items-center !w-12 !h-12 !rounded-md !bg-[#0b1f3a] !text-white !shadow-md hover:opacity-90`}
      style={{ ...style, ...sideStyle, display: "grid", zIndex: 50, position: "absolute" }}
    />
  );
};
const PrevArrow = (props) => <ArrowBtn direction="prev" {...props} />;
const NextArrow = (props) => <ArrowBtn direction="next" {...props} />;

/* ---------- Shimmer (skeleton) while loading ---------- */
const ShimmerSlide = () => (
  <div>
    <article className="relative bg-white border border-gray-200 rounded-2xl shadow-sm">
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 px-8 py-6 md:px-16 md:py-18 animate-pulse">
        <div className="lg:col-span-1">
          <div className="flex flex-col items-center lg:items-start gap-4">
            <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gray-200" />
            <div className="w-3/4 h-6 bg-gray-200 rounded" />
            <div className="w-1/2 h-4 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="h-8 w-2/3 bg-gray-200 rounded mb-4" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-11/12 bg-gray-200 rounded" />
            <div className="h-4 w-10/12 bg-gray-200 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
          </div>
          <div className="mt-6">
            <div className="h-10 w-36 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>
    </article>
  </div>
);

const Hero1 = () => {
  const [schoolData, setSchoolData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const leaders = useMemo(() => {
    const list = Array.isArray(schoolData?.leaderships) ? schoolData.leaderships : [];
    const filtered = list.filter((p) => /principal|chairman/i.test(p?.role || ""));
    const roleWeight = (r = "") => {
      const s = r.toLowerCase();
      if (s.includes("chairman")) return 0;
      if (s.includes("principal")) return 1;
      return 2;
    };
    const chosen = (filtered.length ? filtered : list).slice();
    chosen.sort((a, b) => roleWeight(a?.role) - roleWeight(b?.role));
    return chosen;
  }, [schoolData]);

  if (loading)
    return (
      <section className="bg-[#122449] -mt-2">
        <div className="relative px-4 xl:px-30 mx-auto py-16 max-w-[1440px] overflow-visible">
          <ShimmerSlide />
        </div>
      </section>
    );

  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  /* === SLIDER SETTINGS: remove slide motion & use fade (no left→right) === */
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,          // fade duration
    fade: true,           // <-- disables horizontal slide
    cssEase: "ease-in-out",
    pauseOnHover: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="dark:bg-black/80">
      <section className="bg-white dark:bg-black/80 -mt-0 max-w-7xl mx-auto">
      {/* 🔹 Zoom animation styles (PowerPoint-like) */}
      <style>{`
        /* Apply a Ken Burns zoom-in on the active slide's photo */
        .slick-current .hero-zoom-img {
          animation: heroPptZoom 4s ease-in-out both;
          transform-origin: center center;
          will-change: transform, filter;
        }
        @keyframes heroPptZoom {
          0%   { transform: scale(1.10); filter: brightness(0.98); }
          100% { transform: scale(1.00); filter: brightness(1); }
        }
      `}</style>

      <div className="relative px-4 xl:px-30 mx-auto py-16 max-w-[1440px] overflow-visible">
        <Slider {...settings}>
          {leaders.map((leader) => {
            const slug = String(leader?.role || "").toLowerCase().replace(/\s+/g, "-");
            const title = roleTitle(leader?.role);
            const messageHTML = String(leader?.message ?? "").replace(/\n/g, "<br />");

            return (
              <div key={leader?.id || leader?.name}>
                <article className="relative bg-blue-950 border text-white border-gray-200 rounded-2xl shadow-sm">
                  <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 px-8 py-6 md:px-24 md:py-18">
                    {/* Left 1/3 */}
                    <div className="lg:col-span-1">
                      <div className="flex flex-col items-center lg:items-start gap-4">
                        <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-white shadow grid place-items-center overflow-hidden">
                          {/* 🔹 Zoom is applied to this image when its slide is active */}
                          <img
                            src={leader?.photo}
                            alt={leader?.name}
                            className="w-full h-full object-cover hero-zoom-img"
                            loading="lazy"
                          />
                        </div>
                        <div className="text-center lg:text-left">
                          <h3 className="text-xl sm:text-2xl font-extrabold  uppercase">{leader?.name}</h3>
                          <p className=" text-base md:text-lg font-semibold mt-1">{leader?.role}</p>
                        </div>
                      </div>
                    </div>

                    {/* Right 2/3 */}
                    <div className="lg:col-span-2 text-white">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
                        {`Message from ${title},`}
                      </h3>

                      {leader?.message && (
                        <p
                          className=" leading-relaxed text-base md:text-lg text-justify tracking-wider line-clamp-4 sm:line-clamp-5"
                          dangerouslySetInnerHTML={{ __html: messageHTML }}
                        />
                      )}

                      <div className="mt-6">
                        <Link to={`/${slug}`}>
                          <button className="px-6 py-2 rounded-sm text-blue-900 bg-white font-semibold shadow hover:shadow-lg hover:bg-white transition">
                            See More
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </Slider>
      </div>

      <style>{`
        .custom-dots li.slick-active .bubble { opacity: 1; transform: scale(1.1); }
        .slick-prev, .slick-next { top: 50%; transform: translateY(-50%); }
      `}</style>
    </section>
    </div>
  );
};

export default Hero1;
