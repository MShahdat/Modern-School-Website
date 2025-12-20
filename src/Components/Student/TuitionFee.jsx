// src/Components/Others/TuitionFee.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Api_Base_Url } from "../../Config/Api";

/* 🔵 Per-tab cache */
let cachedSchoolData = null;
let schoolDataPromise = null;

const TuitionFee = () => {
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

  // pick the latest published tuition_fees item
  const feeEntry = useMemo(() => {
    const list = Array.isArray(schoolData?.tuition_fees)
      ? [...schoolData.tuition_fees]
      : [];
    if (!list.length) return null;

    const published = list.filter((x) => x?.is_published);
    const pool = published.length ? published : list;
    pool.sort((a, b) => (b?.id || 0) - (a?.id || 0));
    return pool[0] || null;
  }, [schoolData]);

  // Parse the HTML table from API
  const { headers, rows } = useMemo(() => {
    if (!feeEntry?.description) return { headers: [], rows: [] };
    try {
      const doc = new DOMParser().parseFromString(
        feeEntry.description,
        "text/html"
      );
      const hdrs = Array.from(doc.querySelectorAll("thead th")).map((th) =>
        (th.textContent || "").trim()
      );
      const rws = Array.from(doc.querySelectorAll("tbody tr")).map((tr) =>
        Array.from(tr.children).map((td) => (td.textContent || "").trim())
      );
      return { headers: hdrs, rows: rws };
    } catch {
      return { headers: [], rows: [] };
    }
  }, [feeEntry]);

  if (loading) {
    // 🔵 shimmer loader
    const fakeRows = Array.from({ length: 5 });
    const fakeCols = Array.from({ length: 3 });
    return (
      <div className="px-4 py-8 xl:px-40 mx-auto">
        <div className="flex justify-center">
          <h3 className="h-5 w-1/4 flex bg-gray-200 rounded animate-pulse"></h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full  rounded-lg shadow-lg mb-8">
            <thead className=" text-white text-center">
              <tr>
                {fakeCols.map((_, i) => (
                  <th key={i} className="px-6 py-3">
                    <div className="h-5 w-24 bg-gray-300 rounded animate-pulse mx-auto" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fakeRows.map((_, rIdx) => (
                <tr
                  key={rIdx}
                  className={`${rIdx % 2 === 0 ? "bg-white" : "bg-gray-200"}`}
                >
                  {fakeCols.map((_, cIdx) => (
                    <td key={cIdx} className="px-6 py-5 text-center">
                      <div className="h-5 w-20 bg-gray-300 rounded animate-pulse mx-auto" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white dark:bg-black/80">
      <div className="max-w-7xl px-4 py-8 mx-auto">
      <h3 className="text-3xl dark:text-white/90 md:text-4xl font-bold text-blue-900 text-center mb-4">
        {feeEntry?.title || "Tuition Fees"}
      </h3>
      <hr className="border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-8" />
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white rounded-lg shadow-lg mb-8">
          <thead className="bg-blue-950 text-white text-center">
            <tr>
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="px-6 py-3 text-left text-lg font-bold"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-center">
            {rows.map((cells, rIdx) => (
              <tr
                key={rIdx}
                className={`${
                  rIdx % 2 === 0 ? "bg-white" : "bg-gray-200"
                } hover:bg-indigo-200`}
              >
                {cells.map((c, cIdx) => (
                  <td
                    key={cIdx}
                    className="px-6 py-5 text-lg font-semibold text-gray-700 border-b border-gray-200"
                  >
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default TuitionFee;
