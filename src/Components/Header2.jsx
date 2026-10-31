
import { Link } from 'react-router-dom';
import { MdEmail, MdAddCall } from "react-icons/md";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

import { useGetSiteConfig } from '../hook';
import { fallbackLogo } from '../fallback';
import HeaderLoading from '../loading/header';


const Header2 = () => {

  const { data, isLoading } = useGetSiteConfig()
  console.log('siteConfig response...............', data)

  if (isLoading) {
    return <HeaderLoading />
  }

  if (!data.success) {
    return <p>not found</p>
  }


  const schoolData = data?.data

  return (
    <div
      className="relative px-4 py-4 md:px-6 lg:px-8 xl:px-30 mx-auto"
      style={{
        backgroundImage: `url(https://plus.unsplash.com/premium_photo-1658506813192-074af2c51d66?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      <div className="absolute inset-0 bg-white/70"></div>


      <div className="relative flex flex-col sm:flex-row items-center lg:items-center justify-center gap-1 sm:gap-4 lg:justify-between">

        <Link to={'/'}>
          <img
            className="rounded-full w-20 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-24 lg:h-24 xl:w-22 xl:h-22 object-cover"
            src={schoolData?.logo ?? fallbackLogo}
            alt={schoolData?.schoolName}
          />
        </Link>


        <div className="flex flex-col items-center text-black/80 space-y-2 mt-0 lg:mt-0 text-center lg:text-center">
          <h2 className="font-lugrasimo text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold">
            {schoolData?.schoolName ?? 'Modern School Name'}
          </h2>
          <p
            className=" text-sm sm:text-base md:text-lg lg:text-xl  font-semibold"
            dangerouslySetInnerHTML={{
              __html: String(schoolData?.address ?? '').replace(/\n/g, '<br />'),
            }}
          />
          <p className=" font-bold text-sm sm:text-md md:text-md">
            EIIN: {schoolData?.eiin || 'N/A'} | ESTD: {schoolData?.estdYear || 'N/A'}
          </p>
        </div>


        <div className="space-y-2 hidden lg:block text-black/80">
          <a href="https://mail.google.com/mail/u/0/#inbox" className="flex items-center gap-1">
            <MdEmail className="size-5 text-rose-600 mt-1" />
            <p className=" font-semibold">
              {schoolData?.email}
            </p>
          </a>
          <div className="flex items-center gap-1">
            <MdAddCall className="text-emerald-600" />
            <p className="font-semibold">
              +88{schoolData?.phone || "01885374041"}
            </p>
          </div>
          <div className="flex items-center mt-3 gap-6">
            <a href={schoolData?.facebookUrl || "https://www.facebook.com/"}>
              <FaFacebook className="size-5 text-blue-600" />
            </a>
            <a href={schoolData?.youtubeUrl || "https://www.youtube.com/"}>
              <FaYoutube className="size-5 text-rose-600" />
            </a>
            <a href={schoolData?.linkedinUrl || "https://www.linkedin.com/"}>
              <FaLinkedin className="size-5 text-indigo-600" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header2;
