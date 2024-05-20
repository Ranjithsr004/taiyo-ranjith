import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosContact } from "react-icons/io";
import { GoGraph } from "react-icons/go";
import { Link } from 'react-router-dom';

const SideBar = () => {

  // state to manage sidebar open/close
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 
  // function to toggle sidebar open/close
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  // function to close sidebar
  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex">
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={handleToggleSidebar}
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <GiHamburgerMenu />
              </button>
              <a href="/" className="flex ms-2 md:me-24">
                <img src="./Taiyo-logo.png" className="h-8 me-3" alt="Logo" />
              </a>
            </div>
          </div>
        </div>
      </nav>
      <aside className={`fixed top-0 left-0 z-40 w-64 h-full pt-20 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`} aria-label="Sidebar">
        <div className="h-full  px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <Link to='/' onClick={handleCloseSidebar}>
              <li>
                <button className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <IoIosContact />
                  <span className="ms-3">Contact</span>
                </button>
              </li>
            </Link>
            <Link to='/chartsmaps' onClick={handleCloseSidebar}>
              <li className='mt-4'>
                <button className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <GoGraph />
                  <span className="flex-1 ms-3 whitespace-nowrap">Charts and Maps</span>
                </button>
              </li>
            </Link>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
