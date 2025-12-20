// src/Components/Others/Notice.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ✅ correct import
import { Api_Base_Url } from "../../Config/Api";

/* 🔵 Per-tab cache so we fetch once until hard refresh */
let cachedSchoolData = null;
let schoolDataPromise = null;

const Notice = () => {
  // init from cache; if present, skip loading spinner
  const [schoolData, setSchoolData] = useState(cachedSchoolData);
  const [loading, setLoading] = useState(!cachedSchoolData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cachedSchoolData) return; // already have data in this tab

    // dedupe concurrent fetches across mounts
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

  const handleDownload = async (url, fallbackName = "file") => {
    try {
      if (!url) return;
      const res = await fetch(url, { mode: "cors" });
      if (!res.ok) throw new Error("Failed to fetch file");
      const blob = await res.blob();

      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = url.split("/").pop() || fallbackName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (e) {
      console.error(e);
      alert("Could not download the file.");
    }
  };

  // 🔹 your existing shimmer (unchanged)
  if (loading) {
    const placeholders = Array.from({ length: 4 });
    return (
      <div className="p-8 bg-gray-50 xl:px-30">
        <h3 className="h-6 w-3/4 bg-gray-200 rounded animate-pulse">
        </h3>
        <hr className="border-t border-2 border-gray-500 mt-2 mb-12" />

        {placeholders.map((_, i) => (
          <div
            key={i}
            className="border border-blue-200 rounded-lg shadow-sm p-6 mb-6 bg-white"
          >
            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="mt-2 h-4 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="mt-2 h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="flex gap-4 mt-4">
              <div className="h-9 w-36 bg-gray-200 rounded animate-pulse" />
              <div className="h-9 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
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
    <div className=" bg-gray-50 dark:bg-black/80">
      <div className="max-w-7xl mx-auto p-8 ">
      <h3 className="text-2xl dark:text-white/90 md:text-4xl font-bold text-center text-blue-900 mb-4">
        Notices
      </h3>
      <hr className="border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-12" />

      {schoolData?.notices?.map((notice) => (
        <div
          key={notice.id}
          className="border border-blue-200 rounded-lg shadow-sm p-6 mb-6 bg-white"
        >
          <h2 className="text-xl font-bold text-blue-800">{notice.title}</h2>
          <p className="text-gray-700 font-semibold mt-2">
            Date :{" "}
            <span className="font-normal">
              {notice.created_at
                ? new Date(notice.created_at).toLocaleDateString()
                : ""}
            </span>
          </p>

          <p
            className="mt-2 text-black/70 line-clamp-1"
            dangerouslySetInnerHTML={{
              __html: String(notice.content ?? "").replace(/\n/g, "<br />"),
            }}
          />

          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={() => handleDownload(notice.file, `${notice.title}.jpg`)}
              className="bg-indigo-800 font-bold text-white px-4 py-2 rounded shadow hover:bg-indigo-900"
            >
              Download File
            </button>
            <Link
              to={`/notice/${notice.id}`}
              className="bg-gray-300 font-bold text-blue-800 px-4 py-2 rounded shadow hover:bg-gray-300"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Notice;
