import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Foot = () => {
    return (
        <div className='bg-[#110F8C]'>
            <div className='flex items-center gap-8 py-6  px-4 xl:px-30 mx-auto max-w-7xl'>
                <a href='https://www.facebook.com/'>
                    <FaFacebook className=' size-8 text-white hover:scale-135 hover:duration-500'/>
                </a>
                <a href='https://x.com/'>
                    <FaTwitter className=' size-8 text-white hover:scale-115 hover:duration-500'/>
                </a>
                <a href='https://www.instagram.com/'>
                    <FaSquareInstagram className=' size-8 text-white hover:scale-135 hover:duration-500'/>
                </a>
                <a href='https://web.whatsapp.com/'>
                    <FaWhatsappSquare className=' size-8 text-white hover:scale-135 hover:duration-500'/>
                </a>
                <a href='https://www.youtube.com/'>
                    <FaYoutube className=' size-8 text-white hover:scale-135 hover:duration-500'/>
                </a>
            </div>
        </div>
    );
};

export default Foot;