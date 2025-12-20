// src/Components/Others/Events.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Api_Base_Url } from "../../Config/Api";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

/* per-tab cache */
let cachedSchoolData = null;
let schoolDataPromise = null;

const Event = () => {
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
    const placeholders = Array.from({ length: 6 });
    return (
      <div className="bg-blue-50 p-12 xl:px-30">
        <div className="flex justify-center">
          <h3 className="h-5 w-1/4 flex bg-gray-200 rounded animate-pulse mb-2"></h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {placeholders.map((_, i) => (
            <div key={i} className="border border-indigo-200 rounded-xl shadow-lg overflow-hidden bg-white">
              <div className="w-full h-40 bg-gray-200 animate-pulse" />
              <div className="p-4">
                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="mt-2 h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
                <div className="mt-3 space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
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

  const events = schoolData?.events ?? [];
  const displayEvents = events.slice(0, 6);

  const get = (idx) => displayEvents[idx];

  /* Small card: image on top, meta below; whole card is a Link. */
  const CardSm = ({ ev }) => (
    <Link
      to={`/events/${ev.id}`}
      className="group block border border-indigo-200 rounded-xl shadow-lg overflow-hidden bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
    >
      <div className="w-full h-40 md:h-44 xl:h-52 overflow-hidden">
        <img
          src={ev.cover_image}
          alt={ev.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-115"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold text-indigo-800 line-clamp-1">{ev.title}</h2>
        <p className="text-gray-600 font-bold text-sm mt-1">📅 {ev.event_date}</p>
      </div>
    </Link>
  );

  /* Large hero card: background image with bottom gradient overlay; whole card is a Link. */
  const CardLg = ({ ev }) => (
    <Link
      to={`/events/${ev.id}`}
      className="group block relative border border-indigo-200 rounded-xl shadow-lg overflow-hidden bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    >
      {/* image layer */}
      <div className="relative w-full h-64 md:h-72 xl:h-[18rem] overflow-hidden">
        <img
          src={ev.cover_image}
          alt={ev.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-115"
        />
        {/* gradient overlay + text */}
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 lg:p-7 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
          <p className="text-white/90 text-md mb-1 font-bold">📅 {ev.event_date}</p>
          <h2 className="text-white text-2xl md:text-3xl font-extrabold leading-snug line-clamp-2">
            {ev.title}
          </h2>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="bg-blue-950">
      <div className=" px-4 py-16 max-w-7xl mx-auto">
      <h3 className=" text-4xl font-bold text-center text-white mb-4">Our Events</h3>
      <hr className="border-t border-2 border-gray-500 mt-2 mb-16" />

      {/* Layout:
          Row 1 -> Left big (never grid), Right two small
          Row 2 -> Left two small, Right big (never grid)
      */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Row 1 */}
        <div className="xl:col-span-6">
          {get(0) && <CardLg ev={get(0)} />}
        </div>
        <div className="xl:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {get(1) && <CardSm ev={get(1)} />}
          {get(2) && <CardSm ev={get(2)} />}
        </div>

        {/* Row 2 */}
        <div className="xl:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 xl:mt-0">
          {get(3) && <CardSm ev={get(3)} />}
          {get(4) && <CardSm ev={get(4)} />}
        </div>
        <div className="xl:col-span-6">
          {get(5) && <CardLg ev={get(5)} />}
        </div>
      </div>

      {displayEvents.length > 4 && (
        <div className="flex justify-end mt-4">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 bg-white text-blue-900 font-bold px-6 py-2 rounded shadow transition hover:bg-blue-900 hover:text-white hover:scale-105 duration-200"
          >
            View all Events
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

export default Event;
