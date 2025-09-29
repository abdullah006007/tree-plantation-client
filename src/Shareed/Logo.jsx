import React from 'react';

import logoImage from '../assets/tree-logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to='/'>

            <div className='bg-white flex justify-center'>
                <img className='w-16' src={logoImage} alt="" />

            </div>
        </Link>
    );
};

export default Logo;