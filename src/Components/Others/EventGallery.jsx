
const EventGallery = () => {
  const { id } = useParams();


  const gallery = []
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="p-8 max-w-7xl mx-auto xl:px-10">
        <h3 className=" text-4xl font-bold text-center text-indigo-800 mb-4">
          {eventItem.title}
        </h3>
        <hr className="border-t border-2 border-gray-500 mt-2 mb-12" />

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


            <div
              className="flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={gallery[currentIdx].media}
                alt={gallery[currentIdx].caption || eventItem.title}
                className="max-w-full max-h-[90vh] rounded-lg object-contain"
              />

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

export default EventGallery;
