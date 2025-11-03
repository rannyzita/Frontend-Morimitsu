import type { FC } from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export const SearchInput: FC<SearchInputProps> = ({ 
    value, 
    onChange, 
    placeholder = 'Buscar...',
    className = '' 
}) => {
    return (
        <div className={`relative ${className} gap-4`}>
            <input 
                type='text'
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className='
                    w-full 
                    bg-black md:bg-[#1E1E1E] 
                    
                    p-2 md:p-3     
                    pl-3 md:pl-4  
                    pr-10 md:pr-14
                    
                    rounded-[10px] 
                    focus:outline-none 
                    text-white 
                    
                    text-[12px] md:text-[16px] 
                    placeholder:text-[12px] md:placeholder:text-[16px] 
                    placeholder:text-gray-300
                    
                    border border-white
                '
            />

            <div className='absolute right-3 top-1/2 -translate-y-1/2 flex items-center h-5'>
                <span className='border-l border-white h-8 mr-3'></span>
                <Search className='text-white pointer-events-none w-4 h-4 md:w-5 md:h-5' />
            </div>
        </div>
    );
};