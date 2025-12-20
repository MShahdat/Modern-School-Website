// src/Academic/Teacher.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Api_Base_Url } from '../../Config/Api';

/* 🔵 per-tab cache (persists until hard refresh) */
let cachedSchoolData = null;
let schoolDataPromise = null;

const Teacher = () => {
  const [schoolData, setSchoolData] = useState(cachedSchoolData);   // 🔵 init from cache
  const [loading, setLoading] = useState(!cachedSchoolData);        // 🔵 skip loader if cached
  const [error, setError] = useState(null);

  const cardRefs = useRef([]);

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

  const teachers = schoolData?.teachers ?? [];

  // (kept your IO hook structure; no design change)
  useEffect(() => {
    if (!teachers.length) return;

    const IO = window.IntersectionObserver;
    if (!IO) {
      cardRefs.current.forEach((el) => el && el.classList.add('gb-bounce-in'));
      return;
    }
  }, [teachers.length]);

  if (loading) {
    // 🔵 SHIMMER: mirrors heading + grid + your card layout (image left, text right)
    const placeholders = Array.from({ length: 6 });
    return (
      <div className="bg-blue-50 px-4 py-8 xl:px-35 mx-auto">
        <div className="flex justify-center">
          <h3 className="h-5 w-1/4 flex bg-gray-200 rounded animate-pulse"></h3>
        </div>
        <hr className="border-t border-2 border-gray-50 mt-2 mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-6 mb-8">
          {placeholders.map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-2xl pl-3 pr-1 py-4"
            >
              <div className="flex gap-4">
                <div className="h-36 w-40 md:h-30 md:w-30 rounded-xl bg-gray-200 animate-pulse" />
                <div className="flex-1 mt-0 space-y-3">
                  <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
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
    <div className='bg-blue-50 dark:bg-black/80'>
      <div className="max-w-7xl px-4 py-8 mx-auto">
      <h3 className="text-3xl dark:text-white/90 md:text-4xl font-bold text-blue-900 text-center mb-4">Our Teachers</h3>
      <hr className="border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-6 mb-8">
        {teachers.map((teacher, idx) => (
          <Link
            key={teacher.id}
            ref={(el) => (cardRefs.current[idx] = el)}
            to={`/teacher/${teacher.id}`}
            className="bg-white rounded-2xl shadow-2xl pl-3 pr-1 py-4 transform transition duration-300 hover:scale-105 hover:shadow-3xl hover:ring-1 hover:ring-cyan-300"
          >
            <div className="flex items-center gap-4 sm:gap-4">
              <img
                className="h-36 w-40 md:h-30 md:w-30 rounded-xl object-cover"
                src={teacher.photo}
                alt={teacher.name}
              />
              <div className="mt-0">
                {/* 🔵 use dangerouslySetInnerHTML for text (no design change) */}
                <p
                  className="text-lg sm:text-xl text-blue-900 font-bold uppercase"
                  dangerouslySetInnerHTML={{ __html: String(teacher.name ?? '') }}
                />
                <p
                  className="font-semibold mt-2 text-gray-600"
                  dangerouslySetInnerHTML={{ __html: String(teacher.designation?.title ?? '') }}
                />
                <p className="font-semibold mt-2 text-gray-600">+88{teacher.phone}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Teacher;
