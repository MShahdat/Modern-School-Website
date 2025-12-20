// src/Components/Others/Principal.jsx
import React, { useState, useEffect } from 'react';
import { Api_Base_Url } from '../../Config/Api';

/* 🔵 per-tab cache (persists until hard refresh) */
let cachedSchoolData = null;
let schoolDataPromise = null;

const Principal = () => {
  const [schoolData, setSchoolData] = useState(cachedSchoolData);  // 🔵 init from cache
  const [loading, setLoading] = useState(!cachedSchoolData);       // 🔵 skip loader if cached
  const [error, setError] = useState(null);

  useEffect(() => {
    // If cached, don't fetch again
    if (cachedSchoolData) return;

    // Deduplicate in-flight request across mounts
    if (!schoolDataPromise) {
      schoolDataPromise = fetch(`${Api_Base_Url}/`)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch school data');
          return res.json();
        })
        .then((data) => {
          cachedSchoolData = data; // 🔵 cache once
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

  if (loading) {
    // 🔵 SHIMMER: same structure & spacing as your UI
    return (
      <div className="px-4 py-8 xl:px-60 mx-auto">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-4">
          
        </h2>
        <hr className="border-t border-2 border-gray-500 mt-2 mb-12" />
        <div className="bg-gray-50 px-8 py-8 border-1 border-gray-200">
          <div className="flex flex-col items-center justify-center">
            <div className="w-120 h-72 bg-gray-200 rounded-xl shadow-lg animate-pulse" />
            <div className="h-6 w-48 bg-gray-200 rounded mt-3 animate-pulse" />
          </div>
          <div className="mt-8 space-y-3">
            <div className="h-5 w-11/12 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-10/12 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-9/12 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  // ---- Pull the principal from the API (role-based filter) ----
  const principal =
    (schoolData?.leaderships ?? []).find(
      (p) => String(p?.role || '').toLowerCase() === 'principal'
    ) || null;

  return (
    <div className='bg-blue-50 dark:bg-black/80'>
      <div className="max-w-7xl px-4 py-8 xl:px-20 mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center dark:text-white/90 text-blue-900 mb-4">
        Message from Principal
      </h2>
      <hr className="border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-12" />
      <div className="px-4 py-8">
        <div className="flex flex-col items-center justify-center">
          <img
            className="w-100 h-80 object-fill rounded-xl shadow-sm"
            src={principal?.photo}
            alt={principal?.name}
          />
          <h2 className="text-xl md:text-2xl font-bold dark:text-white/90 text-blue-950 mt-2 uppercase">{principal?.name}</h2>
        </div>

        {/* Keep exact layout: one <p>, now HTML-enabled */}
        <p
          className="text-[16px] md:text-[17px] leading-relaxed tracking-wider mt-8 text-justify dark:text-white/90 text-gray-600"
          dangerouslySetInnerHTML={{
            __html: String(principal?.message ?? '').replace(/\n/g, '<br />'),
          }}
        />
      </div>
    </div>
    </div>
  );
};

export default Principal;
