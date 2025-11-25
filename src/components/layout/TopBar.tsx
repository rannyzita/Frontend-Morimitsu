import React from 'react';
import { AlignJustify, CircleQuestionMark } from 'lucide-react';
import { Link } from 'react-router-dom';

type TopBarProps = {
    onMenuClick: () => void;
};

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
    return (
        <header className='bg-[#690808] text-white flex items-center justify-between p-2 shadow-lg'>

            <div className='flex items-center space-x-2'>
                <button 
                    onClick={onMenuClick}
                    className='p-2 rounded-md hover:bg-black/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors'
                    aria-label='Abrir Menu'
                >
                    <AlignJustify size={40} className='cursor-pointer' />
                </button>

                <CircleQuestionMark className='w-11 h-11 sm:w-12 sm:h-12 lg:w-12 lg:h-12 cursor-pointer p-2 rounded-md hover:bg-black/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors' />
            </div>

            <div className='flex items-center space-x-4'>
                    <Link to={'/home'}>
                        {/* MUDANÇA AQUI: text-sm para celular, sm:text-lg para telas maiores */}
                        <span className='text-[12px] tracking-wide sm:block md:text-lg lg:text-lg'>
                            Morimitsu Tradição Jiu-Jitsu
                        </span>
                    </Link>
                    
                    <Link to={'/home'}>
                        <img 
                            src='/Icone-Morimitsu.png' 
                            alt='Logo Morimitsu' 
                            className='w-10 h-10 lg:w-14 lg:h-14 object-cover rounded-full'
                        />
                    </Link>
                </div>
        </header>
    );
}