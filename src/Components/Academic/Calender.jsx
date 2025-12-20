// src/Components/Others/Calendar.jsx
import React, { useState, useEffect } from "react";
import { Api_Base_Url } from "../../Config/Api";

/* ──────────────────────────────────────────────────────────────
   Date Helpers (fixed to handle API "YYYY-MM-DD")
   ────────────────────────────────────────────────────────────── */
function parseAPIDate(s) {
  if (!s) return null;
  const str = String(s).trim();

  // API format: YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    const [y, m, d] = str.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    return isNaN(dt.getTime()) ? null : dt;
  }

  // Optional support: DD-MM-YYYY
  if (/^\d{2}-\d{2}-\d{4}$/.test(str)) {
    const [dd, mm, yyyy] = str.split("-").map(Number);
    const dt = new Date(yyyy, mm - 1, dd);
    return isNaN(dt.getTime()) ? null : dt;
  }

  // Fallback
  const dt = new Date(str);
  return isNaN(dt.getTime()) ? null : dt;
}

function formatDateDisplay(s) {
  const d = parseAPIDate(s);
  return d
    ? d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" })
    : "";
}

// function getFileKind(url = "") {
//   const ext = url.split("?")[0].split(".").pop()?.toLowerCase();
//   if (["png", "jpg", "jpeg", "webp", "gif", "bmp", "svg"].includes(ext)) return "image";
//   if (ext === "pdf") return "pdf";
//   return "unknown";
// }

/* ──────────────────────────────────────────────────────────────
   Cache (per-tab)
   ────────────────────────────────────────────────────────────── */
let cachedSchoolData = null;
let schoolDataPromise = null;

const Calendar = () => {
  const [schoolData, setSchoolData] = useState(cachedSchoolData);
  const [loading, setLoading] = useState(!cachedSchoolData);
  const [error, setError] = useState(null);

  const [preview, setPreview] = useState({
    open: false,
    url: "",
    kind: "unknown",
    title: "",
    isBlob: false,
  });

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

  /* ────────────────────────────────────────────────────────────
     Derived list
     ──────────────────────────────────────────────────────────── */
  const calendar = (schoolData?.academic_calendars ?? [])
    .filter((c) => c?.is_published !== false)
    .map((c) => ({
      title: c.title,
      date: c.publish_date,
      file: c.file,
      content: c.description || "Academic schedule and events for the year.",
    }));

  /* ────────────────────────────────────────────────────────────
     Actions
     ──────────────────────────────────────────────────────────── */
  const handleDownload = async (url, fallbackName = "file") => {
    try {
      if (!url) return;
      const res = await fetch(url, { mode: "cors" });
      if (!res.ok) throw new Error("Failed to fetch file");
      const blob = await res.blob();
      const inferredName = url.split("/").pop() || fallbackName;
      const a = document.createElement("a");
      const blobUrl = URL.createObjectURL(blob);
      a.href = blobUrl;
      a.download = inferredName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (e) {
      console.error(e);
      alert("Could not download the file.");
    }
  };

  const handleRead = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const closePreview = () => {
    if (preview.isBlob && preview.url) URL.revokeObjectURL(preview.url);
    setPreview({ open: false, url: "", kind: "unknown", title: "", isBlob: false });
  };

  /* ────────────────────────────────────────────────────────────
     Loading shimmer
     ──────────────────────────────────────────────────────────── */
  if (loading) {
    const placeholders = Array.from({ length: 2 });
    return (
      <div className="p-8 bg-gray-50 xl:px-30">
        <div className="flex justify-center">
          <h3 className="h-5 w-1/4 flex bg-gray-200 rounded animate-pulse"></h3>
        </div>
        <hr className="border-t border-2 border-gray-50 mt-2 mb-12" />

        <div className="sm:px-10 md:px-20 lg:px-30 xl:px-40">
          {placeholders.map((_, i) => (
            <div
              key={i}
              className="border border-blue-200 rounded-lg shadow-sm p-12 mb-6 bg-white animate-pulse"
            >
              <div className="h-6 w-2/3 bg-gray-200 rounded mb-3" />
              <div className="h-4 w-1/3 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-5/6 bg-gray-200 rounded mb-6" />
              <div className="flex gap-8">
                <div className="h-9 w-36 bg-gray-200 rounded" />
                <div className="h-9 w-36 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
        <div className="text-center text-red-500">{error}</div>
    );
  }

  /* ────────────────────────────────────────────────────────────
     Render
     ──────────────────────────────────────────────────────────── */
  return (
    <div className="bg-gray-50 dark:bg-black/80">
      <div className="max-w-7xl mx-auto p-8">
      <h3 className="text-2xl dark:text-white/90 md:text-4xl font-bold text-center text-blue-900 mb-4">
        Academic Calendar (2025)
      </h3>
      <hr className="border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-12" />

      <div className="sm:px-10 md:px-20 lg:px-30 xl:px-40">
        {calendar.map((cal, index) => (
          <div
            key={index}
            className="border border-blue-200 rounded-lg shadow-sm p-12 mb-6 bg-white"
          >
            <h2 className="text-xl font-bold text-blue-800">{cal.title}</h2>

            <p className="text-gray-700 font-semibold mt-2">
              Date: <span className="font-normal">{formatDateDisplay(cal.date)}</span>
            </p>

            <p
              className="mt-2 text-black/80 line-clamp-1"
              dangerouslySetInnerHTML={{
                __html: String(cal.content ?? "").replace(/\n/g, "<br />"),
              }}
            />

            <div className="flex flex-wrap gap-8 mt-8">
              <button
                type="button"
                onClick={() => handleDownload(cal.file, `${cal.title}.pdf`)}
                className="bg-indigo-800 font-bold text-white px-4 py-2 rounded shadow hover:bg-indigo-900"
              >
                Download File
              </button>

              <button
                type="button"
                onClick={() => handleRead(cal.file, cal.title)}
                className="bg-indigo-800 font-bold text-white px-4 py-2 rounded shadow hover:bg-indigo-900"
              >
                Read Calendar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal left for consistency */}
      {preview.open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closePreview}
            aria-hidden="true"
          />
          <div className="absolute inset-4 md:inset-10 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <h4 className="font-semibold text-slate-800 line-clamp-1">{preview.title}</h4>
              <div className="flex items-center gap-2">
                <a
                  href={preview.isBlob ? undefined : preview.url}
                  target={preview.isBlob ? undefined : "_blank"}
                  rel={preview.isBlob ? undefined : "noopener noreferrer"}
                  className={`text-sm text-indigo-700 hover:underline ${
                    preview.isBlob ? "pointer-events-none opacity-50" : ""
                  }`}
                >
                  {preview.isBlob ? "Previewing copy" : "Open in new tab"}
                </a>
                <button
                  onClick={closePreview}
                  className="px-3 py-1 rounded bg-slate-100 hover:bg-slate-200"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-50">
              <object data={preview.url} type="application/pdf" className="w-full h-full">
                <iframe title="PDF Preview" src={preview.url} className="w-full h-full" />
              </object>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Calendar;
