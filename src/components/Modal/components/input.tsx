import { type FC, type ReactNode } from 'react';
import { Info } from 'lucide-react'; // Ícone de Info

interface ReadOnlyInputFieldProps {
    label: string;          
    value: string;          
    hasInfoIcon?: boolean;  
}

export const InputField: FC<ReadOnlyInputFieldProps> = ({ 
    label, 
    value, 
    hasInfoIcon = false 
}) => {
    return (
        
        <div> 
            <div className='flex items-center'>
                
                {hasInfoIcon && (
                    <Info size={20} className='inline-block mr-2 mb-1 text-[#690808]' strokeWidth={3}/>
                )}
                
                <label className='font-semibold text-[#690808]'>{label}</label>
            </div>
            
            <input
                value={value}
                readOnly
                disabled 
                className='w-full bg-[#D5D5D5] rounded-full px-4 py-2 mt-1 shadow-[0_5px_15px_rgba(0,0,0,0.4)]'
            />
        </div>
    );
};