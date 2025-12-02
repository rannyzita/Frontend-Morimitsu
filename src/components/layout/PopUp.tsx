// src/components/PopUp.tsx
import React from 'react';
import { X } from 'lucide-react';

interface PopUpProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PopUp: React.FC<PopUpProps> = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (

        <div 
            className='fixed inset-0 z-50' 
            onClick={onClose} // Fecha o modal ao clicar no overlay
        >
            
            {/* 2. O Balão de Fala (Ajustado) */}
            <div 
                className='
                    absolute 
                    top-14 left-1/2 -translate-x-1/2   /* MOBILE: centraliza */
                    sm:top-20 sm:left-20 sm:translate-x-0
                    md:left-22 md:top-20

                    w-[85%]	max-sm:w-[85%]           /* MOBILE: reduz largura */
                    max-w-sm sm:max-w-md 
                    bg-[#3E0404] text-white 
                    p-6 shadow-2xl relative rounded-xl
                '
                onClick={(e) => e.stopPropagation()}
            >
                
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

                {/* Botão de Fechar */}
                <button
                    onClick={onClose}
                    className='absolute top-2 right-2 p-2 rounded-full hover:bg-black/20 transition-colors cursor-pointer'
                    aria-label='Fechar Ajuda'
                >
                    <X size={24} className='text-white' />
                </button>

                {/* Conteúdo do Modal */}
                <h2 className='text-xl sm:text-2xl font-bold mb-4 mt-5'>
                    GERENCIAMENTO DE USUÁRIOS
                </h2>

                <p className='text-sm sm:text-base mb-6'>
                    Esta tela é o seu painel de controle principal para gerenciar as contas de todas as pessoas cadastradas no sistema (alunos, professores e coordenadores).
                </p>

                {/* Itens da Lista */}
                <div className='space-y-3'>
                    {['1. Ver Usuários', '2. Criar Usuário', '3. Editar Usuário', '4. Excluir Usuário'].map((item) => (
                        <div key={item} className='bg-[#880000] p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-[#a02020] transition-colors shadow-[0_5px_15px_rgba(0,0,0,0.4)]'>
                            <span className='font-semibold text-lg'>{item}</span>
                            <span className='text-xl'>&#x2304;</span> 
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};