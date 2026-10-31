import { Link } from "react-router";
import { useGetCommittee } from "../../hook";
import { div } from "framer-motion/client";


const Governing = () => {

  const { data, isPending } = useGetCommittee()

  if (isPending) {
    return <p>loading...</p>
  }

  if (!data?.success) {
    return <p className="text-red-500">not found</p>
  }

  const committee = data?.data ?? []

  return (
    <div className="bg-blue-50 dark:bg-black/80">
      <div className="max-w-7xl px-4 py-8 mx-auto ">
        <h3 className="text-2xl md:text-3xl font-bold dark:text-white/90 text-blue-900 text-center mb-4">
          Governing Body (2025 - 2026)
        </h3>
        <hr className="border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-0 md:gap-2">
          {committee.map((com, idx) => (
            <Link
              key={com.id ?? idx}
              to={`/committee/${com.id}`}
              className="gb-hidden group bg-white rounded-2xl border border-gray-100 mb-8 shadow-sm p-6 flex flex-col items-center text-center transition
                       hover:-translate-y-1 hover:shadow-xl hover:border-cyan-200 focus-within:-translate-y-1 hover:duration-300 hover:scale-105"
              style={{ animationDelay: `${(com.id ?? idx) * 0.25}s` }}
            >
              <img
                src={com.user.profileImage}
                alt={com.name}
                loading="lazy"
                className="w-32 h-32 md:w-36 md:h-36 xl:w-32 xl:h-32 object-cover rounded-full ring-2 ring-cyan-100"
              />
              <div className="mt-5 space-y-1">
                <h2
                  className="text-xl md:text-lg font-bold text-blue-900 leading-snug uppercase"
                >
                  {com.name ?? "Name"}
                </h2>
                <p
                  className="text-md text-black/90 md:text-base font-bold"
                >
                  {com.designation ?? ""}
                </p>
                <p className="text-lg md:text-base font-semibold text-gray-700">
                  {com.phone ? `+88${com.phone}` : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Governing;
