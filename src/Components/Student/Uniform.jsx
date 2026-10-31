

const Uniform = () => {

  const uniforms = []

  return (
    <div className="bg-gray-50 dark:bg-black/80">
      <section className="w-full py-8">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-slate-800 dark:text-white/90">
                Students Uniform
              </h2>
              <div className="mt-3">
                <div className="h-[3px] w-28 bg-blue-400 rounded-full" />
                <div className="h-[3px] w-20 bg-blue-300 rounded-full mt-1" />
              </div>
              <div className="text-[16px] md:text-[17px] text-justify mt-4 text-gray-600 line-clamp-14 dark:text-white/90 leading-relaxed tracking-wider">
                <div>
                  <p className="text-lg font-semibold underline ">Boys</p>
                  <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam impedit fuga fugit voluptate tempora ex nobis excepturi, quidem in quis minus itaque ipsam dicta ratione pariatur, officiis a autem distinctio corporis earum laudantium incidunt similique obcaecati deserunt! Esse, obcaecati aliquam?</p>
                </div>
                <div className="mt-4">
                  <p className="text-lg font-semibold underline ">Girls</p>
                  <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, eos? Quaerat obcaecati id distinctio quo corporis iusto tempora eius. Sint dolore explicabo provident, nostrum vel quam error autem laborum placeat?</p>
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-3xl shadow-xl p-8 relative flex items-center justify-center"
            >
              <div className="w-full h-[400px] overflow-hidden">
                <div
                  className="flex transition-transform ease-in-out h-full"
                >
                  {uniforms.map((s, i) => (
                    <div key={`${s.src}-${i}`} className="w-full h-full flex-shrink-0 flex flex-col items-center">
                      <img
                        src={s.src}
                        alt={s.label}
                        className="w-full h-full object-cover border-4 border-white shadow-lg"
                      />
                      <p className="text-center text-black font-semibold mt-3">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Uniform;
