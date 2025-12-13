import type { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { ArrowLeft, Info } from 'lucide-react';
import { Box } from '@mui/material';

interface PageLayoutProps {
    children: ReactNode;
    title?: string;
    icon?: ReactNode;
    className?: string;
    backPath?: string;
    info?: boolean;
    onClick?: () => void;
}

export const PageLayout: FC<PageLayoutProps> = ({ 
    children, 
    title, 
    icon, 
    className, 
    backPath,
    info,
    onClick
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
            className={`bg-[#1E1E1E] text-white rounded-2xl 
                        shadow-none lg:shadow-xl
                        flex flex-col overflow-hidden 
                        w-full h-auto 
                        
                        md:w-5/6 md:h-auto 

                        lg:w-[1200px] lg:h-[82vh] 
            ${className}`}
        >
            <header className='flex flex-col gap-4 px-6 pt-6 lg:px-8 lg:pt-8'>
                <div className='relative flex justify-center items-center h-12'>

                    {/* ✅ Botão voltar alinhado igual ao layout antigo */}
                    <button 
                        onClick={handleGoBack}
                        className='absolute left-0 
                                    top-8 /* mobile: sobe acima da linha */
                                    -translate-y-1/2 
                                    text-white hover:text-white transition-colors cursor-pointer
                                    lg:top-1/2 lg:-translate-y-1/2'
                    >
                        <ArrowLeft className='w-6 h-6 md:w-8 md:h-8 lg:w-8 lg:h-8' />
                    </button>

                    {title && (
                        <div
                            className={`flex items-center gap-2 md:gap-3 
                                        ml-2 md:ml-0 mt-4 md:mt-0 
                                        ${info ? 'cursor-pointer' : 'cursor-default'}`}
                            onClick={info ? onClick : undefined}
                        >
                            {/* Ícone exatamente igual nos dois layouts */}
                            <span className='w-6 h-6 md:w-12 md:h-12 flex items-center justify-center'>
                                {icon}
                            </span>

                            {/* Título padronizado */}
                            <h1 className='text-[12px] md:text-2xl lg:text-3xl font-bold tracking-wide'>
                                {title}
                            </h1>
                        </div>
                    )}

                    { info && 
                        (
                            <Info className='absolute right-0 top-8 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 text-white cursor-pointer' />
                        )
                    }
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