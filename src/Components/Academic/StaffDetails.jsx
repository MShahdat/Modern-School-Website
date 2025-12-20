// src/Academic/TeacherDetails.jsx  (StaffDetails)
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';   // ✅ web router
import { Api_Base_Url } from '../../Config/Api';

/* 🔵 per-tab cache (persists until hard refresh) */
let cachedSchoolData = null;
let schoolDataPromise = null;

const StaffDetails = () => {
  const { id } = useParams();
  const staffId = Number(id);

  const [schoolData, setSchoolData] = useState(cachedSchoolData);  // 🔵 init from cache
  const [loading, setLoading]   = useState(!cachedSchoolData);     // 🔵 skip loader if cached
  const [error, setError]       = useState(null);

  useEffect(() => {
    // If cached, don't fetch again
    if (cachedSchoolData) return;

    // Deduplicate in-flight fetch across mounts
    if (!schoolDataPromise) {
      schoolDataPromise = fetch(`${Api_Base_Url}/`)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch school data');
          return res.json();
        })
        .then((data) => {
          cachedSchoolData = data; // 🔵 cache once
          return data;
        })
        .catch((err) => { throw err; })
        .finally(() => { schoolDataPromise = null; });
    }

    setLoading(true);
    setError(null);

    schoolDataPromise
      .then((data) => setSchoolData(data))
      .catch((err) => setError(err.message || 'Failed to load school data.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    // 🔵 SHIMMER: mirrors heading + hr + details card (image, name/role, table rows, back btn)
    return (
      <div className="bg-gray-50 min-h-screen p-8">
        <div className="flex justify-center">
          <h3 className="h-5 w-1/4 flex bg-gray-200 rounded animate-pulse"></h3>
        </div>
        <hr className="border-t border-2 border-gray-50 mt-2 mb-12" />

        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left profile skeleton */}
            <div className="flex flex-col items-center mt-8 md:w-1/3">
              <div className="w-48 h-56 bg-gray-200 rounded-md border animate-pulse" />
              <div className="h-6 w-40 bg-gray-200 rounded mt-4 animate-pulse" />
              <div className="h-5 w-28 bg-gray-200 rounded mt-2 animate-pulse" />
            </div>
            {/* Right table skeleton */}
            <div className="md:w-2/3 w-full">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="grid grid-cols-3 gap-4 items-center mb-4">
                  <div className="h-4 bg-gray-200 rounded col-span-1 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded col-span-2 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
          {/* Back button skeleton */}
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

  const staffList = schoolData?.staff ?? [];
  const s = staffList.find((x) => Number(x.id) === staffId);

  if (!s) {
    return <div className="text-center py-10">Staff not found</div>;
  }

  // Map API fields -> your existing UI field names
  const staff = {
    photo: s.photo,
    name: s.name,
    role: s.designation?.title || 'Staff',
    mpoIndexNo: s.mpo_index ?? '—',
    joiningDate: s.tenures?.[0]?.start_date ?? '—',
    fathersName: s.father_name ?? '—',
    mothersName: s.mother_name ?? '—',
    email: s.email ?? '—',
    contactNo: s.phone ?? '—',
    nationalIdNo: s.national_id ?? '—',
    // Long text fields (may include HTML)
    qualificationHtml: s.qualification ?? '—',
    experience: s.experience ?? '—',
    interestHtml: s.interest ?? '—',
    presentAddressHtml: s.present_address ?? '—',
    permanentAddressHtml: s.permanent_address ?? '—',
  };

  return (
    <div className='bg-gray-50 dark:bg-black/80'>
      <div className="max-w-7xl mx-auto min-h-screen p-8">
      <h3 className="text-3xl md:text-4xl font-bold text-blue-900 text-center dark:text-white/90 mb-4">Our Staffs Details</h3>
      <hr className="border-t border-2 border-black/20 dark:border-white/20 mt-2 mb-8" />

      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg px-4 py-8">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left Profile */}
          <div className="flex flex-col items-center mt-8 md:w-1/3">
            <img
              src={staff.photo}
              alt={staff.name}
              className="w-48 h-56 object-cover rounded-md border"
            />
            {/* 🔵 allow HTML in name/role if API sends markup (no design change) */}
            <h2
              className=" text-xl md:text-2xl font-bold mt-4 text-center uppercase text-blue-950"
              dangerouslySetInnerHTML={{ __html: String(staff.name ?? '') }}
            />
            <p
              className="text-gray-600 text-[14px] md:text-[16px] font-semibold uppercase"
              dangerouslySetInnerHTML={{ __html: String(staff.role ?? '') }}
            />
          </div>

          {/* Right Details */}
          <div className="md:w-2/3">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b-2 border-gray-300">
                  <td className="py-3 font-bold text-gray-800 w-48">MPO Index no. :</td>
                  <td className='text-black/80'>{staff.mpoIndexNo}</td>
                </tr>
                <tr className="border-b-2 border-gray-300">
                  <td className="py-3 font-bold text-gray-800">Joining Date :</td>
                  <td className='text-black/80'>{staff.joiningDate}</td>
                </tr>
                <tr className="border-b-2 border-gray-300">
                  <td className="py-3 font-bold text-gray-800">Father's Name :</td>
                  <td className='text-black/80'>{staff.fathersName}</td>
                </tr>
                <tr className="border-b-2 border-gray-300">
                  <td className="py-3 font-bold text-gray-800">Mother's Name :</td>
                  <td className='text-black/80'>{staff.mothersName}</td>
                </tr>
                <tr className="border-b-2 border-gray-300">
                  <td className="py-3 font-bold text-gray-800">Email :</td>
                  <td className='text-black/80'>{staff.email}</td>
                </tr>
                <tr className="border-b-2 border-gray-300">
                  <td className="py-3 font-bold text-gray-800">Contact No. :</td>
                  <td className='text-black/80'>+88{staff.contactNo}</td>
                </tr>
                <tr className="border-b-2 border-gray-300">
                  <td className="py-3 font-bold text-gray-800">National ID No. :</td>
                  <td className='text-black/80'>{staff.nationalIdNo}</td>
                </tr>

                {/* 🔵 Use dangerouslySetInnerHTML for long text cells (no layout change) */}
                <tr className="border-b-2 border-gray-300 align-top">
                  <td className="py-3 font-bold text-gray-800">Qualification :</td>
                  <td
                    className="prose prose-sm text-black/90 max-w-none"
                    dangerouslySetInnerHTML={{ __html: String(staff.qualificationHtml) }}
                  />
                </tr>
                <tr className="border-b-2 border-gray-300">
                  <td className="py-3 font-bold text-gray-800">Experience :</td>
                  <td className='text-black/90'>{staff.experience}</td>
                </tr>
                <tr className="border-b-2 border-gray-300 align-top">
                  <td className="py-3 font-bold text-gray-800">Interest :</td>
                  <td
                    className="prose prose-sm text-black/90 max-w-none"
                    dangerouslySetInnerHTML={{ __html: String(staff.interestHtml) }}
                  />
                </tr>
                <tr className="border-b-2 border-gray-300 align-top">
                  <td className="py-3 font-bold text-gray-800">Present Address :</td>
                  <td
                    className="prose prose-sm text-black/90 max-w-none"
                    dangerouslySetInnerHTML={{ __html: String(staff.presentAddressHtml) }}
                  />
                </tr>
                <tr className="border-b-2 border-gray-300 align-top">
                  <td className="py-3 font-bold text-gray-800">Permanent Address :</td>
                  <td
                    className="prose prose-sm text-black/90 max-w-none"
                    dangerouslySetInnerHTML={{ __html: String(staff.permanentAddressHtml) }}
                  />
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            to="/our-staffs"
            className="px-6 py-2 text-lg bg-blue-900 font-bold text-white rounded-md hover:bg-blue-950 transition"
          >
            Back to Staff
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default StaffDetails;
