
const Ab = () => {

  return (
    <section className="w-full bg-gray-50 dark:bg-black dark:text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          <div>
            <h2 className=" text-3xl dark:text-white sm:text-4xl font-semibold text-slate-800">
              About
            </h2>
            <div className="mt-3">
              <div className="h-[3px] w-28 bg-blue-400 rounded-full" />
              <div className="h-[3px] w-20 bg-blue-300 rounded-full mt-1" />
            </div>
            <p className="text-[16px] sm:text-[17px] leading-relaxed tracking-wider text-justify mt-4 text-black/70 dark:text-white/90 line-clamp-9">
              klkl
            </p>
            <a
              href="/about"
              className="inline-flex items-center font-semibold gap-2 mt-12 px-6 py-2.5 rounded text-white bg-blue-900 dark:bg-white dark:text-black/80 shadow-md transition"
            >
              Learn More About Us
            </a>
          </div>

          <div
            className="bg-white dark:text-black/80 rounded-3xl shadow-xl p-8 relative flex items-center justify-center min-h-[420px]"
          >

          </div>
        </div>
      </div>
    </section>
  );
};

export default Ab;
