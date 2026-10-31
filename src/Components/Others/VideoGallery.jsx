// src/Components/Others/VideoGallery.jsx
import React, { useState, useEffect } from "react";
import { Api_Base_Url } from "../../Config/Api"; 


let cachedVideos = null;
let videosPromise = null;

const VideoGallery = () => {

  const [videos, setVideos] = useState(cachedVideos || []);
  const [loading, setLoading] = useState(!cachedVideos);

  useEffect(() => {
    const isMp4 = (url = "") => /\.mp4(\?.*)?$/i.test(url);

    if (cachedVideos) return;

    if (!videosPromise) {
      videosPromise = fetch(`${Api_Base_Url}/`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch video data");
          return res.json();
        })
        .then((data) => {
          const built =
            (data?.events ?? []).flatMap((event) =>
              (event?.galleries ?? [])
                .filter((g) => isMp4(g?.media))
                .map((g) => ({
                  videoType: "mp4",
                  src: g.media,
                  name: g.caption || event.title || "Video",
                  occation: g.caption || event.title || "",
                }))
            );
          cachedVideos = built; 
          return built;
        })
        .catch(() => {
          cachedVideos = [];
          return [];
        })
        .finally(() => {
          videosPromise = null;
        });
    }

    setLoading(true);
    videosPromise
      .then((built) => setVideos(built))
      .finally(() => setLoading(false));
  }, []);


  const itemsPerPage = 8; 
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(videos.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = videos.slice(indexOfFirstItem, indexOfLastItem);


  const [selectedIndex, setSelectedIndex] = useState(null);

  const openModal = (index) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  const showPrev = () =>
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
  const showNext = () =>
    setSelectedIndex((prev) =>
      prev < currentItems.length - 1 ? prev + 1 : prev
    );

  if (loading) {
    const placeholders = Array.from({ length: 8 });
    return (
      <div className="bg-blue-50 px-4 py-8 xl:px-40 mx-auto">
        <div className="flex justify-center">
          <h3 className="h-5 w-1/4 flex bg-gray-200 rounded animate-pulse"></h3>
        </div>
        {/* Grid skeletons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {placeholders.map((_, i) => (
            <div
              key={i}
              className="group relative border border-cyan-100 bg-white rounded-lg overflow-hidden shadow-md"
            >
              <div className="w-full h-60 bg-gray-100 animate-pulse" />
              <p className="text-gray-600 text-center mb-2">
                <span className="inline-block h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 dark:bg-black/80">
      <div className="max-w-7xl px-4 py-8 mx-auto">
        <h3 className="text-3xl md:text-4xl font-bold text-center text-blue-900 dark:text-white/90 mb-4">
          Our Video Gallery
        </h3>
        <hr className="border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-8" />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentItems.map((video, index) => (
            <div
              key={index}
              className="group relative border border-cyan-500 bg-white rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
            >
              <div
                className="w-full h-60 bg-black cursor-pointer"
                onClick={() => openModal(index)}
              >
                {video.videoType === "youtube" ? (
                  <iframe
                    className="w-full h-full"
                    src={video.src}
                    title={video.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video className="w-full h-full object-cover" muted>
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              <p className="text-gray-600 text-center mb-2">{video.occation}</p>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            {currentPage > 1 && (
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 rounded bg-blue-900 text-white hover:bg-blue-950"
              >
                Previous
              </button>
            )}

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-700 text-white font-semibold"
                    : "bg-gray-700 text-white hover:bg-blue-800"
                }`}
              >
                {i + 1}
              </button>
            ))}

            {currentPage < totalPages && (
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="px-4 py-2 rounded bg-blue-900 text-white hover:bg-blue-950"
              >
                Next
              </button>
            )}
          </div>
        )}

        {selectedIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>

            <button
              className="absolute left-4 text-white text-4xl"
              onClick={showPrev}
              disabled={selectedIndex === 0}
            >
              &#8592;
            </button>

            <div className="max-w-full max-h-[90vh]">
              {currentItems[selectedIndex].videoType === "youtube" ? (
                <iframe
                  className="w-[80vw] h-[80vh]"
                  src={currentItems[selectedIndex].src}
                  title={currentItems[selectedIndex].name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video className="w-[80vw] h-[80vh]" controls autoPlay>
                  <source
                    src={currentItems[selectedIndex].src}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            <button
              className="absolute right-4 text-white text-4xl"
              onClick={showNext}
              disabled={selectedIndex === currentItems.length - 1}
            >
              &#8594;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoGallery;
