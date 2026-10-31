import { Link, useParams } from "react-router";
import { useGetSingleTeacher } from "../../hook";
import { formatDate } from "../../utils/time.format";


const TeacherDetails = () => {
  const { id } = useParams();

  const { data, isPending } = useGetSingleTeacher(id)

  if (isPending) {
    return <p>loading..</p>
  }

  if (!data?.success) {
    return <p>not found</p>
  }

  const teacher = data?.data ?? undefined

  return (
    <div className='bg-gray-50 dark:bg-black/80'>
      <div className="max-w-7xl mx-auto min-h-screen p-8">
        <h3 className="text-3xl dark:text-white/90 md:text-4xl font-bold text-blue-900 text-center mb-4">
          Our Teacher Details
        </h3>
        <hr className="border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-12" />
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg px-4 py-8">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left Profile */}
            <div className="flex flex-col items-center mt-8 md:w-1/3">
              <img
                src={teacher?.user?.profileImage}
                alt={teacher?.name}
                className="w-48 h-56 object-cover rounded-md border"
              />

              <h2
                className="text-xl md:text-2xl font-bold text-black/80 mt-4 uppercase"

              >
                {teacher?.name ?? "-"}
              </h2>
              <p
                className="text-gray-600 font-semibold"
              >
                {teacher?.designation ?? "-"}
              </p>
            </div>

            {/* Right Details */}
            <div className="md:w-2/3">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b-2 border-gray-300">
                    <td className="py-3 font-bold text-gray-800 w-48">MPO Index no. :</td>
                    <td className='text-black/80'>{teacher?.teacherId}</td>
                  </tr>
                  <tr className="border-b-2 border-gray-300">
                    <td className="py-3 font-bold text-gray-800">Joining Date :</td>
                    <td className='text-black/80'>{teacher?.jointingDate ? formatDate(teacher?.jointingDate) : "-"}</td>
                  </tr>
                  <tr className="border-b-2 border-gray-300">
                    <td className="py-3 font-bold text-gray-800">Father's Name :</td>
                    <td className='text-black/80'>{teacher.fathersName ?? "-"}</td>
                  </tr>
                  <tr className="border-b-2 border-gray-300">
                    <td className="py-3 font-bold text-gray-800">Mother's Name :</td>
                    <td className='text-black/80'>{teacher.motherName ?? "-"}</td>
                  </tr>
                  <tr className="border-b-2 border-gray-300">
                    <td className="py-3 font-bold text-gray-800">Email :</td>
                    <td className='text-black/80'>{teacher?.email ?? "-"}</td>
                  </tr>
                  <tr className="border-b-2 border-gray-300">
                    <td className="py-3 font-bold text-gray-800">Contact No. :</td>
                    <td className='text-black/80'>+88{teacher?.phone ?? "-"}</td>
                  </tr>
                  <tr className="border-b-2 border-gray-300 align-top">
                    <td className="py-3 font-bold text-gray-800">Qualification :</td>
                    <td
                      className="prose prose-sm text-black/80 max-w-none"
                    >
                      {teacher?.highestDegree ?? "-"}
                    </td>
                  </tr>
                  <tr className="border-b-2 border-gray-300">
                    <td className="py-3 font-bold text-gray-800">Experience :</td>
                    <td className='text-black/80'>{`${teacher?.experienceYears} Years` ?? "-"}</td>
                  </tr>
                  <tr className="border-b-2 border-gray-300 align-top">
                    <td className="py-3 font-bold text-gray-800">Present Address :</td>
                    <td
                      className="prose prose-sm text-black/80 max-w-none"
                    >
                      {teacher?.presentAddress?.street ?? "-"}
                    </td>
                  </tr>
                  <tr className="border-b-2 border-gray-300 align-top">
                    <td className="py-3 font-bold text-gray-800">Permanent Address :</td>
                    <td
                      className="prose text-black/80 prose-sm max-w-none"
                    >
                      {teacher?.permanentAddress?.street ?? "-"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8 text-center">
            <Link
              to="/our-teachers"
              className="px-6 py-2 text-lg bg-blue-900 font-bold text-white rounded-md hover:bg-blue-950 transition"
            >
              Back to Teachers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;
