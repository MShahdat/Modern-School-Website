// src/Components/Header2.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // ✅ use react-router-dom
import { MdEmail, MdAddCall } from "react-icons/md";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { Api_Base_Url } from '../Config/Api';

/* 🔵 Per-tab cache */
let cachedSchoolData = null;
let schoolDataPromise = null;

const Header2 = () => {
  const [schoolData, setSchoolData] = useState(cachedSchoolData);
  const [loading, setLoading] = useState(!cachedSchoolData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cachedSchoolData) return;
    if (!schoolDataPromise) {
      schoolDataPromise = fetch(`${Api_Base_Url}/`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch school data");
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
      .catch((err) => setError(err.message || "Failed to load school data."))
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Shimmer loader (unchanged)
  if (loading) {
    return (
      <div className="bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50 px-4 py-4 md:px-6 lg:px-8 xl:px-30 mx-auto">
        <div className="flex flex-col sm:flex-row items-center lg:items-center justify-center gap-4 sm:gap-8 lg:justify-between">
          <div className="rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-28 lg:h-28 xl:w-32 xl:h-32 bg-slate-200 animate-pulse" />
          <div className="flex flex-col items-center space-y-2 mt-3 lg:mt-0 text-center lg:text-center">
            <div className="h-6 sm:h-8 md:h-10 w-40 sm:w-56 md:w-72 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 sm:h-5 w-32 sm:w-48 md:w-64 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-48 sm:w-60 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="space-y-2 hidden lg:block">
            <div className="flex items-center gap-2">
              <div className="h-4 w-40 bg-slate-200 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
            </div>
            <div className="flex items-center mt-3 gap-6">
              <div className="h-5 w-5 bg-slate-200 rounded-full animate-pulse" />
              <div className="h-5 w-5 bg-slate-200 rounded-full animate-pulse" />
              <div className="h-5 w-5 bg-slate-200 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-rose-600">{error}</div>;
  }

  return (
    <div
      className="relative px-4 py-4 md:px-6 lg:px-8 xl:px-30 mx-auto"
      style={{
        backgroundImage: `url(https://plus.unsplash.com/premium_photo-1658506813192-074af2c51d66?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Optional overlay for readability */}
      <div className="absolute inset-0 bg-white/70"></div>

      {/* Content stays on top */}
      <div className="relative flex flex-col sm:flex-row items-center lg:items-center justify-center gap-1 sm:gap-4 lg:justify-between">
        {/* Left: Logo */}
        <Link to={'/'}>
          <img
            className="rounded-full w-20 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-24 lg:h-24 xl:w-22 xl:h-22 object-cover"
            src={schoolData?.logo}
            alt="School Logo"
          />
        </Link>

        {/* Middle: Title / Address / EIIN */}
        <div className="flex flex-col items-center text-black/80 space-y-2 mt-0 lg:mt-0 text-center lg:text-center">
          <h2 className="font-lugrasimo text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold">
            {schoolData?.school_name}
          </h2>
          <p
            className=" text-sm sm:text-base md:text-lg lg:text-xl  font-semibold"
            dangerouslySetInnerHTML={{
              __html: String(schoolData?.address ?? '').replace(/\n/g, '<br />'),
            }}
          />
          <p className=" font-bold text-sm sm:text-md md:text-md">
            EIIN: {schoolData?.eiin || 'N/A'} | ESTD: {schoolData?.estd_year || 'N/A'}
          </p>
        </div>

        {/* Right: Email / Call / Socials */}
        <div className="space-y-2 hidden lg:block text-black/80">
          <a href="https://mail.google.com/mail/u/0/#inbox" className="flex items-center gap-1">
            <MdEmail className="size-5 text-rose-600 mt-1" />
            <p className=" font-semibold">
              {schoolData?.contract_emails?.[0]?.email}
            </p>
          </a>
          <div className="flex items-center gap-1">
            <MdAddCall className="text-emerald-600" />
            <p className="font-semibold">
              +88{schoolData?.contract_phones?.[0]?.phone}
            </p>
          </div>
          <div className="flex items-center mt-3 gap-6">
            <a href={schoolData?.facebook_url || "https://www.facebook.com/"}>
              <FaFacebook className="size-5 text-blue-600" />
            </a>
            <a href={schoolData?.youtube_link || "https://www.youtube.com/"}>
              <FaYoutube className="size-5 text-rose-600" />
            </a>
            <a href={schoolData?.linkedin_url || "https://www.linkedin.com/"}>
              <FaLinkedin className="size-5 text-indigo-600" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header2;
