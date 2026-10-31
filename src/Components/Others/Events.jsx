

const Events = () => {


  const events = [];

  return (
    <div className="bg-blue-950">
      <div className=" p-8 xl:px-00 max-w-7xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
          Our Events
        </h3>
        <hr className="border-t border-2 border-gray-500 mt-2 mb-8" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {events.map((ev) => {

            const descHTML = String(ev.description ?? "").replace(/\n/g, "<br />");
            return (
              <div
                key={ev.id}
                className="border border-indigo-200 rounded-xl shadow-lg overflow-hidden bg-white transition-transform hover:scale-105 duration-300"
              >
                <img
                  src={ev.cover_image}
                  alt={ev.title}
                  className="w-full h-50 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-indigo-800 line-clamp-1">
                    {ev.title}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">📅 {ev.event_date}</p>

                  <p
                    className="mt-3 text-gray-700 line-clamp-1"
                    dangerouslySetInnerHTML={{ __html: descHTML }}
                  />

                  <div className="flex gap-4 mt-5">
                    <Link
                      to={`/events/${ev.id}`}
                      className="bg-indigo-800 font-bold text-white px-4 py-2 rounded shadow hover:bg-indigo-900"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {!events.length && (
            <div className="text-white col-span-full text-center">
              No events available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
