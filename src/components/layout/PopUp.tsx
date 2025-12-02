import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

interface PopUpProps {
    isOpen: boolean;
    onClose: () => void;
}

// Definição dos itens do menu e seus conteúdos
const menuItems = [
    { 
        id: 'ver', 
        title: '1. Ver Usuários', 
        content: (
            <div className='p-3 text-sm text-white/90'>
                <ul className='list-disc list-inside space-y-2 mb-4'>
                    <li>Exibe a lista completa de todas as contas cadastradas na academia.</li>
                </ul>
                <h4 className='font-semibold mb-2'>Como eu visualizo o usuário?</h4>
                <ul className='list-disc list-inside space-y-2 ml-4'>
                    <li>Primeiro, você pode pesquisar pelo campo de busca ou pela paginação (Mesmo demorada).</li>
                    <li>Depois, ao clicar no campo do usuário ou em 'ver mais', irá aparecer o modal com todas as informações pessoais daquele usuário.</li>
                </ul>
            </div>
        )
    },
    { id: 'criar', title: '2. Criar Usuário', content: null },
    { id: 'editar', title: '3. Editar Usuário', content: null },
    { id: 'excluir', title: '4. Excluir Usuário', content: null },
];

// O tipo é inferido, mas é bom mantê-lo claro para o useState
type MenuItemId = 'ver' | 'criar' | 'editar' | 'excluir';


export const PopUp: React.FC<PopUpProps> = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }
    
    // 1. Estado para controlar qual item está aberto. 'ver' começa aberto como no anexo.
    const [openItem, setOpenItem] = useState<MenuItemId | null>('ver');

    // Função para alternar o estado do item clicado
    const handleToggle = (id: MenuItemId) => {
        setOpenItem(prevId => prevId === id ? null : id);
    };

    return (

        <div 
            className='fixed inset-0 z-50' 
            onClick={onClose} 
        >
            
            
            <div 
                className='
                    absolute 
                    top-14 left-1/2 -translate-x-1/2   /* MOBILE: centraliza */
                    sm:top-20 sm:left-20 sm:translate-x-0
                    md:left-22 md:top-20

                    w-[85%] max-sm:w-[85%]           /* MOBILE: reduz largura */
                    max-w-sm sm:max-w-md 
                    bg-[#3E0404] text-white 
                    p-6 shadow-2xl relative rounded-xl
                '
                onClick={(e) => e.stopPropagation()}
            >
                
                {/* O Triângulo (Mantido do seu código, mas com a cor de fundo do balão) */}
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
                        border-b-[#3E0404]  /* COR DO FUNDO DO BALÃO */
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
                <h2 className='text-xl sm:text-2xl font-bold mb-4 mt-5 border-b-2 border-white/30 pb-2'>
                    GERENCIAMENTO DE USUÁRIOS
                </h2>

                <p className='text-sm sm:text-base mb-6'>
                    Esta tela é o seu painel de controle principal para gerenciar as contas de todas as pessoas cadastradas no sistema (alunos, professores e coordenadores).
                </p>

                {/* 3. Renderização dos Itens do Acordeão */}
                <div className='space-y-3'>
                    {menuItems.map((item) => {
                        const isOpen = openItem === item.id;
                        const bgColor = 'bg-[#880000]'; 

                        return (
                            <div key={item.id} className='rounded-lg overflow-hidden shadow-md'>
                                
                                {/* Cabeçalho do Item (Clicável) */}
                                <div 
                                    className={`!bg-[#880000] p-3 flex items-center justify-between cursor-pointer hover:bg-[#a02020] transition-colors shadow-[0_5px_15px_rgba(0,0,0,0.4)]`}
                                    onClick={() => handleToggle(item.id as MenuItemId)}
                                >
                                    <span className='font-semibold text-lg'>{item.title}</span>
                                    {/* Ícone de Seta (Chevron) */}
                                    {isOpen ? 
                                        <ChevronUp size={24} className='text-white' /> : 
                                        <ChevronDown size={24} className='text-white' />
                                    }
                                </div>

                                {/* Corpo do Item (Expansível) */}
                                {isOpen && item.content && (
                                    // Usando a cor de fundo do balão (#3E0404) para o corpo expandido
                                    <div className='bg-[#880000] border-t border-white/20'> 
                                        {item.content}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};