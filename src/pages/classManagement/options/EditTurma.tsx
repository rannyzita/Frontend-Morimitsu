import type { FC } from 'react';
import { Box } from '@mui/material';
import { PageLayout } from '../../../components/layout/BigCardGray';

import createClassIcon from '../assets/Create-Class.png';

export const CreateTurma: FC = () => {
    return (
        <Box 
            component='div' 
            className='flex flex-col items-center justify-center h-full p-4'
        >
            <PageLayout 
                title='CRIAR TURMA' 
                icon={<img src={createClassIcon} alt='' className='w-12 h-8' />}
            >
                <div className='flex flex-col gap-6 mt-14 items-center'>


                </div>
            </PageLayout>
        </Box>
    );
};