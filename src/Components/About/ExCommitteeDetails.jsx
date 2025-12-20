// src/Academic/TeacherDetails.jsx
import React from 'react';
import { useParams, Link } from 'react-router';
import { getExCommitteeById } from './EGValue';

const ExCommitteeDetails = () => {
    const { id } = useParams();
    const teacher = getExCommitteeById(id);

    if (!teacher) {
        return <div className="text-center py-10">Governing Body not found</div>;
    }

    return (
        <div className='bg-gray-50'>
            <div className="max-w-7xl mx-auto min-h-screen p-8">
            <h3 className="text-4xl font-bold text-cyan-800 text-center mb-4">Our Governing Body Details</h3>
            <hr className='border-t border-2 border-gray-500 mt-2 mb-12' />
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <div className="flex flex-col md:flex-row gap-10">
                    {/* Left Profile */}
                    <div className="flex flex-col items-center md:w-1/3">
                        <img
                            src={teacher.photo}
                            alt={teacher.name}
                            className="w-48 h-56 object-cover rounded-md border"
                        />
                        <h2 className="text-2xl font-bold mt-4">{teacher.name}</h2>
                        <p className="text-gray-600 font-semibold">{teacher.role}</p>
                    </div>

                    {/* Right Details */}
                    <div className="md:w-2/3">
                        <table className="w-full border-collapse">
                            <tbody className=''>
                                <tr className="border-b-2 border-gray-300">
                                    <td className="py-3 font-bold text-gray-800 w-48">MPO Index no. :</td>
                                    <td>{teacher.mpoIndexNo}</td>
                                </tr>
                                <tr className="border-b-2 border-gray-300">
                                    <td className="py-3 font-bold text-gray-800">Joining Date :</td>
                                    <td>{teacher.joiningDate}</td>
                                </tr>
                                <tr className="border-b-2 border-gray-300">
                                    <td className="py-3 font-bold text-gray-800">Father's Name :</td>
                                    <td>{teacher.fathersName}</td>
                                </tr>
                                <tr className="border-b-2 border-gray-300">
                                    <td className="py-3 font-bold text-gray-800">Mother's Name :</td>
                                    <td>{teacher.mothersName}</td>
                                </tr>
                                <tr className="border-b-2 border-gray-300">
                                    <td className="py-3 font-bold text-gray-800">Email :</td>
                                    <td>{teacher.email}</td>
                                </tr>
                                <tr className="border-b-2 border-gray-300">
                                    <td className="py-3 font-bold text-gray-800">Contact No. :</td>
                                    <td>{teacher.contactNo}</td>
                                </tr>
                                <tr className="border-b-2 border-gray-300">
                                    <td className="py-3 font-bold text-gray-800">National ID No. :</td>
                                    <td>{teacher.nationalIdNo}</td>
                                </tr>
                                <tr className="border-b-2 border-gray-300">
                                    <td className="py-3 font-bold text-gray-800">Qualification :</td>
                                    <td>{teacher.qualification}</td>
                                </tr>
                                <tr className="border-b-2 border-gray-300">
                                    <td className="py-3 font-bold text-gray-800">Experience :</td>
                                    <td>{teacher.experience}</td>
                                </tr>
                                <tr className="border-b-2 border-gray-300">
                                    <td className="py-3 font-bold text-gray-800">Interest :</td>
                                    <td>{teacher.interest}</td>
                                </tr>
                                <tr className="border-b-2 border-gray-300">
                                    <td className="py-3 font-bold text-gray-800">Present Address :</td>
                                    <td>{teacher.presentAddress}</td>
                                </tr>
                                <tr className="border-b-2 border-gray-300">
                                    <td className="py-3 font-bold text-gray-800">Permanent Address :</td>
                                    <td>{teacher.permanentAddress}</td>
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

export default ExCommitteeDetails;
