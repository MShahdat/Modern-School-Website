// src/Components/Others/Governing.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Api_Base_Url } from '../../Config/Api';

/* 🔵 per-tab cache (persists until hard refresh) */
let cachedSchoolData = null;
let schoolDataPromise = null;

const Governing = () => {
  const [schoolData, setSchoolData] = useState(cachedSchoolData);  // 🔵 init from cache
  const [loading, setLoading] = useState(!cachedSchoolData);       // 🔵 skip loader if cached
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

  const members = schoolData?.committee_members ?? [];

  useEffect(() => {
    if (!members.length) return;

    const IO = window.IntersectionObserver;
    if (!IO) {
      cardRefs.current.forEach((el) => el && el.classList.add('gb-bounce-in'));
      return;
    }

    const io = new IO(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('gb-bounce-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [members.length]);

  if (loading) {
    // 🔵 SHIMMER: mirrors heading + grid + card layout
    const placeholders = Array.from({ length: 8 });
    return (
      <div className="px-4 py-8 mx-auto">
        <style>{`
          @keyframes gbBounceInUp {
            0% { opacity: 0; transform: translateY(60px) scale(0.95); }
            60% { opacity: 1; transform: translateY(-10px) scale(1.02); }
            80% { transform: translateY(5px) scale(0.98); }
            100% { transform: translateY(0) scale(1); }
          }
          .gb-hidden { opacity: 0; transform: translateY(60px) scale(0.95); }
          .gb-bounce-in { animation: gbBounceInUp 1s ease forwards; opacity: 1 !important; }
        `}</style>

        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-2">
          {placeholders.map((_, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl border border-gray-100 mb-8 shadow-sm p-6 flex flex-col items-center text-center"
            >
              <div className="w-40 h-40 md:w-48 md:h-48 xl:w-40 xl:h-40 rounded-full bg-gray-200 animate-pulse" />
              <div className="mt-5 w-full space-y-2">
                <div className="h-5 w-3/4 mx-auto bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-1/2 mx-auto bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-2/3 mx-auto bg-gray-200 rounded animate-pulse" />
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
    <div className="max-w-7xl px-4 py-8 mx-auto bg-blue-50 dark:bg-black/80">
      <style>{`
        @keyframes gbBounceInUp {
          0% { opacity: 0; transform: translateY(60px) scale(0.95); }
          60% { opacity: 1; transform: translateY(-10px) scale(1.02); }
          80% { transform: translateY(5px) scale(0.98); }
          100% { transform: translateY(0) scale(1); }
        }
        .gb-hidden { opacity: 0; transform: translateY(60px) scale(0.95); }
        .gb-bounce-in { animation: gbBounceInUp 1s ease forwards; opacity: 1 !important; }
      `}</style>

      <h3 className="text-2xl md:text-3xl font-bold dark:text-white/90 text-blue-900 text-center mb-4">
        Governing Body (2025 - 2026)
      </h3>
      <hr className="border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-0 md:gap-2">
        {members.map((com, idx) => (
          <Link
            key={com.id ?? idx}
            ref={(el) => (cardRefs.current[com.id ?? idx] = el)}
            to={`/committee/${com.id}`}
            className="gb-hidden group bg-white rounded-2xl border border-gray-100 mb-8 shadow-sm p-6 flex flex-col items-center text-center transition
                       hover:-translate-y-1 hover:shadow-xl hover:border-cyan-200 focus-within:-translate-y-1 hover:duration-300 hover:scale-105"
            style={{ animationDelay: `${(com.id ?? idx) * 0.25}s` }}
          >
            <img
              src={com.photo}
              alt={com.name}
              loading="lazy"
              className="w-40 h-40 md:w-48 md:h-48 xl:w-40 xl:h-40 object-cover rounded-full ring-2 ring-cyan-100"
            />
            <div className="mt-5 space-y-1">
              {/* 🔵 use dangerouslySetInnerHTML for text */}
              <h2
                className="text-xl md:text-lg font-bold text-blue-900 leading-snug uppercase"
                dangerouslySetInnerHTML={{ __html: String(com.name ?? '') }}
              />
              <p
                className="text-md text-black/90 md:text-base font-bold"
                dangerouslySetInnerHTML={{ __html: String(com.designation?.title ?? '') }}
              />
              <p className="text-lg md:text-base font-semibold text-gray-700">
                +88{com.phone}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Governing;
