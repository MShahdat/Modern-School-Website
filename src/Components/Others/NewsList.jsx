// src/Components/Others/NewsList.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Api_Base_Url } from "../../Config/Api";

/* 🔵 ADD: simple in-memory cache that survives remounts (per tab session) */
let cachedSchoolData = null;          // holds the last good data
let schoolDataPromise = null;         // dedupe concurrent fetches

const NewsList = () => {
  const [schoolData, setSchoolData] = useState(cachedSchoolData);
  const [loading, setLoading] = useState(!cachedSchoolData);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If we already have cache, don't fetch again.
    if (cachedSchoolData) return;

    // Reuse in-flight request if it exists; otherwise, start one.
    if (!schoolDataPromise) {
      schoolDataPromise = fetch(`${Api_Base_Url}/`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch school data");
          return res.json();
        })
        .then((data) => {
          cachedSchoolData = data; // ✅ cache the data
          return data;
        })
        .finally(() => {
          schoolDataPromise = null; // clear the in-flight marker
        });
    }

    setLoading(true);
    setError(null);

    schoolDataPromise
      .then((data) => setSchoolData(data))
      .catch((err) => setError(err.message || "Failed to load school data."))
      .finally(() => setLoading(false));
  }, []);

  /* (Optional) manual refresh helper — clears cache & refetches
  const refetch = () => {
    cachedSchoolData = null;
    schoolDataPromise = null;
    setLoading(true);
    setError(null);
    fetch(`${Api_Base_Url}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch school data");
        return res.json();
      })
      .then((data) => {
        cachedSchoolData = data;
        setSchoolData(data);
      })
      .catch((err) => setError(err.message || "Failed to load school data."))
      .finally(() => setLoading(false));
  };
  */

  if (loading) {
    // shimmer placeholders to mirror your 4-col grid and card layout
    const placeholders = Array.from({ length: 8 });
    return (
      <div className="bg-blue-950 p-8 xl:px-30">
        <hr className="border-t border-2 border-gray-500 mt-2 mb-12" />

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
                {/* excerpt shimmer */}
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

  return (
    <div className="bg-blue-950 ">
      <div className="p-8 xl:px-10 max-w-7xl mx-auto">
      <div className="">
        <h3 className="text-center text-3xl md:text-4xl font-bold text-white mb-4">
          Latest News
        </h3>
        {/* Optional manual refresh button:
        <button
          onClick={refetch}
          className="bg-white/10 border border-white/30 text-white px-3 py-1 rounded hover:bg-white/20"
        >
          Refresh
        </button>
        */}
      </div>

      <hr className="border-t border-2 border-gray-500 mt-2 mb-8" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {schoolData?.news?.map((news) => (
          <div
            key={news.id}
            className="border border-indigo-200 rounded-xl shadow-lg overflow-hidden bg-white transition-transform hover:scale-105 duration-300"
          >
            <img
              src={news.cover_image}
              alt={news.title}
              className="w-full h-50 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-indigo-800 line-clamp-1">
                {news.title}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                📅 {news.created_at ? new Date(news.created_at).toLocaleDateString() : ""}
              </p>
              <div
                className="mt-3 text-gray-700 line-clamp-1"
                dangerouslySetInnerHTML={{
                  __html: String(news.content ?? "").replace(/\n/g, "<br />"),
                }}
              />
              <div className="flex gap-4 mt-5">
                <Link
                  to={`/news/${news.id}`}
                  className="bg-indigo-800 font-bold text-white px-4 py-2 rounded shadow hover:bg-indigo-900"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
        {!schoolData?.news?.length && (
          <div className="text-white col-span-full text-center">No news available.</div>
        )}
      </div>
    </div>
    </div>
  );
};

export default NewsList;
