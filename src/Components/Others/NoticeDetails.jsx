import { useParams } from "react-router";


const NoticeDetails = () => {
  const { id } = useParams();


  return (
    <div className="bg-gray-50 dark:bg-black/80">
      <div className="p-8 max-w-7xl mx-auto ">
        <h3 className="text-3xl dark:text-white/90 md:text-4xl font-bold text-center text-blue-800 mb-4">
          Details Notice
        </h3>
        <hr className="border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-8" />
        {/* <div className="border border-blue-200 rounded-lg shadow-sm p-6 bg-white">
        <h1 className="text-2xl font-bold text-blue-800">{noticeItem.title}</h1>
        <p className="font-bold text-black/70 mt-2">
          Date :{" "}
          <span>
            {noticeItem.created_at
              ? new Date(noticeItem.created_at).toLocaleDateString()
              : ""}
          </span>
        </p>
        <img
          src={noticeItem.file}
          alt={noticeItem.title}
          className="mt-4 w-full h-auto rounded-lg shadow-sm"
        />
        <p
          className="mt-2 text-black/90 text-[16px] md:text-[17px] tracking-wide leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: String(noticeItem.content ?? "").replace(/\n/g, "<br />"),
          }}
        />
        <div className="mt-6 flex gap-4">
          <button
            type="button"
            onClick={handleDownload}
            className="bg-indigo-800 font-bold text-white px-4 py-2 rounded shadow hover:bg-indigo-900"
          >
            Download File
          </button>
          <Link
            to="/notice"
            className="bg-gray-300 font-bold text-blue-800 px-4 py-2 rounded shadow hover:bg-gray-300"
          >
            Back to Notices
          </Link>
        </div>
      </div> */}
      </div>
    </div>
  );
};

export default NoticeDetails;
