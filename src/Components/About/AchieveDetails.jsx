// src/pages/AchieveDetails.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom"; // ✅ use react-router-dom
import { Api_Base_Url } from "../../Config/Api";

/* 🔵 per-tab cache (lives until hard refresh) */
let cachedSchoolData = null;
let schoolDataPromise = null;

const AchieveDetails = () => {
  const { id } = useParams();
  const [schoolData, setSchoolData] = useState(cachedSchoolData);     // 🔵 init from cache
  const [loading, setLoading] = useState(!cachedSchoolData);          // 🔵 skip loader if cached
  const [error, setError] = useState(null);

  useEffect(() => {
    // If cached, do nothing
    if (cachedSchoolData) return;

    // Deduplicate in-flight fetch
    if (!schoolDataPromise) {
      schoolDataPromise = fetch(`${Api_Base_Url}/`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch school data");
          return res.json();
        })
        .then((data) => {
          cachedSchoolData = data; // cache once
          return data;
        })
        .finally(() => {
          schoolDataPromise = null;
        });
    }

    setLoading(true);
    setError(null);

    schoolDataPromise
      .then((data) => setSchoolData(data))
      .catch((e) => setError(e.message || "Failed to load school data."))
      .finally(() => setLoading(false));
  }, []);

  // find the achievement item by id
  const noticeItem = useMemo(() => {
    const all = schoolData?.achievements || [];
    return all.find((n) => String(n.id) === String(id));
  }, [schoolData, id]);

  const handleDownload = async () => {
    try {
      if (!noticeItem?.file) return;
      const url = noticeItem.file; // actual file URL from API
      const res = await fetch(url, { mode: "cors" });
      if (!res.ok) throw new Error("Failed to fetch file");
      const blob = await res.blob();

      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = url.split("/").pop() || "file";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (e) {
      console.error(e);
      alert("Could not download the file.");
    }
  };

  if (loading) {
    // 🔵 SHIMMER: mirrors heading + hr + details card (image, title, text, buttons)
    return (
      <div className="p-8 bg-gray-50 xl:px-30">
        <h3 className="font-marko-one text-4xl font-bold text-center text-blue-800 mb-4">
          Details Achievements
        </h3>
        <hr className="border-t border-2 border-gray-500 mt-2 mb-12" />
        <div className="border border-blue-200 rounded-lg shadow-sm p-6 bg-white">
          <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse" />
          <div className="mt-4 w-full h-64 bg-gray-200 rounded-lg shadow-sm animate-pulse" />
          <div className="mt-4 space-y-3">
            <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-10/12 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-9/12 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="mt-6 flex gap-4">
            <div className="h-10 w-36 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-40 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  if (!noticeItem) {
    return (
      <div className="p-8">
        <p>Achievement not found!</p>
        <Link to="/achievements" className="text-indigo-600 underline">
          Back to Achievements
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-black/80">
      <div className="p-8 max-w-7xl mx-auto">
      <h3 className="text-2xl md:text-4xl font-bold text-center text-blue-900 mb-4 dark:text-white/90">
        Details Achievements
      </h3>
      <hr className="border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-12" />

      <div className="border border-blue-200 rounded-lg shadow-sm p-6 bg-white">
        <h1 className="text-2xl font-bold text-blue-800">{noticeItem.title}</h1>

        {noticeItem.cover_image ? (
          <img
            src={noticeItem.cover_image}
            alt={noticeItem.title}
            className="mt-4 w-full h-auto rounded-lg shadow-sm"
          />
        ) : null}

        {/* ✅ keep using dangerouslySetInnerHTML (newline -> <br />) */}
        <div
          className="mt-4 text-gray-800 text-[16px] md:text-[17px] leading-relaxed tracking-wide prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: String(noticeItem.description ?? "").replace(/\n/g, "<br />"),
          }}
        />

        <div className="mt-6 flex gap-4">
          {noticeItem.file ? (
            <button
              type="button"
              onClick={handleDownload}
              className="bg-indigo-800 font-bold text-white px-4 py-2 rounded shadow hover:bg-indigo-900"
            >
              Download File
            </button>
          ) : null}
          <Link
            to="/achievements"
            className="bg-gray-300 font-bold text-blue-800 px-4 py-2 rounded shadow hover:bg-gray-300"
          >
            Back to Achievements
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AchieveDetails;
