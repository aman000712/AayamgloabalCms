import React from 'react';
import Header from '../Navigation/Header';
import Sidebar from '../Navigation/Sidebar';
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div className='flex'>


            <Sidebar />


            <div className='flex-1 flex flex-col ml-64'>

                <div className='w-full ml-4 fixed z-10 '>
                    <Header />
                </div>


                <div className='mt-16 p-6'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Layout;
