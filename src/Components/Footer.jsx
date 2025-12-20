// src/Components/Footer.jsx
import React, { useState, useEffect } from 'react';
import { MdAddCall } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { GiBookAura } from "react-icons/gi";
import { Link } from 'react-router';
import { FaGitkraken } from "react-icons/fa";
import { MdOutlineAddIcCall } from "react-icons/md";
import Foot from './Foot';
import { Api_Base_Url } from '../Config/Api';

/* 🔵 per-tab cache so data loads once until hard refresh */
let cachedSchoolData = null;
let schoolDataPromise = null;

const Footer = () => {
  const [schoolData, setSchoolData] = useState(cachedSchoolData);
  const [loading, setLoading] = useState(!cachedSchoolData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cachedSchoolData) return; // already have data this tab

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

  if (loading) {
    // 🔵 shimmer that matches your footer layout
    return (
      <div className='bg-slate-900 text-white px-4 xl:px-30 mx-auto'>
        <div className='flex flex-col lg:flex-row items-center justify-between'>
          <div className='mt-8 flex flex-col w-full lg:w-1/2'>
            <div className='flex items-start gap-4'>
              <div className='size-25 rounded-full bg-gray-700 animate-pulse'></div>
              <div className='flex-1'>
                <div className='h-6 w-2/3 bg-gray-700 rounded animate-pulse mb-2'></div>
                <div className='h-4 w-1/2 bg-gray-700 rounded animate-pulse mb-2'></div>
                <div className='h-4 w-1/2 bg-gray-700 rounded animate-pulse mb-2'></div>
                <div className='h-4 w-3/4 bg-gray-700 rounded animate-pulse'></div>
              </div>
            </div>
          </div>

          <div className='mt-16 w-full lg:w-1/2'>
            <div className='h-5 w-40 bg-gray-700 rounded animate-pulse mb-4'></div>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 lg:gap-16 xl:gap-24'>
              {[0, 1, 2].map((col) => (
                <div key={col} className='space-y-3'>
                  <div className='h-4 w-40 bg-gray-700 rounded animate-pulse'></div>
                  <div className='h-4 w-36 bg-gray-700 rounded animate-pulse'></div>
                  <div className='h-4 w-32 bg-gray-700 rounded animate-pulse'></div>
                  <div className='h-4 w-28 bg-gray-700 rounded animate-pulse'></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='mt-16'>
          <div className='border-1'></div>
          <div className='flex flex-col items-center justify-center mt-6 space-y-2'>
            <div className='h-4 w-72 bg-gray-700 rounded animate-pulse'></div>
            <div className='h-4 w-64 bg-gray-700 rounded animate-pulse mb-4'></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className='bg-slate-900'>
      {/* <Foot></Foot> */}
      <div className='max-w-7xl text-white px-4 xl:px-16 mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2'>
          <div className='flex flex-col items-center'>
            <div className=' flex flex-col'>
            <Link to={'/'}>
              <img className='size-20 rounded-full' src={schoolData?.logo} alt={schoolData?.school_name} />
            </Link>
            <div>
              <h2 className='text-xl md:text-2xl font-seimibold mt-2'>{schoolData?.school_name}</h2>

              <div className='flex items-center gap-1 mt-2'>
                <MdAddCall />
                <p>+88{schoolData?.contract_phones?.[0]?.phone}</p>
              </div>

              <div className='flex items-center gap-1 mt-2'>
                <IoMdMail />
                <p>{schoolData?.contract_emails?.[0]?.email}</p>
              </div>

              <div className='flex gap-1 mt-2'>
                <FaLocationDot className='mt-1' />
                {/* 🔵 address via dangerouslySetInnerHTML (renders any HTML from API) */}
                <p
                  dangerouslySetInnerHTML={{
                    __html: String(schoolData?.address ?? "")
                      .replace(/\n/g, "<br />"),
                  }}
                />
              </div>
            </div>
          </div>
          </div>
          <div className='flex flex-col items-center'>
            <div className='mt-12'>
            <p className='uppercase text-[16px] lg:text-[17px] '>Quick Links</p>
            <div className='space-y-2 mt-4'>
              <Link to={'/'} className='flex items-center gap-2'>
                <FaArrowRight />
                <p>Home</p>
              </Link>
              <Link to={'/about'} className='flex items-center gap-2'>
                <FaArrowRight />
                <p>About</p>
              </Link>
              <Link to={'/contact'} className='flex items-center gap-2'>
                <FaArrowRight />
                <p>Contact Us</p>
              </Link>
              <Link to={'/notice'} className='flex items-center gap-2'>
                <FaArrowRight />
                <p>Notice</p>
              </Link>
              <Link to={'/history'} className='flex items-center gap-2'>
                <FaArrowRight />
                <p>Our History</p>
              </Link>
            </div>
          </div>
          </div>
          <div className='flex flex-col items-center'>
            <div className='mt-12'>
            <p className='uppercase text-[16px] lg:text-[17px] '>Quick Links</p>
            <div className='space-y-2 mt-4'>
              
              <Link to={'/our-teachers'} className='flex items-center gap-2'>
                <FaArrowRight />
                <p>Teacher Information</p>
              </Link>
              <Link to={'/our-staffs'} className='flex items-center gap-2'>
                <FaArrowRight />
                <p>Staff Information</p>
              </Link>
              <Link to={'/gallery'} className='flex items-center gap-2'>
                <FaArrowRight />
                <p>Photo Gallery</p>
              </Link>
              <Link to={'/videos'} className='flex items-center gap-2'>
                <FaArrowRight />
                <p>Video Gallery</p>
              </Link>
            </div>
          </div>
          </div>
          <div className='flex flex-col items-center'>
            <div className='mt-12'>
            <p className='uppercase text-[16px] lg:text-[17px] '>Board</p>
            <div className='space-y-2 mt-4'>
              <a href='#' className='flex items-center gap-2'>
                <FaArrowRight />
                <p>Comilla Board</p>
              </a>
              <a href='https://shed.gov.bd/' className='flex items-center gap-2'>
                <FaArrowRight />
                <p>Education Ministry</p>
              </a>
              <a href='https://nctb.gov.bd/' className='flex items-center gap-2'>
                <FaArrowRight />
                <p>NCTB</p>
              </a>
              <a href='https://dshe.gov.bd/' className='flex items-center gap-2'>
                <FaArrowRight />
                <p>DSHE</p>
              </a>
            </div>
          </div>
          </div>
        </div>
      </div>
      <div className='mt-8 px-4'>
        <div className='border-1 border-white/20'></div>
        <div className='py-2.5 text-center text-[14px]'>
          Copyright ©2025 All rights reserved. This template is made by Shahdat
        </div>

      </div>
    </div>
  );
};

export default Footer;
