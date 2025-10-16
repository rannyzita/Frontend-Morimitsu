import React from 'react';
import { AlignJustify } from 'lucide-react';

type TopBarProps = {
    onMenuClick: () => void;
};

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
    return (
        <header className='bg-[#690808] text-white flex items-center justify-between p-2 shadow-lg'>

            <button 
                onClick={onMenuClick}
                className='p-2 rounded-md hover:bg-black/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors'
                aria-label='Abrir Menu'
            >
                <AlignJustify size={40} />
            </button>

            <div className='flex items-center space-x-4'>
                <span className="hidden sm:block text-lg font-medium tracking-wide">
                        Morimitsu Tradição Jiu-Jitsu
                    </span>
                    <img 
                        src="/Icone-Morimitsu.png" 
                        alt="Logo Morimitsu" 
                        className="w-14 h-14 object-cover rounded-full"
                    />
                </div>
        </header>
    );
}