import { Link } from "react-router";
import { useGetTeachers } from "../../hook";
import TeacherCard from "../../loading/teacher.card";
import { formatDate } from "../../utils/time.format";


const Teacher = () => {

  const { data, isPending } = useGetTeachers()

  if (isPending) {
    return <TeacherCard />
  }

  if (!data?.success) {
    return <p>Not found</p>
  }

  const teachers = data?.data ?? []

  return (
    <div className='bg-blue-50 dark:bg-black/80'>
      <div className="max-w-7xl px-4 py-8 mx-auto">
        <h3 className="text-3xl dark:text-white/90 md:text-4xl font-bold text-blue-900 text-center mb-4">Our Teachers</h3>
        <hr className="border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-6 mb-8">
          {teachers.map((teacher) => (
            <Link
              key={teacher.id}
              to={`/teacher/${teacher.id}`}
              className="bg-white rounded-2xl shadow-2xl pl-3 pr-1 py-4 transform transition duration-300 hover:scale-105 hover:shadow-3xl hover:ring-1 hover:ring-cyan-300"
            >
              <div className="flex items-center gap-4 sm:gap-4">
                <img
                  className="h-36 w-40 md:h-30 md:w-30 rounded-xl object-cover"
                  src={teacher.user.profileImage}
                  alt={teacher.name}
                />
                <div className="mt-0">
                  <p
                    className="text-lg sm:text-xl text-blue-900 font-bold uppercase"
                  >
                    {teacher?.name ?? "-"}
                  </p>
                  <p
                    className="font-semibold mt-2 text-gray-600"
                  >
                    {teacher?.designation ?? "-"}
                  </p>
                  <p className="font-semibold mt-2 text-gray-600">
                    {teacher?.joiningDate ? formatDate(teacher.joiningDate) : "null"} - {teacher?.endingDate ? formatDate(teacher.endingDate) : ""}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teacher;
