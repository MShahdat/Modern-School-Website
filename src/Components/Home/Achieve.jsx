// src/Components/Others/Events.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Api_Base_Url } from "../../Config/Api";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

/* per-tab cache */
let cachedSchoolData = null;
let schoolDataPromise = null;

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Arrow buttons (unchanged)
const ArrowBtn = ({ direction = "prev", onClick, className = "", style = {} }) => {
  const sideStyle =
    direction === "prev" ? { left: "-12px", right: "auto" } : { right: "-12px", left: "auto" };

  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous" : "Next"}
      onClick={onClick}
      className={`${className} !grid place-items-center !w-12 !h-12 !rounded-md !text-white !shadow-md`}
      style={{ ...style, ...sideStyle, display: "grid", zIndex: 50, position: "absolute" }}
    />
  );
};
const PrevArrow = (props) => <ArrowBtn direction="prev" {...props} />;
const NextArrow = (props) => <ArrowBtn direction="next" {...props} />;

const Achieve = () => {
  const [schoolData, setSchoolData] = useState(cachedSchoolData);
  const [loading, setLoading] = useState(!cachedSchoolData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cachedSchoolData) return;

    if (!schoolDataPromise) {
      schoolDataPromise = fetch(`${Api_Base_Url}/`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch school data");
          return res.json();
        })
        .then((data) => {
          cachedSchoolData = data;
          return data;
        })
        .catch((err) => { throw err; })
        .finally(() => { schoolDataPromise = null; });
    }

    setLoading(true);
    setError(null);

    schoolDataPromise
      .then((data) => setSchoolData(data))
      .catch((err) => setError(err.message || "Failed to load school data."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    const placeholders = Array.from({ length: 4 });
    return (
      <div className="bg-blue-950 px-8 py-8 xl:px-30">
        <div className="flex justify-center">
          <h3 className="h-5 w-1/4 flex bg-gray-200 rounded animate-pulse mb-2"></h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {placeholders.map((_, i) => (
            <div key={i} className="border border-indigo-200 rounded-xl shadow-lg overflow-hidden bg-white">
              <div className="w-full h-50 bg-gray-200 animate-pulse" />
              <div className="p-4">
                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="mt-2 h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
                <div className="mt-3 space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="flex gap-4 mt-5">
                  <div className="h-9 w-28 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  const achieve = schoolData?.achievements ?? [];
  const displayAchieve = achieve.slice(0, 5); // we’ll use up to 6 items
  const leftSlides = displayAchieve;          // feed all to the left slider
  const rightItems = displayAchieve.slice(1, 5); // next 4 for the right 2×2 grid

  const sliderSettings = {
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    pauseOnHover: false,
    arrow: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    fade: false, // keep slide; can set true if you prefer fade
    cssEase: "ease-in-out",
  };

  return (
    <div className="bg-blue-950 text-white">
      <div className=" px-4 py-16 max-w-7xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Our Achievements
        </h3>
      <hr className="border-t border-2 border-gray-300 mt-2 mb-16" />

      {/* 2-column layout: left slider, right 2×2 grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: big slider (image bg, overlay date+title) */}
        <div className="w-full">
          <Slider {...sliderSettings}>
            {leftSlides.map((ev) => {
              return (
                <Link key={ev.id} to={`/achievements/${ev.id}`} className="group block bg-white rounded-2xl">
                  <article className="relative h-[380px] md:h-[430px] lg:h-[470px] rounded-xl overflow-hidden shadow">
                    {/* background image */}
                    <img
                      src={ev.cover_image}
                      alt={ev.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-115"
                    />
                    {/* overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    {/* content (front) */}
                    <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                      <h2 className="text-white text-2xl md:text-3xl font-extrabold leading-snug">
                        {ev.title}
                      </h2>
                    </div>
                  </article>
                </Link>
              );
            })}
          </Slider>
        </div>

        {/* RIGHT: 2×2 grid of smaller cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rightItems.map((ev) => {
            return (
              <Link key={ev.id} to={`/achievements/${ev.id}`} className="group block bg-white rounded-2xl">
                <article className="relative h-[220px] md:h-[230px] rounded-xl overflow-hidden shadow">
                  {/* background image */}
                  <img
                    src={ev.cover_image}
                    alt={ev.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  />
                  {/* overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                  {/* content */}
                  <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                    <h3 className="text-white text-lg font-bold leading-snug line-clamp-1">
                      {ev.title}
                    </h3>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>

      {/* See More (optional) */}
      {displayAchieve.length > 4 && (
        <div className="flex justify-end mt-4">
          <Link
            to="/achievements"
            className="inline-flex items-center gap-2 bg-white text-blue-900 font-bold px-6 py-2 rounded shadow transition hover:bg-blue-900 hover:text-white hover:scale-105 duration-200"
          >
            View all Achieve
            <span className="text-xl">
              <MdKeyboardDoubleArrowRight />
            </span>
          </Link>
        </div>
      )}
    </div>
    </div>
  );
};

export default Achieve;
