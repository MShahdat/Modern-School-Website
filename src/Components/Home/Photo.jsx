// src/Components/Others/Photo.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Api_Base_Url } from "../../Config/Api";

const Photo = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [modalIndex, setModalIndex] = useState(null);


  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${Api_Base_Url}/`);
        if (!res.ok) throw new Error("Failed to fetch school data");
        const data = await res.json();

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


  const loop = useMemo(() => [...photos, ...photos], [photos]);


  const showPrevModal = () => {
    if (!photos.length) return;
    setModalIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };
  const showNextModal = () => {
    if (!photos.length) return;
    setModalIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };


  const slidePrev = () => {
    if (!photos.length) return;
    setOffset((o) => (o === 0 ? photos.length - 1 : o - 1));
  };
  const slideNext = () => {
    if (!photos.length) return;
    setOffset((o) => (o === photos.length - 1 ? 0 : o + 1));
  };

  const STEP = "17rem";

  return (
    <div className="bg-blue-50 px-4 py-8 xl:px-8 mx-auto rounded-xl max-w-7xl">
      <h3 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-4">
        Our Photo Gallery
      </h3>
      <hr className="border-t border-2 border-gray-500 mt-2 mb-12" />

    </div>
  );
};

export default Photo;
