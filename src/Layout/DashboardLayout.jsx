import React from 'react';
import { NavLink, Outlet } from 'react-router';

import { AiFillHome, AiOutlineExclamationCircle, AiOutlineFileText, AiOutlineNotification, AiOutlinePlusCircle, AiOutlineShoppingCart, AiOutlineUser, AiOutlineUsergroupAdd } from 'react-icons/ai';
import useAuth from '../Hooks/useAuth';
import Logo from '../Shareed/Logo';
// import useRole from '../Hooks/useRole';


const DashboardLayout = () => {

  const { user, loading } = useAuth()
//   const { role, roleLoading } = useRole()




  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* <p>content</p> */}
        {/* Page content here */}
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none ">
            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>

        </div>
        {/* Page content here */}
        <Outlet></Outlet>

      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <Logo></Logo>


          {
            user && !loading  &&
            <>
              <NavLink
                to="/dashboard/create-event"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded-lg ${isActive ? 'bg-primary text-white' : 'hover:bg-base-300'}`
                }
              >
                <AiFillHome className="text-lg" />
                <span>Create-Event</span>
              </NavLink>


              <NavLink
                to="/dashboard/manage-event"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded-lg ${isActive ? 'bg-primary text-white' : 'hover:bg-base-300'
                  }`
                }
              >
                <AiOutlineFileText className="text-lg" />
                <span>Manage-Event</span>
              </NavLink>


              <NavLink
                to="/dashboard/join-event"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded-lg ${isActive ? 'bg-primary text-white' : 'hover:bg-base-300'
                  }`
                }
              >
                <AiOutlinePlusCircle className="text-lg" />
                <span>Joined-Event</span>
              </NavLink>


              

             

            </>
          }

        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;