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
                className='w-full bg-[#1E1E1E] p-3 pl-10 rounded-[10px] focus:outline-none text-white border-1 border-white'
            />

            <Search size={20} className='absolute left-3 top-1/2 -translate-y-1/2 text-white' />
        </div>
    );
};