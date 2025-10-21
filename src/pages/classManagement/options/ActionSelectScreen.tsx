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
            <div className='flex items-center gap-6 bg-[#690808] p-4 rounded-lg w-full max-w-lg shadow-[0_5px_15px_rgba(0,0,0,0.4)] cursor-pointer hover:bg-[rgb(170,0,0)] transition-colors'>
                
                <img src={item.icon} alt={item.label} className='w-8 h-8 rounded-full' />
                
                <span className='flex-1 text-center font-semibold text-lg'>{item.label}</span>
                
                <button onClick={() => onActionClick(item.id)} className='text-white hover:text-gray-300 cursor-pointer'>
                    <ActionIcon size={24} />
                </button>
            </div>
        );
    };

    return (
        <div className='flex flex-col items-center gap-6 mt-8'>
            <h1 className='text-white font-bold text-2xl tracking-wider'>{instructionText}</h1>

            <div className='flex flex-col gap-6 w-full items-center mt-4'>
                {items.map(item => (
                    <ActionItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};