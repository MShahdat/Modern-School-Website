// src/Components/Others/About.jsx
import React, { useState, useEffect } from 'react';
import { Api_Base_Url } from '../../Config/Api';

/* 🔵 ADD: per-tab session cache (persists until hard refresh) */
let cachedSchoolData = null;
let schoolDataPromise = null;

const About = () => {
  const [schoolData, setSchoolData] = useState(cachedSchoolData);   // 🔵 init from cache
  const [loading, setLoading] = useState(!cachedSchoolData);        // 🔵 skip loader if cached
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
    // 🔵 SHIMMER: same structure (wrapper + heading + hr + content area + paragraph)
    return (
      <div className='bg-blue-50 px-4 py-8 xl:px-60 mx-auto'>
        <h2 className='text-4xl font-bold text-center text-blue-950 mb-4'>About Us</h2>
        <hr className='border-t border-2 border-gray-300 mt-2 mb-0' />
        <div className='px-8 py-16'>
          <div className="space-y-3">
            <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-11/12 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-10/12 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-9/12 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-8/12 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
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
    <div className='bg-blue-50 dark:bg-black/80'>
      <div className='max-w-7xl px-4 py-8 xl:px-20 mx-auto'>
        <h2 className='text-4xl font-bold text-center dark:text-white/90 text-blue-950 mb-4'>About Us</h2>
        <hr className='border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-0' />
        <div className='px-4 py-8'>
          {/* 🔵 use dangerouslySetInnerHTML for text (newline -> <br />) */}
          <p
            className='text-[16px] md:text-[17px] dark:text-white/90 leading-relaxed tracking-wider text-justify text-gray-600'
            dangerouslySetInnerHTML={{
              __html: String(schoolData?.about_text ?? '').replace(/\n/g, '<br />'),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
