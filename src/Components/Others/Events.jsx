// src/Components/Others/Events.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // use DOM router
import { Api_Base_Url } from "../../Config/Api";

/* 🔵 ADD: per-tab cache (persists until hard refresh) */
let cachedSchoolData = null;
let schoolDataPromise = null;

const Events = () => {
  // 🔵 init from cache so revisits don't show loader/refetch
  const [schoolData, setSchoolData] = useState(cachedSchoolData);
  const [loading, setLoading] = useState(!cachedSchoolData);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If we already have cached data, don't fetch again
    if (cachedSchoolData) return;

    // Deduplicate in-flight requests across mounts
    if (!schoolDataPromise) {
      schoolDataPromise = fetch(`${Api_Base_Url}/`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch school data");
          return res.json();
        })
        .then((data) => {
          cachedSchoolData = data; // cache for this tab
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
      .catch((err) =>
        setError(err.message || "Failed to load school data.")
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    // 🔵 Shimmer placeholders matching the grid/card layout
    const placeholders = Array.from({ length: 8 });
    return (
      <div className="bg-blue-950 p-8 xl:px-30">
        <div className="flex justify-center">
          <h3 className="h-5 w-1/4 flex bg-gray-200 rounded animate-pulse mb-2"></h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {placeholders.map((_, i) => (
            <div
              key={i}
              className="border border-indigo-200 rounded-xl shadow-lg overflow-hidden bg-white"
            >
              {/* image shimmer */}
              <div className="w-full h-50 bg-gray-200 animate-pulse" />
              <div className="p-4">
                {/* title shimmer */}
                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                {/* date shimmer */}
                <div className="mt-2 h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
                {/* description shimmer */}
                <div className="mt-3 space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
                </div>
                {/* button shimmer */}
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

  const events = schoolData?.events ?? [];

  return (
    <div className="bg-blue-950">
      <div className=" p-8 xl:px-00 max-w-7xl mx-auto">
      <h3 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
        Our Events
      </h3>
      <hr className="border-t border-2 border-gray-500 mt-2 mb-8" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {events.map((ev) => {
          // Support both HTML and plain text with newlines
          const descHTML = String(ev.description ?? "").replace(/\n/g, "<br />");
          return (
            <div
              key={ev.id}
              className="border border-indigo-200 rounded-xl shadow-lg overflow-hidden bg-white transition-transform hover:scale-105 duration-300"
            >
              <img
                src={ev.cover_image}
                alt={ev.title}
                className="w-full h-50 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-indigo-800 line-clamp-1">
                  {ev.title}
                </h2>
                <p className="text-gray-600 text-sm mt-1">📅 {ev.event_date}</p>

                <p
                  className="mt-3 text-gray-700 line-clamp-1"
                  dangerouslySetInnerHTML={{ __html: descHTML }}
                />

                <div className="flex gap-4 mt-5">
                  <Link
                    to={`/events/${ev.id}`}
                    className="bg-indigo-800 font-bold text-white px-4 py-2 rounded shadow hover:bg-indigo-900"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {!events.length && (
          <div className="text-white col-span-full text-center">
            No events available.
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Events;
