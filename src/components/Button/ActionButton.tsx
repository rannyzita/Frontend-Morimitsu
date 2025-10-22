import type { FC, ReactNode } from 'react';

export const ActionButton: FC<{ icon: ReactNode, label: string }> = ({ icon, label }) => (
    <button className='relative flex items-center justify-center bg-[#690808] p-4 rounded-lg 
                        font-semibold text-lg hover:bg-[rgb(170,0,0)] transition-colors
                        w-full lg:w-150 shadow-[0_5px_15px_rgba(0,0,0,0.4)] cursor-pointer' 
    >
        <div className='absolute left-4 top-1/2 -translate-y-1/2'>
            {icon}
        </div>
        <span className='text-sm lg:text-base'>{label}</span>
    </button>
);