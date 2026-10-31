
const Teacher = () => {


  const teachers = [];

  return (
    <div className='bg-blue-950'>
      <div className=" px-4 py-16 mx-auto max-w-7xl">
        <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Our Teachers</h3>
        <hr className="border-t border-2 border-gray-500 mt-2 mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-6 mb-8">
          {teachers.map((teacher, idx) => (
            <Link
              key={teacher.id}
              ref={(el) => (cardRefs.current[idx] = el)}
              to={`/teacher/${teacher.id}`}
              className="bg-white rounded-2xl shadow-2xl pl-3 pr-1 py-4 transform transition duration-300 hover:scale-105 hover:shadow-3xl hover:ring-1 hover:ring-cyan-300"
            >
              <div className="flex gap-4">
                <img
                  className="h-36 w-40 md:h-30 md:w-30 rounded-xl object-cover"
                  src={teacher.photo}
                  alt={teacher.name}
                />
                <div className="mt-0">
                  <p className="text-xl text-blue-900 font-bold uppercase">{teacher.name}</p>
                  <p className="font-semibold mt-2 text-gray-600">{teacher.designation?.title}</p>
                  <p className="font-semibold mt-2 text-gray-600">+88{teacher.phone}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {teachers.length > 6 && (
          <div className="flex justify-end mt-6">
            <Link
              to="/our-teachers"
              className="inline-flex items-center gap-2 bg-white text-blue-900 font-bold px-6 py-2 rounded shadow transition hover:bg-blue-900 hover:text-white hover:scale-105 duration-200"
            >
              View all Teachers
              <span className="text-xl">
                <MdKeyboardDoubleArrowRight />
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teacher;
