

const BG_COLORS = [
  "bg-gradient-to-br from-indigo-100 to-indigo-200",   // Soft Indigo
  "bg-gradient-to-br from-sky-100 to-sky-200",        // Sky Blue
  "bg-gradient-to-br from-teal-100 to-teal-200",       // Teal
  "bg-gradient-to-br from-emerald-100 to-emerald-200", // Emerald
  "bg-gradient-to-br from-amber-100 to-amber-200",     // Warm Amber
  "bg-gradient-to-br from-rose-100 to-rose-200",       // Rose
  "bg-gradient-to-br from-purple-100 to-purple-200",   // Purple
  "bg-gradient-to-br from-cyan-100 to-cyan-200",       // Cyan
  "bg-gradient-to-br from-lime-100 to-lime-200",       // Lime
];


const Activity = () => {


  const activities = []

  return (
    <div className="bg-white dark:bg-black/80">
      <div className="max-w-7xl px-4 py-8 mx-auto">
        <h2 className="text-3xl md:text-4xl dark:text-white/90 font-bold text-center text-blue-900 mb-4">
          Daily Activity
        </h2>
        <hr className="border-t border-2 border-black/20 dark:border-white/20  mt-2 mb-0" />
        <div className="px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {activities.map((item, idx) => {
              const bg = BG_COLORS[idx % BG_COLORS.length]; // 15 colors, used serially
              return (
                <div
                  key={idx}
                  className={`${bg} border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl 
              transition-transform hover:scale-105 hover:rotate-1`}
                >
                  <h3 className="text-xl font-bold text-blue-900 mb-2 tracking-tight">
                    {idx + 1}. {item.title}
                  </h3>
                  <div
                    className="text-gray-700 text-md leading-relaxed"
                  >
                    descr
                  </div>
                </div>

              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
