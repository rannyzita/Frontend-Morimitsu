import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './SideBar';
import { TopBar } from './TopBar';
import { Bottombar } from './BottomBar';

export const MainLayout: React.FC = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/home';
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="relative flex min-h-screen bg-black overflow-hidden">
            <Sidebar isOpen={isSidebarOpen} toggleSideBar={toggleSidebar}/>
            
            {isSidebarOpen && (
                <div onClick={toggleSidebar} className="md:hidden fixed inset-0 bg-black/60 z-40"></div>
            )}

            <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
                <TopBar onMenuClick={toggleSidebar} />
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
                
                {isHomePage && <Bottombar />}
            </div>
        </div>
    );
};