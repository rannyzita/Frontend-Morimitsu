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
};

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, children }) => {
    const linkClasses = `flex items-center space-x-4 p-3 rounded-lg text-white hover:bg-[#690808] transition-colors`;
    const activeLinkClasses = `bg-[#690808]`;

    return (
        <li>
            <NavLink
                to={to}
                className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
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

    return (
        <aside className={`
            bg-black text-white w-72 p-6 pt-12 flex flex-col h-screen
            absolute z-50 border-r border-white-800 
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
            
            <div className='flex flex-col items-center text-center mb-10'>
                <Link to='/meu-perfil' className='cursor-pointer'>
                    <img
                        src='/IconProfile.png' 
                        alt='Foto do perfil'
                        className='w-36 h-36 rounded-full object-cover mb-4'
                    />
                </Link>
                <Link to='/meu-perfil' className='cursor-pointer'>
                    <h2 className='text-xl font-semibold'>
                        {user.role === 'COORDENADOR' ? user.name : 'PROFESSOR'}
                    </h2>
                </Link>
            </div>

            <div className='flex-grow flex flex-col'>
                <div className='flex items-center'>
                    <nav className='flex-grow'>
                        <ul className='space-y-3'>
                            {user.role === 'COORDENADOR' && (
                                <>
                                    <NavItem to='/home' icon={HomeIcon}>Tela Inicial</NavItem>
                                    <NavItem to='/meu-perfil' icon={CircleUserRound}>Meu Perfil</NavItem>
                                    <NavItem to='/gerenciamento-turmas' icon={Users}>Turmas</NavItem>
                                    <NavItem to='/usuarios' icon={User}>Usuários</NavItem>
                                    <NavItem to='/aniversarios' icon={Cake}>Aniversários</NavItem>
                                    <NavItem to='/graduacao' icon={GraduationCap}>Graduação</NavItem>
                                    <NavItem to='/relatorio' icon={ClipboardList}>Relatório</NavItem>
                                </>
                            )}
                            {user.role === 'PROFESSOR' && (
                                <>
                                    <NavItem to='/home' icon={HomeIcon}>Tela Inicial</NavItem>
                                    <NavItem to='/meu-perfil' icon={CircleUserRound}>Meu Perfil</NavItem>
                                    <NavItem to='/frequencia' icon={ListChecks}>Frequências</NavItem>
                                    <NavItem to='/aniversarios' icon={Cake}>Aniversários</NavItem>
                                    <NavItem to='/relatorio' icon={ClipboardList}>Relatório</NavItem>
                                </>
                            )}
                        </ul>
                    </nav>
                    
                    <button 
                        onClick={toggleSideBar} 
                        className='p-2 rounded-full text-white-400 hover:bg-[#690808] hover:text-white transition-colors'
                    >
                        <ChevronLeft size={32} className='cursor-pointer'/>
                    </button>
                </div>
            </div>

            <div className='pb-6'>
                <button
                    onClick={handleLogout}
                    className='flex items-center space-x-4 p-3 w-full rounded-lg hover:bg-[#690808] hover:text-white transition-colors cursor-pointer'
                >
                    <LogOut size={22} />
                    <span className='font-medium'>Logout</span>
                </button>
            </div>
        </aside>
    );
};