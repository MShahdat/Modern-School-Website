import React, { useState, useEffect } from 'react';
import { Api_Base_Url } from '../../Config/Api';

/* 🔵 ADD: per-tab cache (persists until hard refresh) */
let cachedSchoolData = null;
let schoolDataPromise = null;

const Gallery = () => {
  // 🔵 init from cache so revisits don’t show loader/refetch
  const [schoolData, setSchoolData] = useState(cachedSchoolData);
  const [loading, setLoading] = useState(!cachedSchoolData);
  const [error, setError] = useState(null);

  const [selectedIndex, setSelectedIndex] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 2 rows × 4 columns

  useEffect(() => {
    // If we already have cached data, don't fetch again
    if (cachedSchoolData) return;

    // Deduplicate in-flight requests across mounts
    if (!schoolDataPromise) {
      schoolDataPromise = fetch(`${Api_Base_Url}/`)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch school data');
          return res.json();
        })
        .then((data) => {
          cachedSchoolData = data; // cache for this tab
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
      .catch((err) => setError(err.message || 'Failed to load school data.'))
      .finally(() => setLoading(false));
  }, []);

  const isImage = (url = '') => /\.(jpe?g|png)(\?.*)?$/i.test(url);

  const Photos =
    (schoolData?.events ?? []).flatMap((event) =>
      (event?.galleries ?? [])
        .filter((g) => isImage(g?.media))
        .map((g) => ({
          img: g.media,
          name: g.caption || event.title || 'Photo',
          link: g.media,
          occation: g.caption || event.title || '',
        })),
    );

  // Pagination logic
  const totalPages = Math.ceil(Photos.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Photos.slice(indexOfFirstItem, indexOfLastItem);

  const openModal = (index) => setSelectedIndex(indexOfFirstItem + index);
  const closeModal = () => setSelectedIndex(null);
  const showPrev = () =>
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
  const showNext = () =>
    setSelectedIndex((prev) => (prev < Photos.length - 1 ? prev + 1 : prev));

  // ⬇️ Keyboard navigation when modal is open (unchanged)
  useEffect(() => {
    if (selectedIndex === null) return;

    const onKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < Photos.length - 1 ? prev + 1 : prev,
        );
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedIndex, Photos.length]);

  if (loading) {
    // 🔵 Shimmer loader matching gallery layout (no design change)
    const placeholders = Array.from({ length: 8 });
    return (
      <div className="bg-blue-50 px-4 py-8 xl:px-40 mx-auto">
        <div className="flex justify-center">
          <h3 className="h-5 w-1/4 flex bg-gray-200 rounded animate-pulse"></h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {placeholders.map((_, i) => (
            <div
              key={i}
              className="group relative border-1 border-cyan-500 bg-white rounded-lg overflow-hidden shadow-md"
            >
              <div className="w-full h-60 bg-gray-200 animate-pulse" />
              <div className="absolute bottom-0 left-0 w-full py-3">
                <div className="h-4 w-32 bg-gray-300 rounded mx-auto opacity-80" />
              </div>
              <div className="p-2">
                <div className="h-4 w-2/3 bg-gray-300 rounded mx-auto mt-2 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className='bg-blue-50 dark:bg-black/80'>
      <div className="max-w-7xl px-4 py-8 mx-auto">
        <h3 className="text-2xl md:text-4xl font-bold text-center text-blue-900 dark:text-white/90 mb-4">
          Our Photo Gallery
        </h3>
        <hr className="border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-12" />

        {/* ✅ Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentItems.map((customer, index) => (
            <div
              key={index}
              className="group relative border-1 border-cyan-500 bg-white rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
            >
              <img
                src={customer.img}
                alt={customer.name}
                className="w-full h-60 object-cover cursor-pointer"
                onClick={() => openModal(index)}
              />
              <div className="absolute bottom-0 left-0 w-full bg-opacity-80 text-white text-center py-3 transform translate-y-full group-hover:translate-y-0 transition duration-300">
                <a
                  href={customer.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium"
                />
              </div>
              <p className="text-gray-600 text-center mb-2">{customer.occation}</p>
            </div>
          ))}
        </div>

        {/* ✅ Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            {/* Hide "Previous" when on first page */}
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
                    ? 'bg-blue-700 text-white font-semibold'
                    : 'bg-gray-700 text-white hover:bg-blue-800'
                }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Hide "Next" when on last page */}
            {currentPage < totalPages && (
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="px-4 py-2 rounded bg-blue-900 text-white hover:bg-blue-950"
              >
                Next
              </button>
            )}
          </div>
        )}

        {/* ✅ Image Modal */}
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

            <div className="max-w-full max-h-[90vh] flex flex-col items-center px-4">
              <img
                src={Photos[selectedIndex].img}
                alt={Photos[selectedIndex].name}
                className="max-w-full max-h-[80vh] rounded-lg"
              />
              <p className="mt-4 text-white text-center text-lg font-semibold px-3 py-1 bg-black/50 rounded">
                {Photos[selectedIndex].occation || Photos[selectedIndex].name}
              </p>
            </div>

            <button
              className="absolute right-4 text-white text-4xl"
              onClick={showNext}
              disabled={selectedIndex === Photos.length - 1}
            >
              &#8594;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
