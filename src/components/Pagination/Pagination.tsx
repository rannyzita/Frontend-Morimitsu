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
    
    const getPageNumbers = (): (number | string)[] => {
        if (totalPages <= 4) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        
        return [1, 2, 3, '...', totalPages];
    };

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
                <ChevronLeft size={26} /> 
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
                <ChevronRight size={26} /> 
            </PageButton>
        </nav>
    );
}