import type { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { ArrowLeft } from 'lucide-react';
import { Box } from '@mui/material';

interface PageLayoutProps {

    children: ReactNode;
    
    title?: string;
    icon?: ReactNode;
    
    className?: string;
    }

    export const PageLayout: FC<PageLayoutProps> = ({ children, title, icon, className }) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); 
    };

    return (
        <Box 
            component='div' 
            className={`bg-neutral-800 text-white rounded-2xl shadow-xl w-full p-6 md:p-8 ${className}`}
        >
        
            <header className='flex flex-col gap-4 mb-6'>
                <div className='relative flex justify-center items-center h-8'>
                
                <button 
                    onClick={handleGoBack}
                    className='absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 
                            hover:text-white transition-colors'
                >
                    <ArrowLeft size={24} />
                </button>

                {title && (
                    <div className='flex items-center gap-3'>
                    {icon}
                    <h1 className='text-xl md:text-2xl font-bold tracking-wide'>{title}</h1>
                    </div>
                )}
                </div>

                {title && (
                <hr className='border-neutral-600' />
                )}
            </header>

            <main>
                {children}
            </main>
        </Box>
    );
}