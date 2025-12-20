// src/Components/Others/EventGallery.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router";
import { Api_Base_Url } from "../../Config/Api";

const EventGallery = () => {
  const { id } = useParams();
  const [schoolData, setSchoolData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${Api_Base_Url}/`);
        if (!res.ok) throw new Error("Failed to fetch school data");
        const data = await res.json();
        setSchoolData(data);
      } catch (e) {
        setError(e.message || "Failed to load school data.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const eventItem = useMemo(() => {
    const all = schoolData?.events || [];
    return all.find((e) => e.id === Number(id));
  }, [schoolData, id]);

  if (loading) {
    return <div className="text-center py-4 text-gray-500">Loading event…</div>;
  }
  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }
  if (!eventItem) {
    return (
      <div className="p-8">
        <p>Event not found!</p>
        <Link to="/events" className="text-indigo-600 underline">Back to Events</Link>
      </div>
    );
  }

  const gallery = eventItem.galleries || [];

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

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="p-8 max-w-7xl mx-auto xl:px-10">
      <h3 className=" text-4xl font-bold text-center text-indigo-800 mb-4">
        {eventItem.title}
      </h3>
      <hr className="border-t border-2 border-gray-500 mt-2 mb-12" />

      {/* All images as cards */}
      {gallery.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {gallery.map((g, idx) => (
            <div
              key={g.id}
              className="group relative border-1 border-cyan-500 bg-white rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => openLightbox(idx)}
            >
              <img
                src={g.media}
                alt={g.caption || eventItem.title}
                className="w-full h-60 object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-opacity-80 text-white text-center py-3 transform translate-y-full group-hover:translate-y-0 transition duration-300" />
              <p className="font-semibold text-gray-700 text-center py-1 bg-gray-50">{g.caption || ""}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No photos for this event.</p>
      )}

      {/* Back link */}
      <div className="mt-8 flex gap-4">
        <Link
          to={`/events/${id}`}
          className="bg-gray-300 font-bold text-indigo-800 px-4 py-2 rounded shadow hover:bg-gray-300"
        >
          Back to Event
        </Link>
      </div>

      {/* LIGHTBOX — same full-view style as Gallery */}
      {lightboxOpen && gallery.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
        >
          {/* Close button (same position/behavior as Gallery) */}
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

          {/* Prev button (disabled at first image, like Gallery) */}
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

          {/* Centered image that fits any aspect ratio without cropping */}
          <div
            className="flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={gallery[currentIdx].media}
              alt={gallery[currentIdx].caption || eventItem.title}
              className="max-w-full max-h-[90vh] rounded-lg object-contain"
            />
            {/* Keep your caption (unchanged) */}
            <p className="mt-3 text-center text-white">
              {gallery[currentIdx].caption || ""}
            </p>
          </div>

          {/* Next button (disabled at last image, like Gallery) */}
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

export default EventGallery;
