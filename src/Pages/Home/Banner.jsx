
import React, { useEffect, useState } from 'react';
import slide_1 from '../../assets/photo1.jpg';
import slide_2 from '../../assets/photo2.jpg';
import slide_3 from '../../assets/photo3.jpg';

import TypeWritter from './TypeWritter';


const Banner = () => {
    const slides = [slide_1, slide_2, slide_3];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='py-3'>


          
                <div
                    className="hero rounded-2xl  max-w-screen md:min-h-[550px]"
                    style={{
                        backgroundImage: `url(${slides[index]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',

                    }}
                >
                    <div className="hero-overlay bg-opacity-60 rounded-2xl"></div>
                    <div className="hero-content text-neutral-content text-center">
                        <div className="max-w-full">
                            <div className="mb-5 md:mb-12 md:text-4xl font-semibold">

                        
                                    <TypeWritter></TypeWritter>
                                
                            </div>

                        </div>
                    </div>
                </div>
        







        </div>
    );
};

export default Banner;
