import { AlertTriangle } from 'lucide-react';
import { type FC } from 'react';

interface GraduationAlertProps {
    message: string;
    className?: string;
}

export const GraduationAlert: FC<GraduationAlertProps> = ({ message, className = '' }) => {
    return (
        <div className={`
            flex flex-col items-center justify-center p-2 rounded-lg 
            
            md:flex-row md:items-center 
            
            bg-[#FFF3CD] border border-black font-semibold shadow-[0_5px_15px_rgba(0,0,0,0.4)] text-black
            
            ${className}
        `}>
            <AlertTriangle 
                className='w-7 h-7 md:w-8 md:h-8 mb-1 md:mr-2 md:mb-0 flex-shrink-0' 
                
                strokeWidth={2} 
                stroke='#000000' 
                
                fill='#FF9D00' 
            />
            
            <span className='text-black text-[10px] md:text-[12px] text-center'>{message}</span>
        </div>
    );
};