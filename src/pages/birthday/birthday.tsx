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
            className='flex flex-col items-center p-4 w-full' 
        >
            <PageLayout 
                backPath='/home' 
                icon={<Cake size={36} className='lg:w-[50px] lg:h-[50px]' />} 
                title='ANIVERSARIANTES'
            >
                <div 
                    className='flex flex-col pb-6 lg:pb-0 gap-10 mt-10 lg:mt-14 w-full' 
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