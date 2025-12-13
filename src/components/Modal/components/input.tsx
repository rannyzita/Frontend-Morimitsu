import { type FC } from 'react';
import { Info } from 'lucide-react';

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
                    <Info size={20} className='inline-block mr-2 text-[#690808] w-4 h-4 md:w-6 md:h-6'strokeWidth={3}/>
                )}
                
                <label className='font-semibold text-[#690808] text-[8px] md:text-[14px] inline-block'>{label}</label>
            </div>
            
            <input
                value={value}
                readOnly
                disabled 
                className='w-full bg-[#D5D5D5] rounded-full px-4 py-2 mt-1 shadow-[0_5px_15px_rgba(0,0,0,0.4)] text-[8px] md:text-[12px]'
            />
        </div>
    );
};