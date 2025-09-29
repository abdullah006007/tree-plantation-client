import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';



import toast from 'react-hot-toast';
import { CiSearch } from 'react-icons/ci';

import Logo from '../Shareed/Logo';
import useAuth from '../Hooks/useAuth';
import Spinner from '../Shareed/Spinner';



const Navbar = () => {
  const { user, loading, logOut } = useAuth();
//   const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);






  if (loading) {
 
    return <Spinner />;
  }

  const navItem = (
    <>
      <li><NavLink to="/" className={({ isActive }) => isActive ? 'text-primary font-semibold' : ''}>Home</NavLink></li>
      <li><NavLink to="/upcoming-event" className={({ isActive }) => isActive ? 'text-primary font-semibold' : ''}>Upcoming Events</NavLink></li>
      <li><NavLink to="/about" className={({ isActive }) => isActive ? 'text-primary font-semibold' : ''}>About Us</NavLink></li>
    </>
  );

  const handleSignOut = () => {
  
    logOut()
      .then(() => {
        toast.success('Logged out successfully', { position: 'top-right' });
        setShowDropdown(false);
        navigate('/login');
      })
      .catch((err) => {
        console.error('Logout error:', err);
        toast.error('Failed to log out: ' + err.message, { position: 'top-right' });
      });
  };

  const toggleDropdown = () => {

    setShowDropdown(!showDropdown);
  };

 

 

  return (
    <div className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
              {navItem}
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <Logo />
            <p className="text-xl font-bold text-primary">Tree-Plantation</p>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {navItem}
          </ul>
        </div>
        <div className="navbar-end flex items-center gap-4">
         

          {user ? (
            <div className="flex items-center gap-3">
              <button onClick={handleSignOut} className="btn bg-primary text-white hover:bg-primary-dark px-4 py-2 rounded-md">
                Log Out
              </button>
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-2 border-gray-300 hover:border-primary transition-colors"
                  onClick={toggleDropdown}
                >
                  <img
                    src={user?.photoURL || 'https://cdn-icons-png.flaticon.com/512/4042/4042356.png'}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                    {/* <div className="px-4 py-2 text-sm text-gray-700 font-semibold">
                      {user?.displayName || 'User'}
                    </div> */}



                    <Link
                      to="/dashboard/create-event"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Create Event
                    </Link>



                    <Link
                      to="/dashboard/manage-event"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Manage Events
                    </Link>



                    <Link
                      to="/dashboard/join-event"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Joined Events
                    </Link>



                    {/* <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button> */}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/login">
                <button className="btn bg-primary text-white hover:bg-primary-dark px-4 py-2 rounded-md">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn bg-primary text-white hover:bg-primary-dark px-4 py-2 rounded-md">Register</button>
              </Link>
            </div>
          )}
        </div>
      </div>


    </div>
  );
};

export default Navbar;