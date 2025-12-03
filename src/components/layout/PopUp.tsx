import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import type { PopUpData } from '../layout/typePopUp/type';

interface PopUpProps {
    isOpen: boolean;
    onClose: () => void;
    data: PopUpData | null;
}

export const PopUp: React.FC<PopUpProps> = ({ isOpen, onClose, data }) => {

    if (!isOpen || !data) return null;

    // Estado do acordeão — agora é dinâmico, aceita QUALQUER id
    const [openItem, setOpenItem] = useState<string | null>(null);

    const handleToggle = (id: string) => {
        setOpenItem(prev => (prev === id ? null : id));
    };

    return (
        <div className='fixed inset-0 z-50' onClick={onClose}>
            
            <div
                className='
                    absolute 
                    top-14 left-1/2 -translate-x-1/2
                    sm:top-20 sm:left-20 sm:translate-x-0
                    md:left-24 md:top-20
                    w-[85%] max-w-sm sm:max-w-md 
                    bg-[#3E0404] text-white 
                    p-6 shadow-2xl relative rounded-xl
                '
                onClick={(e) => e.stopPropagation()}
            >

                {/* Triângulo (escondido no mobile) */}
                <div
                    className='
                        hidden sm:block
                        absolute md:top-[-40px] top-[-25px] 
                        md:right-[245px] right-[115px]
                        w-0 h-0 
                        md:border-l-[-10px] border-l-[-20px]
                        md:border-l-transparent border-l-transparent
                        md:border-r-[202px] border-r-[202px]
                        md:border-r-transparent border-r-transparent
                        md:border-b-[80px] border-b-[50px]
                        border-b-[#3E0404]
                    '
                ></div>

                {/* Botão Fechar */}
                <button
                    onClick={onClose}
                    className='absolute top-2 right-2 p-2 rounded-full hover:bg-black/20 transition-colors'
                >
                    <X size={24} className='text-white' />
                </button>

                {/* Título */}
                <h2 className='text-xl sm:text-2xl font-bold mb-4 mt-5 text-center' >
                    {data.title}
                </h2>

                {/* Descrição */}
                <p className='text-[12px] sm:text-[14px] mb-6 text-justify'>
                    {data.description}
                </p>

                {/* Itens do pop-up */}
                <div className='space-y-3'>

                    {data.items.map((item) => {
                        const isOpen = openItem === item.id;

                        return (
                            <div key={item.id} className='rounded-lg overflow-hidden shadow-md'>

                                {/* Cabeçalho clicável */}
                                <div
                                    className='bg-[#880000] p-3 flex items-center justify-between cursor-pointer hover:bg-[#a02020] transition-colors shadow-[0_5px_15px_rgba(0,0,0,0.4)] select-none'
                                    onClick={() => handleToggle(item.id)}
                                >
                                    <span className='font-semibold text-[10px] md:text-[12px]'>{item.title}</span>

                                    <div className='flex-shrink-0'>
                                        {isOpen ? (
                                            <ChevronUp 
                                                className='text-white !w-5 !h-5 sm:!w-6 sm:!h-6 lg:!w-7 lg:!h-7' 
                                            />
                                        ) : (
                                            <ChevronDown 
                                                className='text-white !w-5 !h-5 sm:!w-6 sm:!h-6 lg:!w-7 lg:!h-7' 
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Corpo do acordeão */}
                                <div
                                    className={`
                                        bg-[#880000] border-t border-white/20 overflow-hidden transition-all duration-300
                                        ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0' }
                                    `}
                                >
                                    {item.content}
                                </div>

                            </div>
                        );
                    })}

                </div>
                
                {/* Link para Guia Completa do Usuário */}
                <div className='mt-6 text-center flex flex-col gap-2 border-t border-white/20'>
                        
                    <p className='text-[10px] md:text-[14px] text-white font-semibold mt-2'>
                        Guia Completa do Usuário:
                    </p>

                    <div className='flex flex-row sm:flex-row items-center justify-center gap-3'>

                        {/* Google Docs */}
                        <a 
                            href='https://docs.google.com/document/d/1zdUZBIj6JHla6IEEm4uFYhb1pBNAaEMhv_e7tnE1iDo/edit?usp=sharing'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='
                                px-4 py-2 rounded-lg text-[10px] font-medium 
                                bg-white/10 hover:bg-white/20 transition 
                                text-white w-full sm:w-auto
                            '
                        >
                            Google Docs
                        </a>

                        {/* Arquivo PDF */}
                        <a 
                            href='/arquivo-guia.pdf'
                            download
                            className='
                                px-4 py-2 rounded-lg text-[10px] font-medium 
                                bg-white/10 hover:bg-white/20 transition 
                                text-white w-full sm:w-auto
                            '
                        >
                            Baixar PDF
                        </a>

                    </div>
                </div>

            </div>
        </div>
    );
};
