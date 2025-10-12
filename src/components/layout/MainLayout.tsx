import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './SideBar';
import { TopBar } from './TopBar';
import { Bottombar } from './BottomBar';

export const MainLayout: React.FC = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/home';
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="relative flex h-screen bg-black overflow-hidden">
            <Sidebar isOpen={isSidebarOpen} />
            
            {isSidebarOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 z-40" 
                ></div>
            )}

            {/* CORREÇÃO PRINCIPAL: Removida a lógica de margem condicional */}
            <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
                <TopBar onMenuClick={toggleSidebar} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
                    <Outlet />
                </main>
                {isHomePage && <Bottombar />}
            </div>
        </div>
    );
};