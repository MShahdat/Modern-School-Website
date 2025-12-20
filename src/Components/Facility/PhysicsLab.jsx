// src/Components/Others/PhysicsLab.jsx
import React, { useState, useEffect } from "react";
import { Api_Base_Url } from "../../Config/Api";

/* 🔵 ADD: per-tab session cache (persists until hard refresh) */
let cachedSchoolData = null;
let schoolDataPromise = null;

const PhysicsLab = () => {
  const [schoolData, setSchoolData] = useState(cachedSchoolData);  // 🔵 init from cache
  const [loading, setLoading] = useState(!cachedSchoolData);       // 🔵 skip loader if cached
  const [error, setError] = useState(null);

  useEffect(() => {
    // If cached, don't fetch again
    if (cachedSchoolData) return;

    // Deduplicate in-flight requests across mounts
    if (!schoolDataPromise) {
      schoolDataPromise = fetch(`${Api_Base_Url}/`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch school data");
          return res.json();
        })
        .then((data) => {
          cachedSchoolData = data; // 🔵 cache once
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
    // 🔵 SHIMMER: exact same structure (heading + repeated two-column rows)
    const placeholders = Array.from({ length: 2 });
    return (
      <section className="w-full bg-white">
        {/* Section heading */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-8">
          <div className="flex justify-center">
          <h3 className="h-5 w-1/4 flex bg-gray-200 rounded animate-pulse"></h3>
        </div>
        <hr className="border-t border-2 border-gray-50 mt-2 mb-12" />

          {placeholders.map((_, i) => (
            <div key={i} className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
              {/* Left: image skeleton (md:col-span-5) */}
              <div className="md:col-span-5">
                <div className="w-full h-64 md:h-72 bg-gray-200 rounded-0 shadow-md animate-pulse" />
              </div>
              {/* Right: text skeleton (md:col-span-7) */}
              <div className="md:col-span-7">
                <div className="space-y-3">
                  <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-10/12 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-9/12 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-8/12 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-7/12 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <section className="w-full bg-white dark:bg-black/80">
      {/* Section heading */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className='text-2xl dark:text-white/90 md:text-4xl font-bold text-center text-cyan-950 mb-4'>
          Physics Lab
        </h2>
        <hr className='border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-8' />

        <div>
          {schoolData?.physics_lab_items?.map((physics) => (
            <div key={physics.id ?? physics.media ?? Math.random()}>
              {/* Two-column content */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
                {/* Left: image */}
                <div className="md:col-span-5">
                  <img
                    src={physics.media}
                    alt="Students working in the ICT lab"
                    className="w-full rounded-0 shadow-md object-cover"
                  />
                </div>

                {/* Right: text */}
                <div className="md:col-span-7 px-2">
                  {/* (kept) dangerouslySetInnerHTML */}
                  <p
                    className="mt-0 text-[17px] tracking-wider md:text-[17px] leading-8 text-gray-700 dark:text-white/90 text-justify"
                    dangerouslySetInnerHTML={{
                      __html: String(physics.description ?? "").replace(/\n/g, "<br />"),
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhysicsLab;
