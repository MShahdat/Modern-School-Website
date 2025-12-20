// src/Components/Others/NewsList.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Api_Base_Url } from "../../Config/Api";

/* 🔵 ADD: per-tab session cache (persists until hard refresh) */
let cachedSchoolData = null;
let schoolDataPromise = null;

const Achievements = () => {
  const [schoolData, setSchoolData] = useState(cachedSchoolData);  // init from cache
  const [loading, setLoading] = useState(!cachedSchoolData);       // skip loader if cached
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cachedSchoolData) return; // Already cached, no fetch

    if (!schoolDataPromise) {
      schoolDataPromise = fetch(`${Api_Base_Url}/`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch school data");
          return res.json();
        })
        .then((data) => {
          cachedSchoolData = data;   // cache once
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
    const placeholders = Array.from({ length: 8 });
    return (
      <div className="bg-blue-950 p-8">
        <h3 className="font-marko-one text-4xl font-bold text-center text-white mb-4">
          Our Achievements
        </h3>
        <hr className="border-t border-2 border-gray-500 mt-2 mb-12" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {placeholders.map((_, i) => (
            <div
              key={i}
              className="border border-indigo-200 rounded-xl shadow-lg overflow-hidden bg-white"
            >
              <div className="w-full h-[200px] bg-gray-200 animate-pulse" />
              <div className="p-4">
                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
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

  return (
    <div className="bg-blue-950">
      <div className="max-w-7xl mx-auto p-8">
        <h3 className="text-4xl font-bold text-center text-white mb-4">
          Our Achievements
        </h3>
        <hr className="border-t border-2 border-gray-500 mt-2 mb-12" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {schoolData?.achievements?.map((news) => (
            <div
              key={news.id}
              className="border border-indigo-200 rounded-xl shadow-lg overflow-hidden bg-white transition-transform hover:scale-105 duration-300"
            >
              <img
                src={news.cover_image}
                alt={news.title}
                className="w-full h-[200px] object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-indigo-800 line-clamp-1">
                  {news.title}
                </h2>

                <div
                  className="mt-2 text-gray-700 line-clamp-1"
                  dangerouslySetInnerHTML={{
                    __html: String(news.description ?? "").replace(/\n/g, "<br />"),
                  }}
                />

                <div className="flex gap-4 mt-5">
                  <Link
                    to={`/achievements/${news.id}`}
                    className="bg-indigo-800 font-bold text-white px-4 py-1.5 rounded shadow hover:bg-indigo-900"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* ✅ fixed: check achievements, not news */}
          {!schoolData?.achievements?.length && (
            <div className="text-white col-span-full text-center">
              No Achievements available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
