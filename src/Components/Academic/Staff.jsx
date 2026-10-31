import { Link } from "react-router";
import { useGetStaffs } from "../../hook";
import { formatDate } from "../../utils/time.format";


const Staff = () => {

  const { data, isPending } = useGetStaffs()

  if (isPending) {
    return <p>loading</p>
  }

  if (!data?.success) {
    return <p>not found</p>
  }

  const staffs = data?.data ?? [];

  return (
    <div className='bg-blue-50 dark:bg-black/80'>
      <div className="max-w-7xl px-4 py-8 mx-auto">
        <h3 className="text-3xl md:text-4xl font-bold dark:text-white/90 text-blue-900 text-center mb-4">Our Staffs</h3>
        <hr className="border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-6 mb-8">
          {staffs.map((s) => (
            <Link
              key={s.id}
              to={`/staff/${s.id}`}
              className="bg-white rounded-2xl shadow-2xl pl-3 pr-1 py-4 transform transition duration-300 hover:scale-105 hover:shadow-3xl hover:ring-1 hover:ring-cyan-300"
            >
              <div className="flex items-center gap-4 sm:gap-4">
                <img
                  className="h-36 w-40 md:h-30 md:w-30 rounded-xl object-cover"
                  src={s.user.profileImage}
                  alt={s.name}
                />
                <div className="mt-0">
                  <p
                    className="text-lg sm:text-xl text-black/85 font-bold uppercase"
                  >
                    {s.name ?? "-"}
                  </p>
                  <p
                    className="font-semibold mt-2 text-gray-600"
                  >
                    {s.designation ?? "-"}
                  </p>
                  <p className="font-semibold mt-2 text-gray-600">
                    {s?.startingDate ? formatDate(s.startingDate) : "null"} - {s?.endingDate ? formatDate(s.endingDate) : ""}
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

export default Staff;
