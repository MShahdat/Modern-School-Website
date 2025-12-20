// src/Components/About/CommitteeDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Api_Base_Url } from "../../Config/Api";

/* 🔵 per-tab cache (persists until hard refresh) */
let cachedSchoolData = null;
let schoolDataPromise = null;

const CommitteeDetails = () => {
  const { id } = useParams();                 // /committee/:id
  const memberId = Number(id);

  const [schoolData, setSchoolData] = useState(cachedSchoolData);  // 🔵 init from cache
  const [loading, setLoading] = useState(!cachedSchoolData);       // 🔵 skip loader if cached
  const [error, setError] = useState(null);

  useEffect(() => {
    // If cached, do nothing
    if (cachedSchoolData) return;

    // Deduplicate in-flight fetch
    const base = `${Api_Base_Url}`.replace(/\/+$/, "");
    if (!schoolDataPromise) {
      schoolDataPromise = fetch(`${base}/?format=json`, { headers: { Accept: "application/json" } })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch school data");
          return res.json();
        })
        .then((data) => {
          cachedSchoolData = data;   // 🔵 cache once
          return data;
        })
        .catch((err) => { throw err; })
        .finally(() => { schoolDataPromise = null; });
    }

    setLoading(true);
    setError(null);

    schoolDataPromise
      .then((data) => setSchoolData(data))
      .catch((err) => setError(err.message || "Failed to load school data."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    // 🔵 SHIMMER: mirrors heading + card with left profile and right table
    return (
      <div className="bg-gray-50 min-h-screen p-8 dark:bg-black/80">
        <h3 className="text-4xl font-bold text-blue-900 text-center mb-4">
          Our Governing Body Details
        </h3>
        <hr className="border-t border-2 border-gray-500 mt-2 mb-12" />

        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left profile skeleton */}
            <div className="flex flex-col items-center md:w-1/3 mt-8">
              <div className="w-48 h-56 bg-gray-200 rounded-md border animate-pulse" />
              <div className="h-6 w-40 bg-gray-200 rounded mt-4 animate-pulse" />
              <div className="h-5 w-28 bg-gray-200 rounded mt-2 animate-pulse" />
            </div>

            {/* Right table skeleton */}
            <div className="md:w-2/3 w-full">
              <div className="space-y-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="grid grid-cols-3 gap-4 items-center">
                    <div className="h-4 bg-gray-200 rounded col-span-1 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded col-span-2 animate-pulse" />
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-11/12 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-10/12 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="px-36 py-3 bg-gray-200 rounded inline-block animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  const members = schoolData?.committee_members ?? [];
  const m = members.find((x) => Number(x.id) === memberId);

  if (!m) {
    return <div className="text-center py-10">Governing Body not found</div>;
  }

  // Map API -> UI fields
  const teacher = {
    photo: m.photo,
    name: m.name,
    role: m.designation?.title || "Member",
    mpoIndexNo: m.mpo_index ?? "—",
    joiningDate: m.memberships?.[0]?.start_date ?? "—",
    fathersName: m.father_name ?? "—",
    mothersName: m.mother_name ?? "—",
    email: m.email ?? "—",
    contactNo: m.phone ?? "—",
    nationalIdNo: m.national_id ?? "—",
    qualificationHtml: m.qualification || "",
    experience: m.experience ?? "—",
    interestHtml: m.interest || "",
    presentAddressHtml: m.present_address || "",
    permanentAddressHtml: m.permanent_address || "",
  };

  return (
    <div className="bg-gray-50 dark:bg-black/80">
      <div className="max-w-7xl mx-auto min-h-screen p-8">
      <h3 className="text-2xl dark:text-white/90 md:text-4xl font-bold text-blue-900 text-center mb-4">
        Our Governing Body Details
      </h3>
      <hr className="border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-12" />

      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left Profile */}
          <div className="flex flex-col items-center md:w-1/3 mt-8">
            <img
              src={teacher.photo}
              alt={teacher.name}
              className="w-48 h-56 object-cover rounded-md border"
            />
            {/* 🔵 allow HTML in name/role if needed (no layout change) */}
            <h2
              className="text-2xl font-bold mt-4 uppercase text-blue-950"
              dangerouslySetInnerHTML={{ __html: String(teacher.name ?? "") }}
            />
            <p
              className="text-gray-600 font-semibold"
              dangerouslySetInnerHTML={{ __html: String(teacher.role ?? "") }}
            />
          </div>

          {/* Right Details */}
          <div className="md:w-2/3">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b-2 border-gray-300">
                  <td className="py-3 font-bold text-gray-800 w-48">MPO Index no. :</td>
                  <td className="text-black/80">{teacher.mpoIndexNo}</td>
                </tr>
                <tr className="border-b-2 border-gray-300">
                  <td className="py-3 font-bold text-gray-800">Joining Date :</td>
                  <td className="text-black/80">{teacher.joiningDate}</td>
                </tr>
                <tr className="border-b-2 border-gray-300">
                  <td className="py-3 font-bold text-gray-800">Father's Name :</td>
                  <td className="text-black/80">{teacher.fathersName}</td>
                </tr>
                <tr className="border-b-2 border-gray-300">
                  <td className="py-3 font-bold text-gray-800">Mother's Name :</td>
                  <td>{teacher.mothersName}</td>
                </tr>
                <tr className="border-b-2 border-gray-300">
                  <td className="py-3 font-bold text-gray-800">Email :</td>
                  <td className="text-black/80">{teacher.email}</td>
                </tr>
                <tr className="border-b-2 border-gray-300">
                  <td className="py-3 font-bold text-gray-800">Contact No. :</td>
                  <td className="text-black/80">{teacher.contactNo}</td>
                </tr>
                <tr className="border-b-2 border-gray-300">
                  <td className="py-3 font-bold text-gray-800">National ID No. :</td>
                  <td className="text-black/80">{teacher.nationalIdNo}</td>
                </tr>
                <tr className="border-b-2 border-gray-300 align-top">
                  <td className="py-3 font-bold text-gray-800">Qualification :</td>
                  <td
                    className="prose prose-sm text-black/80 max-w-none"
                    dangerouslySetInnerHTML={{ __html: teacher.qualificationHtml }}
                  />
                </tr>
                <tr className="border-b-2 border-gray-300">
                  <td className="py-3 font-bold text-gray-800">Experience :</td>
                  <td className="text-black/80">{teacher.experience}</td>
                </tr>
                <tr className="border-b-2 border-gray-300 align-top">
                  <td className="py-3 font-bold text-gray-800">Interest :</td>
                  <td
                    className="prose prose-sm text-black/80 max-w-none"
                    dangerouslySetInnerHTML={{ __html: teacher.interestHtml }}
                  />
                </tr>
                <tr className="border-b-2 border-gray-300 align-top">
                  <td className="py-3 font-bold text-gray-800">Present Address :</td>
                  <td
                    className="prose prose-sm text-black/80 max-w-none"
                    dangerouslySetInnerHTML={{ __html: teacher.presentAddressHtml }}
                  />
                </tr>
                <tr className="border-b-2 border-gray-300 align-top">
                  <td className="py-3 font-bold text-gray-800">Permanent Address :</td>
                  <td
                    className="prose prose-sm text-black/80 max-w-none"
                    dangerouslySetInnerHTML={{ __html: teacher.permanentAddressHtml }}
                  />
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Back Button */}
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
