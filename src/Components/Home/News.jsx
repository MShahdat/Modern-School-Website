// src/Components/Others/Events.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // use DOM router
import { Api_Base_Url } from "../../Config/Api";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";


/* 🔵 ADD: per-tab cache (persists until hard refresh) */
let cachedSchoolData = null;
let schoolDataPromise = null;

/* 🔵 Slider (react-slick) */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* Optional: simple custom arrows (click areas inherit slick styles) */
const NextArrow = (props) => <div {...props} className="slick-arrow slick-next !right-2 z-10" />;
const PrevArrow = (props) => <div {...props} className="slick-arrow slick-prev !left-2 z-10" />;

const News = () => {
  // 🔵 init from cache so revisits don't show loader/refetch
  const [schoolData, setSchoolData] = useState(cachedSchoolData);
  const [loading, setLoading] = useState(!cachedSchoolData);
  const [error, setError] = useState(null);

  const getSlidesToShow = (width) => {
        if (!width) return 4
        if (width <= 639) return 1
        if (width <= 767) return 2
        if (width <= 1024) return 3
        return 4
    }

    const [slidesToShow, setSlidesToShow] = useState(() => {
        if (typeof window !== 'undefined') return getSlidesToShow(window.innerWidth)
        return 4
    })

  useEffect(() => {
        const handleResize = () => setSlidesToShow(getSlidesToShow(window.innerWidth))
        // ensure correct value on mount
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])



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
        .catch((err) => {
          throw err;
        })
        .finally(() => {
          schoolDataPromise = null;
        });
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
      <div className="bg-blue-950 p-8 xl:px-30">
        <div className="flex justify-center">
          <h3 className="h-5 w-1/4 flex bg-gray-200 rounded animate-pulse mb-2"></h3>
        </div>
        <hr className="border-t border-2 border-gray-500 mt-2 mb-12" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {placeholders.map((_, i) => (
            <div
              key={i}
              className="border border-indigo-200 rounded-xl shadow-lg overflow-hidden bg-white"
            >
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

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  const news = schoolData?.news ?? [];
  const displaynews = news.slice(0, 6);

  


  // ✅ Responsive slider config
  const settings = {
    infinite: true,
    speed: 3500,
    slidesToShow: slidesToShow, // XL default
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280, // <1280px
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 1024, // <1024px
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768, // <768px
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="bg-blue-50 dark:bg-black/80">
      <div className=" px-12 py-16 max-w-7xl mx-auto">
        <h3 className="text-4xl font-bold text-center dark:text-white text-blue-900 mb-4">
          Latest News
        </h3>
        <hr className="border-t border-2 border-black/10 dark:border-white/15 mt-2 mb-16" />

        {displaynews.length > 0 ? (
          <Slider {...settings}>
            {displaynews.map((ev) => (
              <div key={ev.id} className="px-2">
                <div className="border border-indigo-200 rounded-xl shadow-lg overflow-hidden bg-white ">
                  <img
                    src={ev.cover_image}
                    alt={ev.title}
                    className="w-full h-40 object-cover transition-transform hover:scale-115 duration-700"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-bold text-indigo-800 line-clamp-1">
                      {ev.title}
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      📅 {ev.created_at ? new Date(ev.created_at).toLocaleDateString() : ""}
                    </p>

                    <div className="flex gap-4 mt-5">
                      <Link
                        to={`/news/${ev.id}`}
                        className=" font-bold text-blue-900 px-4 py-1.5 rounded shadow"
                      >
                        View Details..
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="text-white text-center">No events available.</div>
        )}

        {news.length > 4 && (
          <div className="flex justify-end mt-4">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-white bg-blue-900 font-bold px-6 py-2 rounded shadow transition hover:bg-blue-950 hover:scale-105 duration-200"
            >
              View all News
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

export default News;
