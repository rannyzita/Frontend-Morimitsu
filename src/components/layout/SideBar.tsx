import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
    Users, User, Cake, GraduationCap, LogOut, ChevronLeft, ClipboardList, HomeIcon, CircleUserRound, ListChecks
} from 'lucide-react';

import { Link } from 'react-router-dom';

type NavItemProps = {
    to: string;
    icon: React.ElementType;
    children: React.ReactNode;
    toggleSideBar: () => void; 
};

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, children, toggleSideBar }) => {
    const linkClasses = `flex items-center space-x-4 p-3 rounded-lg text-white hover:bg-[#690808] transition-colors text-[12px] md:text-base`;
    const activeLinkClasses = `bg-[#690808]`;

    const handleClick = () => {
        if (window.innerWidth < 768) {
            toggleSideBar();
        }
    };

    return (
        <li>
            <NavLink
                to={to}
                className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
                onClick={handleClick} 
            >
                <Icon size={22} />
                <span className='font-medium'>{children}</span>
            </NavLink>
        </li>
    );
};

type SidebarProps = {
    isOpen: boolean;
    toggleSideBar: () => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSideBar }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) return null;

    const handleLogout = async () => {
        await logout(); 
        navigate('/login'); 
    };

    const handleLinkClick = () => {
        if (window.innerWidth < 768) {
            toggleSideBar();
        }
    };

    return (
        <aside className={`
            bg-black text-white w-55 md:w-72 p-6 pt-12 flex flex-col h-screen
            absolute z-50 border-r border-white-800 
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
            
            <div className='flex flex-col items-center text-center mb-10'>
                <Link to='/meu-perfil' className='cursor-pointer' onClick={handleLinkClick}>
                    <img
                        // src={user.imagem_perfil_url || '/IconProfile.png'}
                        src={'/IconProfile.png'}
                        alt='Foto do perfil'
                        className='w-22 h-22 md:w-36 md:h-36 rounded-full object-cover mb-4'
                    />
                </Link>
                <Link to='/meu-perfil' className='cursor-pointer' onClick={handleLinkClick}>
                    <h2 className='text-base md:text-xl font-semibold'>
                        {user.tipo === 'COORDENADOR' ? user.nome_social : 'PROFESSOR'}
                    </h2>
                </Link>
            </div>

            <div className='flex-grow flex flex-col'>
                <div className='flex items-center'>
                    
                    <nav className='flex-grow'>
                        <ul className='space-y-3'>
                            {user.tipo === 'COORDENADOR' && (
                                <>
                                    <NavItem to='/home' icon={HomeIcon} toggleSideBar={toggleSideBar}>Tela Inicial</NavItem>
                                    <NavItem to='/meu-perfil' icon={CircleUserRound} toggleSideBar={toggleSideBar}>Meu Perfil</NavItem>
                                    <NavItem to='/gerenciamento-turmas' icon={Users} toggleSideBar={toggleSideBar}>Turmas</NavItem>
                                    <NavItem to='/gerenciamento-usuarios' icon={User} toggleSideBar={toggleSideBar}>Usuários</NavItem>
                                    <NavItem to='/aniversarios' icon={Cake} toggleSideBar={toggleSideBar}>Aniversários</NavItem>
                                    <NavItem to='/graduacao' icon={GraduationCap} toggleSideBar={toggleSideBar}>Graduação</NavItem>
                                    <NavItem to='/relatorio' icon={ClipboardList} toggleSideBar={toggleSideBar}>Relatório</NavItem>
                                </>
                            )}
                            {user.tipo === 'PROFESSOR' && (
                                <>
                                    <NavItem to='/home' icon={HomeIcon} toggleSideBar={toggleSideBar}>Tela Inicial</NavItem>
                                    <NavItem to='/meu-perfil' icon={CircleUserRound} toggleSideBar={toggleSideBar}>Meu Perfil</NavItem>
                                    <NavItem to='/frequencia' icon={ListChecks} toggleSideBar={toggleSideBar}>Frequências</NavItem>
                                    <NavItem to='/aniversarios' icon={Cake} toggleSideBar={toggleSideBar}>Aniversários</NavItem>
                                    <NavItem to='/relatorio' icon={ClipboardList} toggleSideBar={toggleSideBar}>Relatório</NavItem>
                                </>
                            )}
                        </ul>
                    </nav>
                    
                    <button 
                        onClick={toggleSideBar} 
                        className='p-1 md:p-2 rounded-full text-white hover:bg-[#690808] transition-colors'
                    >
                        <ChevronLeft className='cursor-pointer w-6 h-6 md:w-8 md:h-8'/>
                    </button>
                </div>
            </div>

            <div className='pb-6'>
                <button
                    onClick={() => { handleLogout(); if (window.innerWidth < 768) toggleSideBar(); }} 
                    className='flex items-center space-x-4 p-3 w-full rounded-lg hover:bg-[#690808] hover:text-white transition-colors cursor-pointer text-sm md:text-base'
                >
                    <LogOut size={22} />
                    <span className='font-medium'>Logout</span>
                </button>
            </div>
        </aside>
    );
};