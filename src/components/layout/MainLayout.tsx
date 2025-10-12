import React from 'react';
import { Outlet, useLocation } from 'react-router-dom'; 
import { SideBar } from './SideBar';
import { TopBar } from './TopBar';
import { Bottombar } from './BottomBar';

export const MainLayout: React.FC = () => {
    const location = useLocation(); // Hook para pegar informações da rota atual
    const isHomePage = location.pathname === '/home'; // Verifica se a rota é a home ("/")

    return (
        <div className="flex h-screen bg-gray-100">
            <SideBar/>
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopBar/>
                
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
                    {/* O Outlet é o portal onde a página (Home, Perfil, etc.) será renderizada */}
                    <Outlet /> 
                </main>

                {/* Renderização condicional da Bottombar */}
                {isHomePage && <Bottombar />}
            </div>
        </div>
    );
};