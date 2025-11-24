import { type FC } from 'react';
import { Box } from '@mui/material';
import { PageLayout } from '../../components/layout/BigCard';
import { Cake } from 'lucide-react';

// 🚨 IMPORTAÇÕES NECESSÁRIAS
import { BirthdayCarousel } from '../../components/ScrollBirthday/scrollBirthday';
// IMPORTAÇÃO DE DADOS (Assumindo que estão na pasta constants/data)
import { 
    BIRTHDAYS_BY_MONTH, 
    MONTHS_ORDER, 
    type MonthlyBirthdays // Importar o tipo para tipagem correta
} from '../../data/birthday/birthday' 


export const Birthday: FC = () => {
    
    return (
        // O Box principal gerencia a rolagem vertical estilizada
        <Box 
            component='div' 
            className='flex flex-col items-center justify-center h-full p-4 w-full'
            // Aplicando a rolagem vertical e o estilo vermelho da barra de rolagem (Scrollbar)
            sx={{
                overflowY: 'auto',
                // Estilos WebKit (Chrome, Safari, Edge) para a barra de rolagem vertical
                '&::-webkit-scrollbar': { width: '12px' }, 
                '&::-webkit-scrollbar-thumb': { 
                    backgroundColor: '#880000', // COR VERMELHA DA BARRA
                    borderRadius: '10px', 
                },
                '&::-webkit-scrollbar-track': { 
                    backgroundColor: '#3E0404' // COR VERMELHA ESCURA DO FUNDO
                },
            }}
        >
            <PageLayout 
                backPath='/home' 
                icon={<Cake size={36} className='lg:w-[50px] lg:h-[50px]' />} 
                title='ANIVERSARIANTES'
            >
                {/* Este div contém o conteúdo, SEM rolagem vertical interna, 
                    deixando a rolagem para o Box pai. */}
                <div 
                    className='flex flex-col pb-18 lg:pb-0 gap-10 mt-10 lg:mt-14 w-full'
                >
                    {/* Itera sobre a ordem dos meses */}
                    {MONTHS_ORDER.map((monthKey) => {
                        const monthData: MonthlyBirthdays | undefined = BIRTHDAYS_BY_MONTH[monthKey];

                        // Não renderiza o mês se os dados não existirem ou estiverem vazios
                        if (!monthData || monthData.members.length === 0) {
                            return null;
                        }
                        
                        return (
                            <BirthdayCarousel
                                key={monthKey}
                                title={monthData.title}
                                members={monthData.members}
                            />
                        );
                    })}
                </div> 
            </PageLayout>
        </Box>
    )
}