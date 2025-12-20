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


const Header0 = () => {
    return (
        <div className='bg-blue-950 text-white'>
            <div className='max-w-7xl px-4 py-2 xl:px-30 mx-auto'>
                <div className='font-marko-one flex justify-between items-center text-lg font-semibold'>
                    <div >
                        Education
                    </div>
                    <div>
                        Discipline
                    </div>
                    <div>
                        Character
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header0;