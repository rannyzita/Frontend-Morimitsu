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
            // --- MUDANÇAS AQUI ---

            // 1. Estilos MOBILE (Padrão):
            //    - Ocupa a tela inteira, altura automática.
            className={`bg-[#1E1E1E] text-white rounded-2xl shadow-xl
                        flex flex-col overflow-hidden 
                        w-full h-auto 
                        
                        // 2. Estilos TABLET (md: 768px+)
                        //    - Ocupa a maior parte da tela, altura automática
                        md:w-5/6 md:h-auto 

                        // 3. Estilos DESKTOP (lg: 1024px+)
                        //    - Tamanho FIXO como você pediu
                        lg:w-[960px] lg:h-[720px] 
                        
                        ${className}`}
        >
        
            {/* Header com padding responsivo */}
            <header className='flex flex-col gap-4 px-6 pt-6 md:px-8 md:pt-8'>
                <div className='relative flex justify-center items-center h-12'>
                
                    <button 
                        onClick={handleGoBack}
                        className='absolute left-0 top-1/2 -translate-y-1/2 text-white 
                                hover:text-white transition-colors'
                    >
                        <ArrowLeft size={32} />
                    </button>

                    {title && (
                        <div className='flex items-center gap-3'>
                        {icon}
                            <h1 className='text-xl md:text-2xl font-bold tracking-wide'>{title}</h1>
                        </div>
                    )}
                </div>

                {title && (
                  // Borda separadora
                    <hr className='border-white' /> 
                )}
            </header>

            {/* --- MUDANÇA PRINCIPAL NO MAIN --- */}
            <main 
                className={`
                    // 1. Mobile/Tablet: Padding normal, altura automática
                    px-6 pb-6
                    md:px-8 md:pb-8
                    
                    // 2. Desktop (lg:):
                    //    - 'lg:flex-1': Faz o main ocupar o resto da altura fixa
                    //    - 'lg:overflow-y-auto': Cria a barra de rolagem SÓ no main
                    lg:flex-1 lg:overflow-y-auto
                `}
            >
                {children}
            </main>
        </Box>
    );
}