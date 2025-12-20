// src/Components/Others/EventsDetails.js
import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Api_Base_Url } from "../../Config/Api";

// ⬅️ NEW: simple in-memory cache (per-tab)
let SCHOOL_DATA_CACHE = null;

const EventsDetails = () => {
  const { id } = useParams();

  // ⬅️ CHANGED: seed from cache to avoid spinner on return
  const [schoolData, setSchoolData] = useState(SCHOOL_DATA_CACHE);
  const [loading, setLoading] = useState(!SCHOOL_DATA_CACHE);
  const [error, setError] = useState(null);

  // lightbox & show-all state (unchanged)
  const [showAll, setShowAll] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  const isVideo = (url = "") => /\.mp4(\?.*)?$/i.test(url);

  useEffect(() => {
    const load = async () => {
      // ⬅️ NEW: prevent refetch if we already cached it
      if (SCHOOL_DATA_CACHE) return;

      try {
        const res = await fetch(`${Api_Base_Url}/`); // keep your current endpoint
        if (!res.ok) throw new Error("Failed to fetch school data");
        const data = await res.json();

        // ⬅️ NEW: store in cache + state
        SCHOOL_DATA_CACHE = data;
        setSchoolData(data);
      } catch (e) {
        setError(e.message || "Failed to load school data.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // pick the event by id
  const eventItem = useMemo(() => {
    const all = schoolData?.events || [];
    return all.find((e) => e.id === Number(id));
  }, [schoolData, id]);

  if (loading) {
    return (
      <div className="p-8 bg-gradient-to-b from-gray-50 to-gray-100 xl:px-30 animate-pulse">
        <div className="flex justify-center">
          <h3 className="h-5 w-1/4 flex bg-gray-200 rounded animate-pulse"></h3>
        </div>
        <div className="px-6 py-4 border border-indigo-200 rounded-xl shadow-lg bg-white">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 rounded" />
            ))}
          </div>

          <div className="space-y-3">
            <div className="h-6 w-1/2 bg-gray-200 rounded" />
            <div className="h-4 w-1/4 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
          </div>

          <div className="flex gap-4 mt-6">
            <div className="h-10 w-32 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  if (!eventItem) {
    return (
      <div className="p-8">
        <p>Events not found!</p>
        <Link to="/events" className="text-indigo-600 underline">Back to Events</Link>
      </div>
    );
  }

  const gallery = eventItem.galleries || [];
  const visibleGallery = showAll ? gallery : gallery.slice(0, 5);

  const openLightbox = (idx) => {
    setCurrentIdx(idx);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };
  // const prev = () => setCurrentIdx((i) => (i === 0 ? gallery.length - 1 : i - 1));
  // const next = () => setCurrentIdx((i) => (i === gallery.length - 1 ? 0 : i + 1));

  const descHTML = String(eventItem.description ?? "").replace(/\n/g, "<br />");

  return (
    <div className="bg-white dark:bg-black/80">
      <div className="p-8 max-w-7xl mx-auto">
      <h3 className="text-3xl dark:text-white/90 md:text-4xl font-bold text-center text-blue-800 mb-4">
        Event Details
      </h3>
      <hr className="border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-8" />

      <div className="px-6 py-4 border border-indigo-200 rounded-xl shadow-lg overflow-hidden bg-white">
        {gallery.length > 5 && !showAll && (
          <div className="flex items-center justify-end">
            <Link
              to={`/events/${id}/gallery`}
              className="text-green-800 text-xl mb-2 font-bold hover:underline"
            >
              see more
            </Link>
          </div>
        )}

        {gallery.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {visibleGallery.map((g, idx) => (
              <div
                key={g.id}
                className="group relative border-1 border-cyan-500 bg-white rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => openLightbox(idx)}
              >
                {isVideo(g.media) ? (
                  <video
                    src={g.media}
                    className="w-full h-60 object-cover"
                    controls
                    playsInline
                  />
                ) : (
                  <img
                    src={g.media}
                    alt={g.caption || eventItem.title}
                    className="w-full h-60 object-cover"
                  />
                )}
                <p className="font-semibold text-gray-700 py-1 line-clamp-1 bg-gray-100 text-center">
                  {g.caption || ""}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <>
            {isVideo(eventItem.cover_image) ? (
              <video
                src={eventItem.cover_image}
                className="w-full h-80 object-cover"
                controls
                playsInline
              />
            ) : (
              <img
                src={eventItem.cover_image}
                alt={eventItem.title}
                className="w-full h-80 object-cover"
              />
            )}
          </>
        )}

        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-800">{eventItem.title}</h1>
          <p className="text-gray-600 font-semibold mt-2">
            Date: <span className="font-normal">{eventItem.event_date}</span>
          </p>

          <p
            className="mt-4 text-gray-800"
            dangerouslySetInnerHTML={{ __html: descHTML }}
          />

          <div className="mt-6 flex gap-4">
            <Link
              to="/events"
              className="bg-gray-300 font-bold text-indigo-800 px-4 py-2 rounded shadow hover:bg-gray-300"
            >
              Back to Events
            </Link>
          </div>
        </div>
      </div>

      {lightboxOpen && gallery.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl font-bold"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            aria-label="Close"
          >
            &times;
          </button>

          <button
            className="absolute left-4 text-white text-4xl disabled:opacity-50"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIdx((i) => (i > 0 ? i - 1 : i));
            }}
            disabled={currentIdx === 0}
            aria-label="Previous"
          >
            &#8592;
          </button>

          <div className="flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            {isVideo(gallery[currentIdx].media) ? (
              <video
                src={gallery[currentIdx].media}
                className="max-w-full max-h-[90vh] rounded-lg object-contain"
                controls
                playsInline
              />
            ) : (
              <img
                src={gallery[currentIdx].media}
                alt={gallery[currentIdx].caption || eventItem.title}
                className="max-w-full max-h-[90vh] rounded-lg object-contain"
              />
            )}
            <p className="mt-3 text-center text-white">
              {gallery[currentIdx].caption || ""}
            </p>
          </div>

          <button
            className="absolute right-4 text-white text-4xl disabled:opacity-50"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIdx((i) => (i < gallery.length - 1 ? i + 1 : i));
            }}
            disabled={currentIdx === gallery.length - 1}
            aria-label="Next"
          >
            &#8594;
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default EventsDetails;
