
const Achievements = () => {

  const schoolData = undefined

  return (
    <div className="bg-blue-950">
      <div className="max-w-7xl mx-auto p-8">
        <h3 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
          Our Achievements
        </h3>
        <hr className="border-t border-2 border-gray-500 mt-2 mb-12" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {schoolData?.achievements?.map((news) => (
            <div
              key={news.id}
              className="border border-indigo-200 rounded-xl shadow-lg overflow-hidden bg-white transition-transform hover:scale-105 duration-300"
            >
              <img
                src={news.cover_image}
                alt={news.title}
                className="w-full h-[200px] object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-indigo-800 line-clamp-1">
                  {news.title}
                </h2>

                <div
                  className="mt-2 text-gray-700 line-clamp-1"
                  dangerouslySetInnerHTML={{
                    __html: String(news.description ?? "").replace(/\n/g, "<br />"),
                  }}
                />

                <div className="flex gap-4 mt-5">
                  <Link
                    to={`/achievements/${news.id}`}
                    className="bg-indigo-800 font-bold text-white px-4 py-1.5 rounded shadow hover:bg-indigo-900"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {!schoolData?.achievements?.length && (
            <div className="text-white col-span-full text-center">
              No Achievements available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
