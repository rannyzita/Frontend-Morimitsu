// src/components/Pagination/Pagination.tsx (ou onde ele estiver)

import type { FC, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PageButton: FC<{
    onClick: () => void;
    isDisabled?: boolean;
    isActive?: boolean;
    children: React.ReactNode;
    isArrowButton?: boolean;
}> = ({ onClick, isDisabled, isActive, children, isArrowButton = false }) => {
    
    const baseStyle = 'w-9 h-9 rounded-md flex items-center justify-center transition-colors text-white'; 
    const activeStyle = 'border border-white bg-[#131212] font-semibold text-white'; 
    const inactiveStyle = 'border border-transparent bg-[#131212] hover:bg-neutral-700 text-white'; 
    const disabledStyle = 'opacity-50 cursor-not-allowed text-neutral-600';
    const arrowStyle = 'border border-transparent bg-transparent hover:bg-neutral-800';

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={`
                ${baseStyle} 
                ${isArrowButton 
                    ? arrowStyle 
                    : (isActive ? activeStyle : inactiveStyle)
                }
                ${isDisabled ? disabledStyle : ''}
            `}
        >
            {children}
        </button>
    );
};


// --- COMPONENTE Pagination ---
export const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    
    // --- MUDANÇA NA LÓGICA DE GERAR NÚMEROS ---
    const getPageNumbers = (): (number | string)[] => {
        // Se tiver 4 páginas ou menos, mostra todos os números
        if (totalPages <= 4) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        
        // Se tiver 5 páginas ou mais, mostra SEMPRE o formato 1, 2, 3, ..., N
        return [1, 2, 3, '...', totalPages];
    };
    // --- FIM DA MUDANÇA ---

    const pageNumbers = getPageNumbers();

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };
    
    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    // Não mostra nada se tiver 1 página ou menos
    if (totalPages <= 1) {
        return null; 
    }

    return (
        // Container da Paginação (sem mudanças)
        <nav className='flex justify-center items-center gap-2 mt-8'>
            
            {/* Botão Anterior */}
            <PageButton onClick={handlePrevious} isDisabled={currentPage === 1} isArrowButton={true}>
                <ChevronLeft size={26} /> 
            </PageButton>
    
            {/* Números das Páginas */}
            {pageNumbers.map((page, index) => {
                // Se for '...', mostra o texto
                if (page === '...') {
                    return (
                        <span 
                            key={`ellipsis-${index}`} 
                            className='flex items-center justify-center w-9 h-9 text-gray-400'
                        >
                            ...
                        </span>
                    );
                }
    
                // Se for um número, mostra o PageButton
                return (
                    <PageButton
                        key={page} 
                        onClick={() => onPageChange(page as number)}
                        // O botão ativo ainda será destacado corretamente
                        isActive={currentPage === page} 
                    >
                        {page}
                    </PageButton>
                );
            })}
    
            {/* Botão Próximo */}
            <PageButton onClick={handleNext} isDisabled={currentPage === totalPages} isArrowButton={true}>
                <ChevronRight size={26} /> 
            </PageButton>
        </nav>
    );
}