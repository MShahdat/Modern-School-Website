// src/Components/Others/NewsList.jsx
import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router";
import { Api_Base_Url } from "../../Config/Api";

const getOrdinal = (n) => {
  const s = ["th", "st", "nd", "rd"], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};
const getMonthShort = (d) =>
  d.toLocaleString("en-US", { month: "short" }).toUpperCase();

const NewsList = () => {
  const [schoolData, setSchoolData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);


  useEffect(() => {
    fetch(`${Api_Base_Url}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch school data");
        return res.json();
      })
      .then((data) => {
        setSchoolData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load school data.");
        setLoading(false);
      });
  }, []);

  // Normalize and choose items: if >=5 -> first 5, else -> all
  const latestFive = useMemo(() => {
    const all = (schoolData?.news || []).map((n) => ({
      ...n,
      date: n.created_at,
    }));
    return all.length >= 5 ? all.slice(0, 5) : all;
  }, [schoolData]);

  // Duplicate for infinite loop track
  const loopItems = useMemo(() => [...latestFive, ...latestFive], [latestFive]);

  const prev = () =>
    setOffset((o) => (o === 0 ? latestFive.length - 1 : o - 1));
  const next = () =>
    setOffset((o) => (o === latestFive.length - 1 ? 0 : o + 1));

  if (loading) {
    return (
      <div className="text-center py-4 text-gray-500">
        Loading school information...
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <section className="px-4 py-8 sm:px-6 md:px-8 bg-gray-50 mx-auto max-w-7xl">
      <div className="max-w-xl mx-auto bg-white/70 rounded-3xl shadow-lg p-5 md:p-6 overflow-hidden">
        <h3 className="font-marko-one text-2xl md:text-3xl font-extrabold text-slate-800">
          LATEST NEWS
        </h3>
        <div className="mt-2 h-1 w-24 rounded bg-blue-600" />

        <style>{`
          @keyframes slideUpNews {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          .news-track { animation: slideUpNews 20s linear infinite; }
          .news-container:hover .news-track { animation-play-state: paused; }
        `}</style>

        <div className="sr-only">
          <button onClick={prev} aria-hidden="true">Prev</button>
          <button onClick={next} aria-hidden="true">Next</button>
        </div>

        <div className="news-container mt-5 h-80 overflow-hidden">
          <div className="news-track">
            {loopItems.map((news, idx) => {
              const d = new Date(news.date);
              const day = getOrdinal(d.getDate());
              const mon = getMonthShort(d);

              return (
                <Link
                  key={`${news.id}-${idx}`}
                  to={`/news/${news.id}`}
                  className="block rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 hover:shadow-md transition-shadow mb-4"
                >
                  <div className="flex items中心 gap-4 px-4 py-4">
                    <div className="shrink-0">
                      <div
                        className="w-16 h-16 rounded-xl text-white flex flex-col justify-center items-center leading-tight"
                        style={{
                          background:
                            "linear-gradient(180deg, #3b82f6 0%, #1e40af 100%)",
                        }}
                      >
                        <div className="text-lg font-extrabold">{day}</div>
                        <div className="text-[10px] tracking-widest">{mon}</div>
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-slate-900 font-semibold truncate pr-6">
                        {news.title}
                      </h4>
                      <p className="mt-1 text-sm text-slate-500">
                        {d.toLocaleDateString()}{" "}
                        {d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>

                    <div className="text-blue-600 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill="currentColor" className="w-5 h-5">
                        <path
                          fillRule="evenodd"
                          d="M8.47 3.97a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06L13.94 11 8.47 5.53a.75.75 0 0 1 0-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="pt-5">
          <Link
            to="/news"
            className="mx-auto flex w-full items-center justify-center gap-3 rounded-full px-6 py-3 text-white font-semibold shadow-md"
            style={{
              background:
                "linear-gradient(180deg, #3b82f6 0%, #2563eb 60%, #1d4ed8 100%)",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
              viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 6.75A.75.75 0 0 1 4.75 6h14.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 6.75zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H4.75a.75.75 0 0 1-.75-.75zm.75 4.5a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5H4.75z" />
            </svg>
            See All News
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsList;
