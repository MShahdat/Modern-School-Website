

const Notice = () => {

  const notices = []
  return (
    <div className=" bg-gray-50 dark:bg-black/80">
      <div className="max-w-7xl mx-auto p-8 ">
        <h3 className="text-3xl dark:text-white/90 md:text-4xl font-bold text-center text-blue-900 mb-4">
          Notices
        </h3>
        <hr className="border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-8" />

        {notices?.map((notice) => (
          <div
            key={notice.id}
            className="border border-blue-200 rounded-lg shadow-sm p-6 mb-6 bg-white"
          >
            <h2 className="text-xl font-bold text-blue-800">{notice.title}</h2>
            <p className="text-gray-700 font-semibold mt-2">
              Date :{" "}
              <span className="font-normal">
                {notice.created_at
                  ? new Date(notice.created_at).toLocaleDateString()
                  : ""}
              </span>
            </p>

            <p
              className="mt-2 text-black/70 line-clamp-1"
              dangerouslySetInnerHTML={{
                __html: String(notice.content ?? "").replace(/\n/g, "<br />"),
              }}
            />

            <div className="flex gap-4 mt-4">
              <button
                type="button"
                onClick={() => handleDownload(notice.file, `${notice.title}.jpg`)}
                className="bg-indigo-800 font-bold text-white px-4 py-2 rounded shadow hover:bg-indigo-900"
              >
                Download File
              </button>
              <Link
                to={`/notice/${notice.id}`}
                className="bg-gray-300 font-bold text-blue-800 px-4 py-2 rounded shadow hover:bg-gray-300"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notice;
