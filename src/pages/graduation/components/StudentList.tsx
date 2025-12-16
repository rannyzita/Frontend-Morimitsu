import { type FC, useEffect, useState } from 'react';
import { Award, ClipboardClock } from 'lucide-react'; 

interface StudentListItemProps {
    avatar: string;
    name: string;
    classname?: string;
    studentId: string;
    isPromoted: boolean;
    currentBeltImage: string; 
    onTogglePromoted: (studentId: string, isPromoted: boolean) => void;
    onOpenModal: () => void;
}

export const StudentListItem: FC<StudentListItemProps> = ({
    avatar,
    name,
    classname,
    studentId,
    isPromoted,
    currentBeltImage,
    onTogglePromoted,
    onOpenModal
}) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const media = window.matchMedia('(max-width: 767px)');
        setIsMobile(media.matches);
        const listener = () => setIsMobile(media.matches);
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, []);

    const handleItemClick = () => {
        if (isMobile) {
            onOpenModal();
        }
    };

    return (
        <div 
            className='relative flex items-center bg-[#690808] p-2 md:p-3 rounded-lg w-full max-w-lg lg:w-[950px] lg:max-w-none shadow-[0_5px_15px_rgba(0,0,0,0.3)] cursor-pointer'
            onClick={handleItemClick} 
        >
            
            <div className='flex items-center gap-1 md:gap-3 flex-1'>
                <img
                    src={avatar}
                    alt={name}
                    className='w-8 h-8 lg:w-9 lg:h-9 rounded-full flex-shrink-0'
                />
                <img
                    src={currentBeltImage}
                    alt='Faixa atual'
                    className='w-5 h-5 lg:w-7 lg:h-7 object-contain flex-shrink-0'
                />

                <div className='h-7 lg:h-9 border-l border-white opacity-50 mx-1 flex-shrink-0' /> 

                <span className='flex-1 text-white truncate text-left text-[10px] md:text-[12px] lg:text-base'>
                    {name}
                </span>
            </div>

            <div className='flex-shrink-0 flex items-center gap-4 md:ml-auto'>
                
                <span className='hidden md:flex text-white text-xs lg:text-sm'>
                    {classname}
                </span>

                <div 
                    className='hidden relative md:flex flex-row items-center justify-center bg-[#3E0404] py-1 px-2 rounded-[8px] md:w-20 md:h-8 lg:w-30 lg:h-10 cursor-pointer' 
                    onClick={(e) => {
                        e.stopPropagation();
                        onOpenModal();
                    }}
                >
                    <ClipboardClock className='text-white md:w-4 md:h-4 lg:w-6 lg:h-6 mr-2' />
                    <span className='block text-white text-[10px] lg:text-[14px] leading-tight text-center'>
                        Avaliar
                    </span>
                </div>
            </div>
        </div>
    );
};