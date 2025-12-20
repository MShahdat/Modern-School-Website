// src/Components/Others/Notices.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Api_Base_Url } from "../../Config/Api";

/* 🔵 Per-tab cache & deduped promise (same as Notice.jsx) */
let cachedSchoolData = null;
let schoolDataPromise = null;

const Notices = () => {
  const [schoolData, setSchoolData] = useState(cachedSchoolData);
  const [loading, setLoading] = useState(!cachedSchoolData);
  const [error, setError] = useState(null);

  // ✅ Fetch EXACTLY like Notice.jsx
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

  // 🔎 Normalize, sort (newest → oldest) and LIMIT to 6 items
  const displayNotices = useMemo(() => {
    const list = schoolData?.notices || [];
    return list
      .map((n) => ({
        id: n.id,
        title: (n.title || "").trim(),
        file: n.file || "",
        created_at: n.created_at || "",
      }))
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 6);
  }, [schoolData]);

  /** ── Marquee setup ── */
  const trackRef = useRef(null);
  const scrollerRef = useRef(null);
  const [durationSec, setDurationSec] = useState(40);

  // adjust speed to content length (seamless loop with duplication)
  useEffect(() => {
    const t = setTimeout(() => {
      const track = trackRef.current;
      const scroller = scrollerRef.current;
      if (!track || !scroller) return;
      const width = track.scrollWidth / 2; // duplicated
      const viewport = scroller.clientWidth || 1;
      const secs = Math.min(120, Math.max(12, (width + viewport) / 100)); // ~100px/s
      setDurationSec(secs);
    }, 0);
    return () => clearTimeout(t);
  }, [displayNotices.length]);

  // 🔹 consistent bullet utility
  const Bullet = () => (
    <span aria-hidden className="mx-5 inline-block h-2 w-2  rounded-full bg-white" />
  );

  // 🔹 render a single item, optionally forcing a leading bullet
  const renderItem = (n, idx, forceLeadingBullet = false) => (
    <span key={n.id ?? `${n.title}-${idx}`} className="inline-flex items-center text-white/95">
      {(idx !== 0 || forceLeadingBullet) && <Bullet />}
      <Link
        to={`/notice/${n.id}`}
        className="text-[16px] font-semibold hover:underline underline-offset-2 decoration-white/40 hover:decoration-white"
        title={n.title}
      >
        {n.title}
      </Link>
    </span>
  );

  return (
    <section className="w-full bg-black">
      {/* Design: LatestNotice look, marquee functionality */}
      <style>{`
        @keyframes notice-marquee-x {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); } /* 50% because we duplicate content */
        }
      `}</style>

      <div className="max-w-7xl mx-auto flex items-stretch">
        {/* Left label (white box) */}
        <div className="bg-white px-2 sm:px-4 py-2 flex items-center shrink-0">
          <span className="text-sm text-black/70 sm:text-[16px] font-bold">Latest Notice</span>
        </div>

        {/* Scroller rail */}
        <div
          ref={scrollerRef}
          className="relative overflow-hidden flex-1 h-[44px] flex items-center"
          aria-label="Latest notices"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#063a63] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[#063a63] to-transparent" />

          {loading ? (
            <div className="px-4 text-white/80 animate-pulse">Loading notices…</div>
          ) : error ? (
            <div className="px-4 text-red-200">{error}</div>
          ) : !displayNotices.length ? (
            <div className="px-4 text-white/80">No notices available.</div>
          ) : (
            <div
              ref={trackRef}
              className="whitespace-nowrap inline-flex items-center gap-8 px-4 will-change-transform"
              style={{
                animation: `notice-marquee-x ${durationSec}s linear infinite`,
              }}
            >
              {/* A bullet right after the label to match the screenshot */}
              <Bullet />

              {/* pass 1 */}
              {displayNotices.map((n, i) => renderItem(n, i))}

              {/* pass 2 (duplicate) — force a bullet before the first duplicate
                  so the separator between the last & first is ALWAYS present */}
              {displayNotices.map((n, i) => renderItem(n, i, i === 0))}
            </div>
          )}

          {/* Pause marquee on hover/focus */}
          <style>{`
            [aria-label="Latest notices"]:hover > div[style],
            [aria-label="Latest notices"]:focus-within > div[style] {
              animation-play-state: paused;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default Notices;
