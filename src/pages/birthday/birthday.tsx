import { useState, type FC, type ReactNode } from 'react';
import { Box } from '@mui/material';
import { PageLayout } from '../../components/layout/BigCardGray_';
import { Cake } from 'lucide-react';
import { Link } from 'react-router-dom';


export const Birthday: FC = () => {
    return (
        <Box component='div' className='flex flex-col items-center justify-center h-full p-4'>
            <PageLayout backPath='/home' icon={<Cake size={36} className='lg:w-[50px] lg:h-[50px]' />} title='ANIVERSARIANTES'>
                <div className='flex flex-col pb-18 lg:pb-0 gap-6 mt-10 lg:mt-14 items-center'>

                </div> 
            </PageLayout>
        </Box>
    )
}