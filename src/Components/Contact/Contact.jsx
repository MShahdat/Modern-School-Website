// src/Components/Others/Contact.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Api_Base_Url } from "../../Config/Api";

/* 🔵 Session cache */
let cachedSchoolData = null;
let schoolDataPromise = null;

const Contact = () => {
  const [schoolData, setSchoolData] = useState(cachedSchoolData);
  const [loading, setLoading] = useState(!cachedSchoolData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cachedSchoolData) return;

    if (!schoolDataPromise) {
      schoolDataPromise = fetch(`${Api_Base_Url}/`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch school data");
          return res.json();
        })
        .then((data) => {
          cachedSchoolData = data;
          return data;
        })
        .catch((err) => {
          throw err;
        })
        .finally(() => {
          schoolDataPromise = null;
        });
    }

    setLoading(true);
    setError(null);

    schoolDataPromise
      .then((data) => setSchoolData(data))
      .catch((err) => setError(err.message || "Failed to load school data."))
      .finally(() => setLoading(false));
  }, []);

  const contactCards = useMemo(() => {
    const address = schoolData?.address || "Address not available";
    const email =
      schoolData?.contract_emails?.[0]?.email || "Email not available";
    const phone =
      schoolData?.contract_phones?.[0]?.phone ||
      schoolData?.contract_phones?.[0]?.number ||
      "Phone not available";

    return [
      { label: "Location", value: address, img: "/Images/11.jpg" },
      { label: "Email Address:", value: email, img: "/Images/9.jpg" },
      { label: "Phone:", value: phone, img: "/Images/10.jpg" },
    ];
  }, [schoolData]);

  if (loading) {
    return (
      <div className="bg-slate-50 px-8 py-8 xl:px-40 mx-auto min-h-screen">
        <div className="flex justify-center">
          <h3 className="h-5 w-1/4 flex bg-gray-200 rounded animate-pulse"></h3>
        </div>
        {/* Skeleton cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex flex-col items-center shadow-2xl rounded-[50%_40%_/_50%_40%] p-2 bg-indigo-50"
            >
              <div className="w-20 h-20 rounded-full bg-slate-200 animate-pulse" />
              <div className="mt-3 h-6 w-40 bg-slate-200 rounded animate-pulse" />
              <div className="mt-2 mb-8 h-4 w-56 bg-slate-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gradient-to-b from-blue-950 via-indigo-950 to-slate-900">
      <div className=" px-8 py-8  mx-auto min-h-screen max-w-7xl">
      <h2 className="text-2xl md:text-4xl text-white font-bold text-center mb-4">
        Contact
      </h2>
      <hr className="border-t border-2 border-slate-600 mt-2 mb-12" />

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
