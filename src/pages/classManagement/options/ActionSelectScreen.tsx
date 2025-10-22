import type { FC, ReactNode } from 'react';
import { SquarePen, Trash2 } from 'lucide-react';

interface ActionSelectionScreenProps {
    instructionText: string;
    items: Array<{ id: number; label: string; icon: string; }>;
    actionType: 'edit' | 'delete';
    onActionClick: (id: number) => void;
}

export const ActionSelectionScreen: FC<ActionSelectionScreenProps> = ({
    instructionText,
    items,
    actionType,
    onActionClick
}) => {
    const ActionItem: FC<{ item: any }> = ({ item }) => {
        const ActionIcon = actionType === 'edit' ? SquarePen : Trash2;
        return (
            <div 
                className='flex items-center gap-4 lg:gap-6 bg-[#690808] p-3 lg:p-4 rounded-lg 
                           w-full max-w-sm lg:max-w-lg lg:mx-auto 
                           shadow-[0_5px_15px_rgba(0,0,0,0.4)] cursor-pointer hover:bg-[rgb(170,0,0)] transition-colors'
            >
                
                {/* Ícones e texto continuam menores no mobile para otimização do espaço horizontal */}
                <img src={item.icon} alt={item.label} className='w-6 h-6 lg:w-8 lg:h-8 rounded-full flex-shrink-0' />
                <span className='flex-1 text-center font-semibold text-base lg:text-lg'>{item.label}</span>
                <button onClick={() => onActionClick(item.id)} className='text-white hover:text-gray-300 cursor-pointer flex-shrink-0'>
                    <ActionIcon size={20} className='lg:w-6 lg:h-6' />
                </button>
            </div>
        );
    };

    return (
        <div className='flex flex-col items-center gap-8 mt-8 mb-22 lg:gap-6 lg:mt-8 lg:mb-0'>
            
            <h1 className='text-white mt-6 font-bold text-[12px] lg:text-2xl tracking-wider text-center'>
                {instructionText}
            </h1>

            <div className='flex flex-col gap-6 w-full items-center lg:gap-6 lg:mt-4'>
                {items.map(item => (
                    <ActionItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};