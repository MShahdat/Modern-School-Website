
import React, { useEffect, useMemo, useState } from "react";
import { Api_Base_Url } from "../../Config/Api";

/* 🔵 Per-tab cache (same pattern you use elsewhere) */
let cachedSchoolData = null;
let schoolDataPromise = null;

const Schedule = () => {
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

  // pick the latest published tuition_fees item (fallback: first)
  const feeEntry = useMemo(() => {
    const list = Array.isArray(schoolData?.tuition_fees)
      ? [...schoolData.tuition_fees]
      : [];
    if (!list.length) return null;

    const published = list.filter((x) => x?.is_published);
    const pool = published.length ? published : list;
    // sort by id desc (change if you later add created_at)
    pool.sort((a, b) => (b?.id || 0) - (a?.id || 0));
    return pool[0] || null;
  }, [schoolData]);

  // Parse the HTML table from API -> headers + rows, then render with your Tailwind styles
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

  return (
    <div className="px-4 py-8 xl:px-40 mx-auto max-w-7xl">
      <h3 className="font-marko-one text-4xl font-bold text-blue-900 text-center mb-4">
        {feeEntry?.title || "Tuition Fees"}
      </h3>
      <hr className="border-t border-2 border-gray-500 mt-2 mb-12" />

      {loading ? (
        <div className="space-y-3">
          <div className="h-8 w-64 bg-gray-200 animate-pulse rounded" />
          <div className="h-72 w-full bg-gray-200 animate-pulse rounded" />
        </div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : !rows.length ? (
        <div className="text-gray-600">No tuition fee data available.</div>
      ) : (
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
      )}
    </div>
  );
};

export default Schedule;
