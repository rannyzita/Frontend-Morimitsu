import { type FC } from 'react';
import { Box } from '@mui/material';
import { PageLayout } from '../../components/layout/BigCard';
import { Cake } from 'lucide-react';
import { BirthdayCarousel } from '../../components/ScrollBirthday/scrollBirthday';
import { 
    BIRTHDAYS_BY_MONTH, 
    MONTHS_ORDER, 
    type MonthlyBirthdays 
} from '../../data/birthday/birthday' 


export const Birthday: FC = () => {
    
    return (
        <Box 
            component='div' 
            className='flex flex-col items-center justify-center h-full p-4 w-full'
            
            sx={{
                overflowY: 'auto',
                
                // --- AJUSTE NA ESTILIZAÇÃO DO SCROLLBAR ---
                '&::-webkit-scrollbar': { 
                    width: '12px',
                    backgroundColor: '#3E0404', // Fundo externo da barra
                }, 
                '&::-webkit-scrollbar-thumb': { 
                    // O THUMB (a barra que você arrasta) deve ser o vermelho mais claro
                    backgroundColor: '#880000', 
                    borderRadius: '10px', 
                },
                '&::-webkit-scrollbar-track': { 
                    // O TRACK (fundo interno da barra) deve ser o vermelho escuro
                    backgroundColor: '#3E0404' 
                },
                // --- FIM DOS AJUSTES ---
            }}
        >
            <PageLayout 
                backPath='/home' 
                icon={<Cake size={36} className='lg:w-[50px] lg:h-[50px]' />} 
                title='ANIVERSARIANTES'
            >
                <div 
                    className='flex flex-col pb-18 lg:pb-0 gap-10 mt-10 lg:mt-14 w-full'
                >
                    {MONTHS_ORDER.map((monthKey) => {
                        const monthData: MonthlyBirthdays | undefined = BIRTHDAYS_BY_MONTH[monthKey];

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