// src/Components/Others/MissionVision.jsx
import React, { useState, useEffect } from 'react';
import { Api_Base_Url } from '../../Config/Api';

/* 🔵 ADD: per-tab session cache (persists until hard refresh) */
let cachedSchoolData = null;
let schoolDataPromise = null;

const MissionVision = () => {
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
    // 🔵 SHIMMER: same structure (wrapper + heading + hr + two titled paragraphs)
    return (
      <div className='px-4 py-8 xl:px-20 mx-auto'>
        <h2 className='text-4xl font-bold text-center mb-4 text-cyan-900'>Mission Vision</h2>
        <hr className='border-t border-2 border-gray-500 mt-2 mb-0' />

        <div className='px-8 py-12'>
          {/* Mission block skeleton */}
          <div className='mb-8'>
            <div className='h-6 w-28 bg-gray-200 rounded mb-3 animate-pulse' />
            <div className='space-y-3'>
              <div className='h-5 w-11/12 bg-gray-200 rounded animate-pulse' />
              <div className='h-5 w-10/12 bg-gray-200 rounded animate-pulse' />
              <div className='h-5 w-9/12 bg-gray-200 rounded animate-pulse' />
            </div>
          </div>

          {/* Vision block skeleton */}
          <div>
            <div className='h-6 w-24 bg-gray-200 rounded mb-3 animate-pulse' />
            <div className='space-y-3'>
              <div className='h-5 w-11/12 bg-gray-200 rounded animate-pulse' />
              <div className='h-5 w-10/12 bg-gray-200 rounded animate-pulse' />
              <div className='h-5 w-9/12 bg-gray-200 rounded animate-pulse' />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  const mv = schoolData?.vision?.[0] ?? {};
  const missionHTML = mv.mission_text || '';
  const visionHTML  = mv.vision_text  || '';

  return (
    <div className='bg-white dark:bg-black/80'>
      <div className='max-w-7xl px-4 py-8 xl:px-20 mx-auto'>
      <h2 className='text-4xl dark:text-white/90 font-bold text-center mb-4 text-blue-900'>Mission Vision</h2>
      <hr className='border-t border-2 border-black/20 dark:border-white/10 mt-2 mb-0' />

      <div className='px-8 py-12'>
        <div>
          <h3 className='text-2xl font-bold text-blue-950 dark:text-white/90 mb-3 underline'>Mission</h3>
          <p
            className='text-[16px] md:text-[17px] tracking-wider leading-relaxed dark:text-white/90 text-gray-600 text-justify'
            dangerouslySetInnerHTML={{ __html: missionHTML }}
          />
        </div>

        <div>
          <h3 className='text-2xl mt-4 md:mt-6 dark:text-white/90 font-bold text-blue-950 mb-3 underline'>Vision</h3>
          <p
            className='text-[16px] md:text-[17px] tracking-wider leading-relaxed dark:text-white/90 text-gray-600 text-justify'
            dangerouslySetInnerHTML={{ __html: visionHTML }}
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default MissionVision;
