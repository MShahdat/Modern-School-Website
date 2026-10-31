import { useMemo } from "react";
import { useGetSiteConfig } from "../../hook";
import { emailLogo, mapLogo, phoneLogo } from "../../fallback";


const Contact = () => {

  const { data, isLoading } = useGetSiteConfig()
  console.log('siteConfig response...............', data)

  if (isLoading) {
    return <p>loading..</p>
  }

  if (!data?.success) {
    return <p>not found</p>
  }

  const schoolData = data?.data


  const contactCards = [
    { label: "Location", value: schoolData?.address ?? "No address", img: mapLogo },
    { label: "Email Address:", value: schoolData?.email ?? "example.gmail.com", img: emailLogo },
    { label: "Phone:", value: schoolData?.phone ?? "01900000000", img: phoneLogo },
  ]


  return (
    <div className="bg-gradient-to-b from-blue-950 via-indigo-950 to-slate-900">
      <div className=" px-8 py-8  mx-auto min-h-screen max-w-7xl">
        <h2 className="text-3xl md:text-4xl text-white font-bold text-center mb-4">
          Contact
        </h2>
        <hr className="border-t border-2 border-slate-600 mt-2 mb-8" />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
          {contactCards.map((info, idx) => {
            const bgColors = [
              "bg-gradient-to-br from-indigo-100 via-indigo-200 to-indigo-300 shadow-lg shadow-indigo-200/50",
              "bg-gradient-to-br from-emerald-100 via-emerald-200 to-emerald-300 shadow-lg shadow-emerald-200/50",
              "bg-gradient-to-br from-rose-100 via-rose-200 to-rose-300 shadow-lg shadow-rose-200/50",
            ];
            return (
              <div
                key={idx}
                className={`flex flex-col items-center shadow-2xl rounded-[50%_40%_/_50%_40%] p-4 hover:scale-105 transform transition ${bgColors[idx]}`}
              >
                <img
                  className="w-20 h-20 object-cover rounded-full ring-4 ring-white/70 shadow-md"
                  src={info.img}
                  alt={info.label}
                />
                <p className="mt-2 mb-2 text-xl text-slate-900 font-bold text-center">
                  {info.label}
                </p>
                <p className="mb-6 text-sm text-slate-800 font-semibold text-center break-words">
                  {info.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Form */}
        <div className="border mt-4 border-white/20 px-4">
          <form className="space-y-6 py-4 ">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-slate-200 font-semibold drop-shadow-sm">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full bg-white/90 border text-black border-slate-300 rounded-md px-4 py-3 shadow focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block mb-2 text-slate-200 font-semibold drop-shadow-sm">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full bg-white/90 border text-black border-slate-300 rounded-md px-4 py-3 shadow focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-slate-200 font-semibold drop-shadow-sm">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full bg-white/90 border text-black border-slate-300 rounded-md px-4 py-3 shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block mb-2 text-slate-200 font-semibold drop-shadow-sm">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full bg-white/90 border border-slate-300 rounded-md px-4 py-3 shadow focus:outline-none text-black focus:ring-2 focus:ring-indigo-400"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-slate-200 font-semibold drop-shadow-sm">
                  Institution Name
                </label>
                <input
                  type="text"
                  className="w-full bg-white/90 border text-black border-slate-300 rounded-md px-4 py-3 shadow focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="Enter institution name"
                />
              </div>
              <div>
                <label className="block mb-2 text-slate-200 font-semibold drop-shadow-sm">
                  Address
                </label>
                <input
                  type="text"
                  className="w-full bg-white/90 border text-black border-slate-300 rounded-md px-4 py-3 shadow focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="Enter address"
                />
              </div>
            </div>

            {/* Message Box */}
            <div>
              <label className="block mb-2 text-slate-200 font-semibold drop-shadow-sm">
                Message
              </label>
              <textarea
                rows={6}
                className="w-full bg-white/90 border border-slate-300 rounded-md px-4 py-3 shadow focus:outline-none text-black focus:ring-2 focus:ring-indigo-400"
                placeholder="Type your message here"
              ></textarea>
            </div>

            {/* Button */}
            <div className="">
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-600 via-blue-700 to-cyan-600 hover:from-indigo-700 hover:via-blue-800 hover:to-cyan-700 text-white font-bold py-2 px-8 text-[16px] rounded-full shadow-lg transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Map */}
        <div className="mt-12">
          <div className="w-full h-[400px] md:h-[450px] rounded-lg overflow-hidden shadow-lg">
            {schoolData?.map_latitude && schoolData?.map_longitude ? (
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  `${schoolData.map_latitude},${schoolData.map_longitude} (${schoolData.school_name})`
                )}&z=16&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${schoolData.school_name} Location`}
              />
            ) : (
              <p className="text-center py-4 text-slate-400">
                Map location not available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
