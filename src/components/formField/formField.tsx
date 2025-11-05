import { useState, type FC } from 'react';
import { SquarePen, ChevronDown } from 'lucide-react';
import { type ReactNode } from 'react';

interface FormFieldProps {
    label: ReactNode;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    isSelect?: boolean;
    showEditIcon?: boolean; 
}

export const FormField: FC<FormFieldProps> = ({ 
    label, 
    value, 
    onChange, 
    type = 'text', 
    isSelect = false, 
    showEditIcon = false 
}) => {
    const [isSelectOpen, setIsSelectOpen] = useState(false);

    return (
        <div className='flex flex-col gap-1'>
            <label className='text-sm text-gray-400'>{label}</label>
            <div className={showEditIcon ? 'flex items-center gap-3' : ''}>
                <div className='relative flex-1'>
                    {isSelect ? (
                        <>
                            <select
                                value={value}
                                onChange={(e) => {
                                    onChange(e.target.value);
                                    setIsSelectOpen(false);
                                }}
                                onMouseDown={() => setIsSelectOpen(true)}
                                onBlur={() => setIsSelectOpen(false)}
                                className='
                                    w-full bg-neutral-700 p-3 rounded-lg appearance-none focus:outline-none text-white border border-neutral-600
                                    h-11 text-sm          /* mobile */
                                    md:h-9 md:text-xs     /* iPad */
                                    lg:h-12 lg:text-base  /* desktop */
                                '
                            >
                                <option value='Saulo Bezerra'>Saulo Bezerra</option>
                                <option value='Outro Professor'>Outro Professor</option>
                            </select>
                            <ChevronDown 
                                size={24} 
                                className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transition-transform duration-200 ${isSelectOpen ? 'rotate-180' : ''}`} 
                            />
                        </>
                    ) : (
                        <input 
                            type={type} 
                            value={value} 
                            onChange={(e) => onChange(e.target.value)}
                            className='
                                w-full bg-neutral-700 p-3 rounded-lg focus:outline-none text-white border border-neutral-600
                                h-9 text-sm          /* mobile */
                                md:h-9 md:text-xs     /* iPad */
                                lg:h-12 lg:text-base  /* desktop */
                                [&::-webkit-calendar-picker-indicator]:invert
                                [&::-webkit-calendar-picker-indicator]:opacity-100"
                            '
                        />
                    )}
                </div>
                {showEditIcon && (
                    <SquarePen size={28} className='text-gray-400 cursor-pointer hover:text-white' />
                )}
            </div>
        </div>
    );
};