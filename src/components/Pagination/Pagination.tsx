import type { FC } from 'react';
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
}> = ({ onClick, isDisabled, isActive, children }) => {
    
    const baseStyle = 'w-9 h-9 rounded flex items-center justify-center transition-colors';
    
    const activeStyle = 'bg-white text-black font-bold';
    
    const inactiveStyle = 'text-gray-400 hover:text-white';
    
    const disabledStyle = 'opacity-50 cursor-not-allowed text-gray-600';

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={`
                ${baseStyle} 
                ${isActive ? activeStyle : inactiveStyle}
                ${isDisabled ? disabledStyle : ''}
            `}
        >
            {children}
        </button>
    );
};


export const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    
    const getPageNumbers = (): (number | string)[] => {

        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        if (currentPage <= 3) {
            return [1, 2, 3, '...', totalPages];
        }

        if (currentPage >= totalPages - 2) {
            return [1, '...', totalPages - 2, totalPages - 1, totalPages];
        }

        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
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
        // Container principal da paginação
        <nav className='flex justify-center items-center gap-2 mt-8'>
            <PageButton onClick={handlePrevious} isDisabled={currentPage === 1}>
                <ChevronLeft size={24} color='white'/>
            </PageButton>
    
            {pageNumbers.map((page, index) => {
                if (page === '...') {
                    return (
                        <span 
                            key={index} 
                            className='flex items-center justify-center w-9 h-9 text-gray-400'
                        >
                            ...
                        </span>
                    );
                }
    
                return (
                    <PageButton
                        key={index}
                        onClick={() => onPageChange(page as number)}
                        isActive={currentPage === page}
                    >
                        {page}
                    </PageButton>
                );
            })}
    
            <PageButton onClick={handleNext} isDisabled={currentPage === totalPages}>
                <ChevronRight size={24} color='white'/>
            </PageButton>
        </nav>
    );
}