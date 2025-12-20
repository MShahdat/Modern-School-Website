// src/pages/NoticeDetails.jsx
import React from "react";
import { useParams, Link } from "react-router";
import { Api_Base_Url } from "../../Config/Api";
import { useState, useEffect, useMemo } from "react";

/* 🔵 Per-tab cache so we fetch once until hard refresh */
let cachedSchoolData = null;
let schoolDataPromise = null;

const NoticeDetails = () => {
  const { id } = useParams();

  // 🔵 init from cache; skip spinner if we already have data this tab
  const [schoolData, setSchoolData] = useState(cachedSchoolData);
  const [loading, setLoading] = useState(!cachedSchoolData);
  const [error, setError] = useState(null);

  useEffect(() => {
    // if cached, don't fetch again
    if (cachedSchoolData) return;

    // dedupe concurrent requests across mounts
    if (!schoolDataPromise) {
      schoolDataPromise = fetch(`${Api_Base_Url}/`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch school data");
          return res.json();
        })
        .then((data) => {
          cachedSchoolData = data; // cache once for the tab
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
      .catch((e) => setError(e.message || "Failed to load school data."))
      .finally(() => setLoading(false));
  }, []);

  // pick the news item by id from the API response
  const noticeItem = useMemo(() => {
    const all = schoolData?.notices || [];
    return all.find((n) => n.id === Number(id));
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
    // 🔵 shimmer effect while loading
    return (
      <div className="p-8 bg-gray-50 xl:px-30">
        <h3 className="text-4xl font-bold text-center text-cyan-800 mb-4">
          Details Notice
        </h3>
        <hr className="border-t border-2 border-gray-500 mt-2 mb-12" />

        <div className="border border-blue-200 rounded-lg shadow-sm p-6 bg-white animate-pulse">
          <div className="h-8 w-1/2 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-1/4 bg-gray-200 rounded mb-2"></div>
          <div className="h-64 w-full bg-gray-200 rounded mb-4"></div>
          <div className="space-y-2 mb-6">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
          </div>
          <div className="flex gap-4">
            <div className="h-10 w-32 bg-gray-200 rounded"></div>
            <div className="h-10 w-32 bg-gray-200 rounded"></div>
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
        <p>News not found!</p>
        <Link to="/news" className="text-indigo-600 underline">
          Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-black/80">
      <div className="p-8 max-w-7xl mx-auto ">
      <h3 className="text-2xl dark:text-white/90 md:text-4xl font-bold text-center text-blue-800 mb-4">
        Details Notice
      </h3>
      <hr className="border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-12" />
      <div className="border border-blue-200 rounded-lg shadow-sm p-6 bg-white">
        <h1 className="text-2xl font-bold text-blue-800">{noticeItem.title}</h1>
        <p className="font-bold text-black/70 mt-2">
          Date :{" "}
          <span>
            {noticeItem.created_at
              ? new Date(noticeItem.created_at).toLocaleDateString()
              : ""}
          </span>
        </p>
        <img
          src={noticeItem.file}
          alt={noticeItem.title}
          className="mt-4 w-full h-auto rounded-lg shadow-sm"
        />
        <p
          className="mt-2 text-black/90 text-[16px] md:text-[17px] tracking-wide leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: String(noticeItem.content ?? "").replace(/\n/g, "<br />"),
          }}
        />
        <div className="mt-6 flex gap-4">
          <button
            type="button"
            onClick={handleDownload}
            className="bg-indigo-800 font-bold text-white px-4 py-2 rounded shadow hover:bg-indigo-900"
          >
            Download File
          </button>
          <Link
            to="/notice"
            className="bg-gray-300 font-bold text-blue-800 px-4 py-2 rounded shadow hover:bg-gray-300"
          >
            Back to Notices
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default NoticeDetails;
