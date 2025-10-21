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


export const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    
    // --- MUDANÇA NA LÓGICA DE GERAR NÚMEROS ---
    const getPageNumbers = (): (number | string)[] => {
        // Regra 1: Se tiver 4 páginas ou menos, mostra todos os números.
        if (totalPages <= 4) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        // Regra 2: Se estiver perto do COMEÇO (páginas 1, 2, 3).
        // Mostra: 1, 2, 3, ..., N
        if (currentPage <= 3) {
            return [1, 2, 3, '...', totalPages];
        }

        // Regra 3: Se estiver perto do FIM (últimas 3 páginas).
        // Mostra: 1, ..., N-2, N-1, N
        if (currentPage >= totalPages - 2) {
            return [1, '...', totalPages - 2, totalPages - 1, totalPages];
        }

        // Regra 4: Se estiver no MEIO.
        // Mostra: 1, ..., atual-1, atual, atual+1, ..., N
        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
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

    if (totalPages <= 1) {
        return null; 
    }

    return (
        <nav className='flex justify-center items-center gap-2 mt-8'>
            <PageButton onClick={handlePrevious} isDisabled={currentPage === 1} isArrowButton={true}>
                <ChevronLeft size={24} /> 
            </PageButton>
    
            {pageNumbers.map((page, index) => {
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
    
                return (
                    <PageButton
                        key={page}
                        onClick={() => onPageChange(page as number)}
                        isActive={currentPage === page} 
                    >
                        {page}
                    </PageButton>
                );
            })}
    
            <PageButton onClick={handleNext} isDisabled={currentPage === totalPages} isArrowButton={true}>
                <ChevronRight size={24} /> 
            </PageButton>
        </nav>
    );
}
