// src/Components/Others/Activity.jsx
import React, { useState, useEffect } from "react";
import { Api_Base_Url } from "../../Config/Api";

let cachedSchoolData = null;
let schoolDataPromise = null;

const BG_COLORS = [
  "bg-gradient-to-br from-indigo-100 to-indigo-200",   // Soft Indigo
  "bg-gradient-to-br from-sky-100 to-sky-200",        // Sky Blue
  "bg-gradient-to-br from-teal-100 to-teal-200",       // Teal
  "bg-gradient-to-br from-emerald-100 to-emerald-200", // Emerald
  "bg-gradient-to-br from-amber-100 to-amber-200",     // Warm Amber
  "bg-gradient-to-br from-rose-100 to-rose-200",       // Rose
  "bg-gradient-to-br from-purple-100 to-purple-200",   // Purple
  "bg-gradient-to-br from-cyan-100 to-cyan-200",       // Cyan
  "bg-gradient-to-br from-lime-100 to-lime-200",       // Lime
];


const Activity = () => {
  const [schoolData, setSchoolData] = useState(cachedSchoolData);
  const [loading, setLoading] = useState(!cachedSchoolData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cachedSchoolData) return;

    if (!schoolDataPromise) {
      schoolDataPromise = fetch(`${Api_Base_Url}/`)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch school data');
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
      .catch((err) => setError(err.message || 'Failed to load school data.'))
      .finally(() => setLoading(false));
  }, []);

  // Shimmer while loading (design unchanged)
  if (loading) {
    const placeholders = Array.from({ length: 6 });
    return (
      <section className="px-4 py-8 xl:px-30 mx-auto bg-white">
        <div className="flex justify-center">
          <h3 className="h-5 w-1/4 flex bg-gray-200 rounded animate-pulse"></h3>
        </div>
        <hr className="border-t border-2 border-gray-50 mt-2 mb-12" />

        <div className="px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {placeholders.map((_, idx) => (
              <div
                key={idx}
                className={`${BG_COLORS[idx % BG_COLORS.length]} border border-gray-200 rounded-xl p-6 hover:shadow-md transition hover:duration-300 hover:scale-105`}
              >
                <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-10/12 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
        <div className="px-8 py-16 text-red-600">{error}</div>
    );
  }

  return (
    <div className="bg-white dark:bg-black/80">
      <section className="px-4 py-8 mx-auto max-w-7xl">
      <h2 className="text-2xl dark:text-white/90 md:text-4xl font-bold text-center text-blue-900 mb-4">
        Co-Curricular Activity
      </h2>
      <hr className="border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-0" />
      <div className="px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {schoolData?.extra_activities.map((item, idx) => {
            const bg = BG_COLORS[idx % BG_COLORS.length]; // 15 colors, used serially
            return (
              <div
                key={idx}
                className={`${bg} border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl 
              transition-transform hover:scale-105 hover:rotate-1`}
              >
                <h3 className="text-xl font-bold text-blue-900 mb-2 tracking-tight">
                  {idx + 1}. {item.title}
                </h3>
                <div
                  className="text-gray-700 text-md leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: String(item.description || "") }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
    </div>
  );
};

export default Activity;
