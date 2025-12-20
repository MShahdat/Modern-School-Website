import React from 'react';
import Banner from '../../Components/Home/Banner';
import Hero1 from '../../Components/Home/Hero1';
import StudentStatistics from '../../Components/Student/StudentStatistics';
import Teacher from '../../Components/Home/Teacher';
import Notice from '../../Components/Home/Notice';
import Photo from '../../Components/Home/Photo';
import Ab from '../../Components/Home/Ab';
import QuickAccess from '../../Components/Home/QuickAccess';
import Event from '../../Components/Home/Event';
import News from '../../Components/Home/News';
import Achieve from '../../Components/Home/Achieve';
import Notices from '../../Components/Home/Notices';

const Home = () => {
    return (
        <div>
            <Notices></Notices>
            <Banner></Banner>
            {/* <Stat></Stat> */}
            <QuickAccess></QuickAccess>
            <Achieve></Achieve>
            <Hero1></Hero1>
            <div className='bg-blue-950 py-8'>
                <div className=" max-w-7xl mx-auto px-4 lg:px-10 py-8">
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 ">
                    {/* Left side: Photo Gallery (2/3 width on large) */}
                    <div className="lg:w-3/5">
                    <Photo />
                    </div>

                    {/* Right side: Notice Board (1/3 width on large) */}
                    <div className="lg:w-2/5">
                    <Notice />
                    </div>
                </div>
            </div>
            </div>
            <Ab></Ab>
            <Event></Event>
            <News></News>
            <Teacher></Teacher>
            {/* <About1></About1> */}
            <StudentStatistics></StudentStatistics>
        </div>
    );
};

export default Home;