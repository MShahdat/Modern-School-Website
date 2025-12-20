import React, { useState } from 'react';
import { EGValue } from './EGValue'; // Adjust the import path as necessary
import { Link } from 'react-router';

const ExGoverning = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleCommittee = showAll ? EGValue : EGValue.slice(0, 8);

  return (
    <div className="px-4 py-8 xl:px-30 mx-auto max-w-7xl">
      <h3 className="text-3xl font-bold text-cyan-800 text-center mb-4">
        Ex-Governing Body
      </h3>
      <hr className='border-t border-2 border-gray-500 mt-2 mb-12' />

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-2">
        {visibleCommittee.map((com, index) => (
          <Link
            key={index}
            to={`/ex-committee/${com.id}`}
            className="group bg-white rounded-2xl border border-gray-100 mb-8 shadow-sm p-6 flex flex-col items-center text-center transition
                       hover:-translate-y-1 hover:shadow-xl hover:border-cyan-200 focus-within:-translate-y-1 hover:duration-300 hover:scale-105"
          >
            <div className="relative">
              <img
                src={com.photo}
                alt={com.name}
                loading="normal"
                className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full ring-2 ring-cyan-100"
              />
            </div>

            <div className="mt-5 space-y-1">
              <h2 className="text-xl md:text-lg font-bold text-cyan-800 leading-snug">
                {com.name}
              </h2>
              <p className="text-lg md:text-base font-semibold text-gray-700">{com.role}</p>
              <p className="text-lg md:text-base font-semibold text-gray-700">{com.phone}</p>
            </div>
          </Link>
        ))}
      </div>

      {!showAll && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="px-5 py-2 rounded-lg bg-cyan-700 text-white font-semibold shadow hover:bg-cyan-800 transition"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default ExGoverning;
