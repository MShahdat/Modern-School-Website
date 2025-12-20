// src/Components/Others/NewsDetails.js
import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Api_Base_Url } from "../../Config/Api";
import { Shimmer, SkeletonDetails } from "../../Shimmer/Shimmer";

/* 🔵 Per-tab cache (persists until hard refresh) */
let cachedSchoolData = null;
let schoolDataPromise = null;

const NewsDetails = () => {
  const { id } = useParams();

  // 🔵 init from cache so we can skip loading spinner when data already exists
  const [schoolData, setSchoolData] = useState(cachedSchoolData);
  const [loading, setLoading] = useState(!cachedSchoolData);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If we already have cached data in this tab, don't fetch again
    if (cachedSchoolData) return;

    // Deduplicate in-flight requests across mounts
    if (!schoolDataPromise) {
      schoolDataPromise = fetch(`${Api_Base_Url}/`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch school data");
          return res.json();
        })
        .then((data) => {
          cachedSchoolData = data;     // cache for this tab
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

  const newsItem = useMemo(() => {
    const all = schoolData?.news || [];
    return all.find((n) => String(n.id) === String(id));
  }, [schoolData, id]);

  const handleDownload = async () => {
    try {
      if (!newsItem?.file) return;
      const url = newsItem.file;
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

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  if (!newsItem && !loading) {
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
    <div className=" bg-white/95 dark:bg-black/80">
      <div className="p-8 max-w-7xl mx-auto">
      <h3 className="text-2xl dark:text-white/90 md:text-4xl font-bold text-center text-indigo-800 mb-4">
        News Details
      </h3>
      <hr className="border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-8" />

      {/* ✅ Shimmer wraps content, shows skeleton when loading */}
      <Shimmer
        show={loading}
        fallback={<SkeletonDetails mediaClass="w-full h-80" />}
      >
        <div className="border border-indigo-200 rounded-xl shadow-lg overflow-hidden bg-white">
          <img
            src={newsItem?.cover_image}
            alt={newsItem?.title}
            className="w-full h-80 object-cover"
          />
          <div className="p-6">
            <h1 className="text-2xl font-bold text-indigo-800">{newsItem?.title}</h1>
            <p className="text-gray-600 font-semibold mt-2">
              Date:{" "}
              <span className="font-normal">
                {newsItem?.created_at
                  ? new Date(newsItem.created_at).toLocaleDateString()
                  : ""}
              </span>
            </p>

            <div
              className="mt-4 text-gray-800 text-[16px] md:text-[17px] leading-relaxed tracking-wide prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: String(newsItem?.content ?? "").replace(/\n/g, "<br />"),
              }}
            />

            <div className="mt-6 flex gap-4">
              {newsItem?.file ? (
                <button
                  type="button"
                  onClick={handleDownload}
                  className="bg-indigo-800 font-bold text-white px-4 py-2 rounded shadow hover:bg-indigo-900"
                >
                  Download File
                </button>
              ) : null}
              <Link
                to="/news"
                className="bg-gray-300 font-bold text-indigo-800 px-4 py-2 rounded shadow hover:bg-gray-300"
              >
                Back to News
              </Link>
            </div>
          </div>
        </div>
      </Shimmer>
    </div>
    </div>
  );
};

export default NewsDetails;
