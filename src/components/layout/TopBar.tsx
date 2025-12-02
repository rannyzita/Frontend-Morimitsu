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
    // 1. Adicione o estado para controlar a visibilidade do modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Função para abrir/fechar o modal
    const toggleModal = () => setIsModalOpen(prev => !prev);
    
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

                {/* 2. Adicione o onClick para abrir/fechar o modal */}
                <CircleQuestionMark 
                    className='w-11 h-11 sm:w-12 sm:h-12 lg:w-12 lg:h-12 cursor-pointer p-2 rounded-md hover:bg-black/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors'
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

            {/* 3. Renderize o Modal com o estado e a função de fechar */}
            <PopUp 
                data={data}    
                isOpen={isModalOpen} 
                onClose={toggleModal} // O botão de fechar dentro do modal usará esta função
            />
        </header>
    );
}