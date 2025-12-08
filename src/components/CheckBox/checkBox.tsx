import type { FC } from 'react';
import { X } from 'lucide-react';

interface CustomCheckboxProps {
    checked: boolean;
    onChange?: () => void;
    size?: string; 
}

export const CustomCheckbox: FC<CustomCheckboxProps> = ({ checked, onChange, size = 'w-5 h-5 md:w-6 md:h-6' }) => {
    return (
        <button
            onClick={onChange}
            className={`
                flex items-center justify-center 
                border-2 border-white rounded-md 
                transition-colors
                ${size}
                ${checked }
            `}
        >
            {checked && <X size={25} className='text-[#ffffff]' />}
        </button>
    );
};
