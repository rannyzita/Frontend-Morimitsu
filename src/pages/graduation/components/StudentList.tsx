import type { FC } from 'react';
import { Award, ClipboardClock, X } from 'lucide-react';

interface StudentListItemProps {
    avatar: string;
    name: string;
    classname?: string;
    studentId: number;
    isPromoted: boolean;
    onTogglePromoted: (studentId: number, isPromoted: boolean) => void;
    onIgnoreAssessment: (studentId: number) => void; // 🚨 Prop para o botão 'X'
    onOpenModal: () => void;
}

export const StudentListItem: FC<StudentListItemProps> = ({
    avatar,
    name,
    classname,
    studentId,
    isPromoted,
    onTogglePromoted,
    onIgnoreAssessment,
    onOpenModal
}) => {
    return (
        <div className='relative flex flex-col lg:flex-row items-center bg-[#690808] p-3 rounded-lg w-full max-w-lg lg:w-[950px] lg:max-w-none shadow-[0_5px_15px_rgba(0,0,0,0.3)]'>
            {/* Botão 'X' para disparar o modal */}
            <button 
                className='absolute top-2 right-2 text-white/70 hover:text-white transition-colors'
                onClick={() => onIgnoreAssessment(studentId)}
                aria-label='Ignorar avaliação'
            >
                <X size={20} color='white' className='cursor-pointer'/>
            </button>

            <div className='flex items-center gap-1 md:gap-3 w-full lg:w-auto'>
                <img
                    src={avatar}
                    alt={name}
                    className='w-8 h-8 lg:w-10 lg:h-10 rounded-full flex-shrink-0'
                />
                <Award
                    size={20}
                    className='text-white flex-shrink-0 lg:w-6 lg:h-6'
                />

                <div className= 'h-8 lg:h-10 border-l border-white opacity-50 mx-1 flex-shrink-0' />

                <span className='flex-1 text-white truncate text-left text-[10px] md:text-[14px] lg:text-base'>
                    {name}
                </span>
            </div>

            <div className='flex-shrink-0 flex items-center gap-3 mr-8 lg:ml-auto'>
                
                <div className='h-10 border-l border-white opacity-50 mx-1 hidden lg:block' />

                <span className='hidden lg:flex text-white text-xs lg:text-sm pl-2 pr-6'>
                    Turma: {classname}
                </span>

                <div className='hidden relative lg:flex flex-row items-center justify-center bg-[#3E0404] py-1 px-1 rounded-[10px] w-28 h-10 cursor-pointer' onClick={onOpenModal}>
                    <ClipboardClock size={20} className='text-white mr-3 lg:w-6 lg:h-6' />
                    <span className='block text-white text-[10px] lg:text-[14px] leading-tight text-center'>
                        Avaliar
                    </span>
                </div>
            </div>
        </div>
    );
};