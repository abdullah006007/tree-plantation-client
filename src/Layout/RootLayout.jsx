import React from 'react';
import { Outlet } from 'react-router';

import { Toaster } from 'react-hot-toast';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';

const RootLayout = () => {


    return (
        <div>
             <Toaster />
            
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-117px)] max-w-7xl mx-auto'>
                <div className=''>
                    <Outlet></Outlet>
                </div>
            </div>

            <Footer></Footer>

            


        </div>
    );
};
export default RootLayout;