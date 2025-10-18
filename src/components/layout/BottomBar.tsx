import React from 'react';

import { Box, Grid, Typography, Link } from '@mui/material';

import { Mail, Phone } from 'lucide-react';
import { Instagram } from '@mui/icons-material';

export const Bottombar: React.FC = () => {
    return (
        <Box
            component='footer'
            className='bg-[#690808] py-8 px-8 md:px-24'
        >
            <Grid container spacing={{ xs: 6, md: 40 }}>

                {/* 1 - ABOUT US */}
                <Grid item xs={12} md={4}>
                    <Typography variant='h5' className='!font-bold !mb-4 tracking-wide'>
                        <Box component='span' sx={{ color: 'white' }}>ABOUT</Box>{' '}
                        <Box component='span' sx={{ color: '#3E0404' }}>US</Box>
                    </Typography>
                    <Typography variant='body2' className='leading-relaxed text-gray-300 max-w-xs'>
                        Somos a Morimitsu Tradição Jiu-jitsu. Honramos o ensino da arte marcial, com foco na disciplina e respeito, para forjar o caráter e a técnica de cada aluno nos desafios dentro e fora do tatame.
                    </Typography>
                </Grid>

                {/* 2 - OUR LOCATIONS */}
                <Grid item xs={12} md={4}>
                    <Typography variant='h5' className='!font-bold !mb-4 tracking-wide'>
                        <Box component='span' sx={{ color: 'white' }}>OUR</Box>{' '}
                        <Box component='span' sx={{ color: '#3E0404' }}>LOCATIONS</Box>
                    </Typography>
                    {/* CORREÇÃO: Usando classes do Tailwind para os bullets, em vez de digitá-los manualmente */}
                    <ul className='space-y-2 list-disc pl-5 text-gray-300'>
                        <li>Juazeiro do Norte, Ceará</li>
                        <li>Crato, Ceará</li>
                        <li>Aquiraz, Ceará</li>
                        <li>Cedro, Ceará</li>
                    </ul>
                </Grid>
                
                {/* 3 - CONTACT US */}
                <Grid item xs={12} md={4}>
                    <Typography variant='h5' className='!font-bold !mb-4 tracking-wide'>
                        <Box component='span' sx={{ color: 'white' }}>CONTACT</Box>{' '}
                        <Box component='span' sx={{ color: '#3E0404' }}>US</Box>
                    </Typography>
                    <div className='space-y-3'>
                        <Link href='https://www.instagram.com/morimitsu_kmrbjj_cedro' target='_blank' rel='noopener' className='!flex !items-center !space-x-3 !text-gray-300 hover:!text-white !transition-colors'>
                            <Instagram fontSize='medium'></Instagram>
                            <span>@morimitsu_kmbjj_cedro</span>
                        </Link>
                        {/* CORREÇÃO: Link do Instagram atualizado */}
                        <Link href='https://www.instagram.com/saulobezerrabjj' target='_blank' rel='noopener' className='!flex !items-center !space-x-3 !text-gray-300 hover:!text-white !transition-colors'>
                            <Instagram fontSize='medium'></Instagram>
                            <span>@saulobezerrabjj</span>
                        </Link>
                        <Link href='mailto:saulo@ifce.edu.br' className='!flex !items-center !space-x-3 !text-gray-300 hover:!text-white !transition-colors'>
                            <Mail size={20} />
                            <span>saulo@ifce.edu.br</span>
                        </Link>
                        <Link href='tel:88999650480' className='!flex !items-center !space-x-3 !text-gray-300 hover:!text-white !transition-colors'>
                            <Phone size={20} />
                            <span>88 9965-0480</span>
                        </Link>
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
};