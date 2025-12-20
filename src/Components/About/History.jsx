import React, {useState, useEffect} from "react";
import { Api_Base_Url } from "../../Config/Api";

let cachedSchoolData = null;
let schoolDataPromise = null;
const History = () => {
  const [schoolData, setSchoolData] = useState(cachedSchoolData);   // 🔵 init from cache
  const [loading, setLoading] = useState(!cachedSchoolData);        // 🔵 skip loader if cached
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // If cached, don't fetch again
    if (cachedSchoolData) return;

    // Deduplicate in-flight requests across mounts
    if (!schoolDataPromise) {
      schoolDataPromise = fetch(`${Api_Base_Url}/`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch school data");
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
      .catch((err) => setError(err.message || "Failed to load school data."))
      .finally(() => setLoading(false));
  }, []);

  const history = schoolData?.school_history?.[0];

  return (
    <section className="w-full bg-gray-50 py-8 dark:bg-black/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left: Heading, underline, text */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white/90">
              {loading ? (
                <span className="inline-block h-8 w-56 sm:w-64 rounded-md bg-gray-200  animate-pulse" />
              ) : (
                <>History of {schoolData?.school_name}</>
              )}
            </h2>

            {/* double underline accent */}
            <div className="mt-3">
              {loading ? (
                <>
                  <div className="h-[3px] w-28 rounded-full bg-gray-200 animate-pulse" />
                  <div className="h-[3px] w-20 rounded-full bg-gray-200 mt-1 animate-pulse" />
                </>
              ) : (
                <>
                  <div className="h-[3px] w-28 bg-blue-600 rounded-full" />
                  <div className="h-[3px] w-20 bg-blue-300 rounded-full mt-1" />
                </>
              )}
            </div>

            <div className="text-[16px] md:text-[17px] tracking-wider leading-relaxed text-justify px-4 mt-4 text-gray-600 dark:text-white/80">
              {/* Complex shimmer: varied row widths & group spacing */}
              {loading ? (
                <div className="animate-pulse">
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded" />
                    <div className="h-4 w-11/12 bg-gray-200 rounded" />
                    <div className="h-4 w-10/12 bg-gray-200 rounded" />
                    <div className="h-4 w-9/12 bg-gray-200 rounded" />
                  </div>
                  <div className="space-y-3 mt-4">
                    <div className="h-4 w-11/12 bg-gray-200 rounded" />
                    <div className="h-4 w-8/12 bg-gray-200 rounded" />
                    <div className="h-4 w-7/12 bg-gray-200 rounded" />
                    <div className="h-4 w-9/12 bg-gray-200 rounded" />
                  </div>
                  <div className="space-y-3 mt-4">
                    <div className="h-4 w-10/12 bg-gray-200 rounded" />
                    <div className="h-4 w-9/12 bg-gray-200 rounded" />
                    <div className="h-4 w-6/12 bg-gray-200 rounded" />
                  </div>
                </div>
              ) : history?.description ? (
                <div  dangerouslySetInnerHTML={{ __html: history.description }} />
              ) : null}

              {!loading && error && (
                <div className="text-red-600 mt-2">{error}</div>
              )}
            </div>
          </div>

          {/* Right: Multiple Overlapping Circular Images */}
          <div className=" sticky top-36 rounded-3xl flex items-center justify-center">
            {/* Image 1 (center/top, on top layer) */}
            {loading ? (
              <div className="w-full h-full max-w-[640px] max-h-[520px] rounded-2xl bg-gray-200 animate-pulse" />
            ) : (
              <img
                src={history?.image}
                alt=""
                className="w-full h-auto max-w-[640px] max-h-[520px] object-contain rounded-2xl"
                loading="lazy"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;
