// src/Components/Others/Photo.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Api_Base_Url } from "../../Config/Api";

const Photo = () => {
  // Replaces local Photos import with API-driven data
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state (unchanged)
  const [modalIndex, setModalIndex] = useState(null);

  // NEW: offset for track position (unchanged)
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${Api_Base_Url}/`);
        if (!res.ok) throw new Error("Failed to fetch school data");
        const data = await res.json();

        // Flatten all event galleries into the shape your UI expects
        // Each item must have: { img, name, occation }
        const events = Array.isArray(data?.events) ? data.events : [];
        const flat = [];
        for (const ev of events) {
          const galleries = Array.isArray(ev?.galleries) ? ev.galleries : [];
          for (const g of galleries) {
            flat.push({
              img: g?.media || "",                          // image url
              name: g?.caption || ev?.title || "Photo",     // used for alt in card & modal
              occation: g?.caption || "",      // label beneath card (kept)
            });
          }
        }

        setPhotos(flat);
      } catch (e) {
        setError(e.message || "Failed to load school data.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Duplicate list for infinite loop (unchanged)
  const loop = useMemo(() => [...photos, ...photos], [photos]);

  // Modal navigation (unchanged, but guarded for empty data)
  const showPrevModal = () => {
    if (!photos.length) return;
    setModalIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };
  const showNextModal = () => {
    if (!photos.length) return;
    setModalIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  // NEW: carousel arrow navigation (unchanged, but guarded)
  const slidePrev = () => {
    if (!photos.length) return;
    setOffset((o) => (o === 0 ? photos.length - 1 : o - 1));
  };
  const slideNext = () => {
    if (!photos.length) return;
    setOffset((o) => (o === photos.length - 1 ? 0 : o + 1));
  };

  // Step size = w-64 (16rem) + gap-4 (1rem) = 17rem (unchanged)
  const STEP = "17rem";

  // Keep structure/design as-is. No loading or error UI added to avoid layout changes.
  return (
    <div className="bg-blue-50 px-4 py-8 xl:px-8 mx-auto rounded-xl max-w-7xl">
      <h3 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-4">
        Our Photo Gallery
      </h3>
      <hr className="border-t border-2 border-gray-500 mt-2 mb-12" />

      {/* Animation styles */}
      <style>{`
        @keyframes slide-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .slider .track {
          animation: slide-left 60s linear infinite;
          will-change: transform;
        }
        .slider:hover .track {
          animation-play-state: paused;
        }
      `}</style>

      {/* Slider Container */}
      <div className="relative flex items-center justify-center slider">
        {/* Left Arrow */}
        <button
          onClick={slidePrev}
          className="absolute left-4 bg-blue-900 text-white rounded-full p-3 hover:bg-blue-950 z-10"
          disabled={!photos.length}
        >
          &#8592;
        </button>

        {/* Track */}
        <div className="w-full max-w-5xl overflow-hidden">
          <div
            className="track flex gap-4 w-[200%]"
            style={{
              marginLeft: photos.length
                ? `calc((-${STEP}) * ${offset})`
                : undefined,
              transition: "margin-left 400ms ease",
              // Pause the auto-scroll animation when we have no data
              animationPlayState: photos.length ? undefined : "paused",
            }}
          >
            {loop.map((customer, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-lg overflow-hidden shadow-md border border-cyan-200 w-64 shrink-0"
              >
                <img
                  src={customer.img}
                  alt={customer.name}
                  className="w-full h-60 object-cover cursor-pointer"
                  onClick={() => {
                    if (!photos.length) return;
                    setModalIndex(idx % photos.length);
                  }}
                />
                <p className="text-gray-600 text-center mb-2 px-2 line-clamp-1">
                  {customer.occation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={slideNext}
          className="absolute right-4 bg-blue-900 text-white rounded-full p-3 hover:bg-blue-950 z-10"
          disabled={!photos.length}
        >
          &#8594;
        </button>
      </div>

      {/* See More Button */}
      <div className="text-center mt-8">
        <a
          href="/gallery"
          className="px-8 py-2 rounded-sm font-semibold text-white bg-blue-900 hover:scale-105 transform hover:duration-300 hover:bg-blue-950"
        >
          See More
        </a>
      </div>

      {/* Modal */}
      {modalIndex !== null && photos.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white text-3xl font-bold"
            onClick={() => setModalIndex(null)}
          >
            &times;
          </button>

          <button
            className="absolute left-4 text-white text-4xl"
            onClick={showPrevModal}
          >
            &#8592;
          </button>

          <img
            src={photos[modalIndex].img}
            alt={photos[modalIndex].name}
            className="max-w-full max-h-[90vh] rounded-lg"
          />

          <button
            className="absolute right-4 text-white text-4xl"
            onClick={showNextModal}
          >
            &#8594;
          </button>
        </div>
      )}
    </div>
  );
};

export default Photo;
