
const NewsList = () => {

  const news = []
  return (
    <div className="bg-blue-950 ">
      <div className="p-8 xl:px-10 max-w-7xl mx-auto">
        <div className="">
          <h3 className="text-center text-3xl md:text-4xl font-bold text-white mb-4">
            Latest News
          </h3>
        </div>

        <hr className="border-t border-2 border-gray-500 mt-2 mb-8" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {news?.map((news) => (
            <div
              key={news.id}
              className="border border-indigo-200 rounded-xl shadow-lg overflow-hidden bg-white transition-transform hover:scale-105 duration-300"
            >
              <img
                src={news.cover_image}
                alt={news.title}
                className="w-full h-50 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-indigo-800 line-clamp-1">
                  {news.title}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  📅 {news.created_at ? new Date(news.created_at).toLocaleDateString() : ""}
                </p>
                <div
                  className="mt-3 text-gray-700 line-clamp-1"
                  dangerouslySetInnerHTML={{
                    __html: String(news.content ?? "").replace(/\n/g, "<br />"),
                  }}
                />
                <div className="flex gap-4 mt-5">
                  <Link
                    to={`/news/${news.id}`}
                    className="bg-indigo-800 font-bold text-white px-4 py-2 rounded shadow hover:bg-indigo-900"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsList;
