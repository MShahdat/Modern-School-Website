import React from 'react';
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { GiBookAura } from "react-icons/gi";
import { Link } from 'react-router';


const Header1 = () => {
    return (
        <div className='bg-blue-950 text-white'>
            <div className='max-w-7xl px-4 py-2 xl:px-30 mx-auto'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-8'>
                    <a href='https://mail.google.com/mail/u/0/#inbox' className='flex items-center gap-1'>
                        <MdEmail className='size-5'/>
                        <p className='font-semibold'>charkalia@gmail.com</p>
                    </a>
                    <div className='flex items-center gap-1'>
                        <FaPhoneAlt />
                        <p className='font-semibold'>+8801885374041</p>
                    </div>
                </div>
                <div className='flex justify-between mt-3 gap-6'>
                    <a href='https://www.facebook.com/'>
                        <FaFacebook className=' size-5'/>
                    </a>
                    <a href='https://x.com/'>
                        <FaTwitter className='size-5 '/>
                    </a>
                    <a href='https://www.instagram.com/'>
                        <FaSquareInstagram className='size-5 '/>
                    </a>
                    <a href='https://web.whatsapp.com/'>
                        <FaWhatsappSquare className=' size-5 '/>
                    </a>
                    <a href='https://www.youtube.com/'>
                        <FaYoutube className='size-5 '/>
                    </a>
                    <Link to={'/'} className=''>
                        <div className='flex items-center gap-2 bg-blue-600 font-semibold  text-white px-4 py-1 rounded-xl -mt-1.5'>
                            <IoMdRefresh className='size-5'/>
                            <p>বাংলা</p>
                        </div>
                    </Link>
                    <Link to={'/'} className='-mt-1'>
                        <p className='px-4 py-1 bg-red-600 text-white font-semibold rounded-xl'>Online Apply</p>
                    </Link>
                    <a href='https://pathshala-eims.com/' className='flex items-center gap-0.5 text-2xl font-bold rounded-xl -mt-1.5'>
                        <GiBookAura className='' />
                        <p>পাঠশালা</p>
                    </a>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Header1;