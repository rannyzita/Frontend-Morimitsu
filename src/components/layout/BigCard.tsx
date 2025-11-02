import type { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { ArrowLeft } from 'lucide-react';
import { Box } from '@mui/material';

interface PageLayoutProps {
    children: ReactNode;
    title?: string;
    icon?: ReactNode;
    className?: string;
    backPath?: string;
}

export const PageLayout: FC<PageLayoutProps> = ({ 
    children, 
    title, 
    icon, 
    className, 
    backPath  
}) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        if (backPath) {
            navigate(backPath);
        } else {
            navigate(-1); 
        }
    };

    return (
        <Box 
            component='div' 
            className={`bg-transparent md:bg-[#1E1E1E] text-white rounded-2xl 
                        shadow-none lg:shadow-xl
                        flex flex-col overflow-hidden 
                        w-full h-auto 
                        
                        md:w-5/6 md:h-auto 

                        lg:w-[1200px] lg:h-[84vh] 
            ${className}`}
        >
            <header className='flex flex-col gap-4 px-6 pt-6 lg:px-8 lg:pt-8'>
                <div className='relative flex justify-center items-center h-12'>
                
                    <button 
                        onClick={handleGoBack}
                        className='absolute left-0 top-[98px] -translate-y-1/2 text-white 
                                hover:text-white transition-colors cursor-pointer lg:top-1/2 lg:-translate-y-1/2'
                    >
                        <ArrowLeft size={32}/>
                    </button>

                    {title && (
                        <div className='flex items-center gap-3'>
                            <div className='flex items-center gap-2 bg-[#690808] rounded-lg px-3 py-1 md:bg-transparent md:border-none md:px-0 md:py-0 transition-all'>
                                {icon}
                                <h1 className='text-[18px] md:text-2xl font-bold tracking-wide'>{title}</h1>
                            </div>
                        </div>
                    )}
                </div>

                {title && (
                    <hr className='border-white' /> 
                )}
            </header>

            <main 
                className={`
                    px-6 py-8
                    md:px-8 md:py-7
                    lg:flex-1 lg:overflow-y-auto
                `}
            >
                <div className='max-w-5xl mx-auto'>
                    {children}
                </div>
            </main>
        </Box>
    );
}