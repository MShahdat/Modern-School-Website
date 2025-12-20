import React, { useState } from "react";
import videoData from "../Others/VideoData";

const VideoGallery = () => {
  const [modalIndex, setModalIndex] = useState(null);

  // NEW: offset to nudge the track by exactly one card width per click
  const [offset, setOffset] = useState(0);

  // Duplicate videos for infinite loop (for the marquee)
  const loopVideos = [...videoData, ...videoData];

  // Modal navigation (unchanged)
  const showPrev = () => {
    setModalIndex((prev) => (prev === 0 ? videoData.length - 1 : prev - 1));
  };
  const showNext = () => {
    setModalIndex((prev) => (prev === videoData.length - 1 ? 0 : prev + 1));
  };

  // NEW: carousel arrow handlers (move one card)
  const slidePrev = () => {
    setOffset((o) => (o === 0 ? videoData.length - 1 : o - 1));
  };
  const slideNext = () => {
    setOffset((o) => (o === videoData.length - 1 ? 0 : o + 1));
  };

  // card width step = w-72 (18rem) + gap-4 (1rem) = 19rem
  const STEP = "19rem";

  return (
    <div className="bg-blue-50">
      <div className=" px-4 py-8 xl:px-8 mx-auto max-w-7xl">
      <h3 className="font-marko-one text-4xl font-bold text-center text-cyan-800 mb-4">
        Our Video Gallery
      </h3>
      <hr className="border-t border-2 border-gray-500 mt-2 mb-12" />

      {/* Animation styles */}
      <style>{`
        @keyframes slide-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .video-slider .track {
          animation: slide-left 60s linear infinite;
          will-change: transform;
        }
        .video-slider:hover .track {
          animation-play-state: paused;
        }
      `}</style>

      {/* Slider Container */}
      <div className="relative flex items-center justify-center video-slider">
        {/* Left Arrow -> now slides the track one card */}
        <button
          onClick={slidePrev}
          className="absolute left-4 bg-blue-900 text-white rounded-full p-3 hover:bg-blue-950 z-10"
        >
          &#8592;
        </button>

        {/* Infinite marquee-style track */}
        <div className="w-full max-w-6xl overflow-hidden">
          <div
            className="track flex gap-4 w-[200%]"
            style={{
              // manual step offset layered on top of the marquee animation
              marginLeft: `calc((-${STEP}) * ${offset})`,
              transition: "margin-left 400ms ease",
            }}
          >
            {loopVideos.map((video, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-lg overflow-hidden shadow-md border border-cyan-200 w-72 shrink-0"
              >
                <div
                  className="w-full h-60 bg-black cursor-pointer relative"
                  onClick={() => setModalIndex(idx % videoData.length)}
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
                <p className="text-gray-600 text-center mb-2 px-2">
                  {video.occation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow -> now slides the track one card */}
        <button
          onClick={slideNext}
          className="absolute right-4 bg-blue-900 text-white rounded-full p-3 hover:bg-blue-950 z-10"
        >
          &#8594;
        </button>
      </div>

      {/* See More Button */}
      <div className="text-center mt-8">
        <a
          href="/videos"
          className="px-8 py-2 rounded-2xl text-lg font-bold text-white bg-blue-900 hover:scale-105 transform hover:duration-300 hover:bg-blue-950"
        >
          See More
        </a>
      </div>

      {/* Modal (unchanged) */}
      {modalIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white text-3xl font-bold"
            onClick={() => setModalIndex(null)}
          >
            &times;
          </button>

          <button
            className="absolute left-4 text-white text-4xl"
            onClick={showPrev}
          >
            &#8592;
          </button>

          <div className="max-w-full max-h-[90vh]">
            {videoData[modalIndex]?.videoType === "youtube" ? (
              <iframe
                className="w-[80vw] h-[80vh] rounded-lg"
                src={videoData[modalIndex].src}
                title={videoData[modalIndex].name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video className="w-[80vw] h-[80vh] rounded-lg" controls autoPlay>
                <source src={videoData[modalIndex].src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          <button className="absolute right-4 text-white text-4xl" onClick={showNext}>
            &#8594;
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default VideoGallery;
