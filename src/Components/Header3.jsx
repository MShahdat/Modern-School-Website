import React from 'react';
import { Link } from 'react-router';

const Header3 = () => {
    return (
        <div className='bg-gray-100 px-4 py-4 xl:px-30 mx-auto max-w-7xl'>
            <Link to={'/'}>
                <div className='flex gap-4 items-center'>
                    <img className='size-25 rounded-full' src='/src/Images/1.jpg'></img>
                    <div>
                        <p className='text-cyan-800 font-semibold'>EIIN No: 103902</p>
                        <h2 className='text-xl font-bold text-sky-700'>Charkalia High School</h2>
                        <p className='text-cyan-800 font-semibold'>Tapadar para, Matlob Uttar, Chandpur, Bangladesh</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Header3;