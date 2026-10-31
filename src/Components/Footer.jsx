
import { MdAddCall } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router';
import { useGetSiteConfig } from "../hook";

const Footer = () => {
  const { data, isLoading } = useGetSiteConfig()
  console.log('siteConfig response...............', data)

  if (isLoading) {
    return <p>loaind...</p>
  }

  if (!data.success) {
    return <p>not found</p>
  }


  const schoolData = data?.data

  return (
    <div className='bg-slate-900'>
      {/* <Foot></Foot> */}
      <div className='max-w-7xl text-white px-4 xl:px-16 mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2'>
          <div className='flex flex-col items-center'>
            <div className=' flex flex-col'>
              <Link to={'/'}>
                <img className='size-20 rounded-full' src={schoolData?.logo} alt={schoolData?.schoolName} />
              </Link>
              <div>
                <h2 className='text-xl md:text-2xl font-seimibold mt-2'>{schoolData?.schoolName ?? "Modern School Name"}</h2>

                <div className='flex items-center gap-1 mt-2'>
                  <MdAddCall />
                  <p>+88{schoolData?.phone ?? "01885374041"}</p>
                </div>

                <div className='flex items-center gap-1 mt-2'>
                  <IoMdMail />
                  <p>{schoolData?.email ?? "example@gmail.com"}</p>
                </div>

                <div className='flex gap-1 mt-2'>
                  <FaLocationDot className='mt-1' />
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
          Copyright ©2025 All rights reserved. This template is made by Md. Shahdat
        </div>

      </div>
    </div>
  );
};

export default Footer;
