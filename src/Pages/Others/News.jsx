import React from 'react';
import NewsList from '../../Components/Others/NewsList';
import Notices from '../../Components/Home/Notices';

const News = () => {
    return (
        <div>
            <Notices></Notices>
            <NewsList></NewsList>
        </div>
    );
};

export default News;