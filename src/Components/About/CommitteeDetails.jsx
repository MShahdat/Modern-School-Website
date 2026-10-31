import { i } from "framer-motion/client";
import { Link, useParams } from "react-router";
import { useGetSingleCommittee } from "../../hook";

const CommitteeDetails = () => {

  const { id } = useParams()

  // console.log('id', id)

  const { data, isPending } = useGetSingleCommittee(id)

  if (isPending) {
    return <p>loading..</p>
  }

  if (!data?.success) {
    return <p>not found</p>
  }

  console.log(data)

  const committee = data?.data ?? undefined

  return (
    <div className="bg-gray-50 dark:bg-black/80">
      <div className="max-w-7xl mx-auto min-h-screen p-8">
        <h3 className="text-2xl dark:text-white/90 md:text-4xl font-bold text-blue-900 text-center mb-4">
          Our Governing Body Details
        </h3>
        <hr className="border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-12" />

        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="flex flex-col md:flex-row gap-10">

            <div className="flex flex-col items-center md:w-1/3 mt-8">
              <img
                src={committee?.user?.profileImage}
                alt={committee?.name}
                className="w-48 h-56 object-cover rounded-md border"
              />
              <h2
                className="text-2xl font-bold mt-4 uppercase text-blue-950"
              >
                {committee?.name ?? "Name"}
              </h2>
              <p
                className="text-gray-600 font-semibold"
              >
                {committee?.designation}
              </p>
            </div>


            <div className="md:w-2/3">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b-2 border-gray-300">
                    <td className="py-3 font-bold text-gray-800 w-48">MPO Index no. :</td>
                    <td className="text-black/80">{committee?.committeeId}</td>
                  </tr>
                  <tr className="border-b-2 border-gray-300">
                    <td className="py-3 font-bold text-gray-800">Joining Date :</td>
                    <td className="text-black/80">{committee?.startingDate}</td>
                  </tr>
                  <tr className="border-b-2 border-gray-300">
                    <td className="py-3 font-bold text-gray-800">Father's Name :</td>
                    <td className="text-black/80">{committee?.fatherName ?? "-"}</td>
                  </tr>
                  <tr className="border-b-2 border-gray-300">
                    <td className="py-3 font-bold text-gray-800">Mother's Name :</td>
                    <td className="text-black/80">{committee?.motherName ?? "-"}</td>
                  </tr>
                  <tr className="border-b-2 border-gray-300 align-top">
                    <td className="py-3 font-bold text-gray-800">Qualification :</td>
                    <td
                      className="prose prose-sm text-black/80 max-w-none"

                    >
                      {committee?.qualification ?? "-"}
                    </td>
                  </tr>
                  <tr className="border-b-2 border-gray-300">
                    <td className="py-3 font-bold text-gray-800">Experience :</td>
                    <td className="text-black/80">{committee?.experience ?? "-"}</td>
                  </tr>
                  <tr className="border-b-2 border-gray-300 align-top">
                    <td className="py-3 font-bold text-gray-800">Present Address :</td>
                    <td
                      className="prose prose-sm text-black/80 max-w-none"
                    >
                      {committee?.area ?? "-"}
                    </td>
                  </tr>
                  <tr className="border-b-2 border-gray-300 align-top">
                    <td className="py-3 font-bold text-gray-800">Permanent Address :</td>
                    <td
                      className="prose prose-sm text-black/80 max-w-none"

                    >
                      {committee?.district ?? "-"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/committee"
              className="px-6 py-2 text-lg bg-blue-900 font-bold text-white rounded-md hover:bg-blue-950 transition"
            >
              Back to Governing Body
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitteeDetails;
