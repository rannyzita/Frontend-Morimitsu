import React, { useState } from 'react';
import { AlignJustify, CircleQuestionMark } from 'lucide-react';
import { Link } from 'react-router-dom';

import { PopUp } from './PopUp';

export type PopUpData = {
    title: string;
    description: string;
    items: {
        id: string;
        title: string;
        content: React.ReactNode;
    }[];
};

type TopBarProps = {
    onMenuClick: () => void;
    data: PopUpData;
};

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick, data }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen(prev => !prev);
    
    return (
        <header className='bg-[#690808] text-white flex items-center justify-between p-2 shadow-lg'>

            <div className='flex items-center space-x-2'>
                <button 
                    onClick={onMenuClick}
                    className='p-2 rounded-md hover:bg-black/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors'
                    aria-label='Abrir Menu'
                >
                    <AlignJustify className='cursor-pointer w-7 h-7 md:w-12 md:h-12' 
                    strokeWidth={2} />
                </button>

                <CircleQuestionMark 
                    className='w-10 h-10 sm:w-12 sm:h-12 lg:w-12 lg:h-12 cursor-pointer p-2 rounded-md hover:bg-black/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors'
                    onClick={toggleModal} // Chama a função aqui
                    aria-label='Ajuda sobre Gerenciamento de Usuários'
                />
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

            <PopUp 
                data={data}    
                isOpen={isModalOpen} 
                onClose={toggleModal}
            />
        </header>
    );
}