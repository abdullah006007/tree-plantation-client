import React from 'react';
import Banner from './Banner';
import Features from './Features';
import Gallery from './Gallery';
import NewsLetter from './NewsLetter';

const Home = () => {
    return (
        <div>
        <Banner></Banner>
        <Features></Features>
        <Gallery></Gallery>
        <NewsLetter></NewsLetter>
            
        </div>
    );
};

export default Home;