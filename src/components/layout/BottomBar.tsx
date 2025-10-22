import React from 'react';
import { Box, Grid, Typography, Link } from '@mui/material';
import { Mail, Phone } from 'lucide-react';
import { Instagram } from '@mui/icons-material';

export const Bottombar: React.FC = () => {
    return (
        <Box
            component='footer'
            className='bg-[#690808] py-10 px-8 md:px-24'
        >
            <Grid container spacing={{ xs: 6, md: 8 }}>
                
                {/* 1 - ABOUT US (Sem alterações estruturais) */}
                <Grid item xs={12} md={4}>
                    <Typography variant='h5' className='!font-bold !mb-4 tracking-wide'>
                        <Box component='span' sx={{ color: 'white' }}>ABOUT</Box>{' '}
                        <Box component='span' sx={{ color: '#3E0404' }}>US</Box>
                    </Typography>
                    <Typography variant='body2' className='leading-relaxed text-gray-300 max-w-xs'>
                        Somos a Morimitsu Tradição Jiu-jitsu. Honramos o ensino da arte marcial, com foco na disciplina e respeito, para forjar o caráter e a técnica de cada aluno nos desafios dentro e fora do tatame.
                    </Typography>
                </Grid>

                {/* 2 - OUR LOCATIONS (Alinhamento corrigido) */}
                <Grid item xs={12} md={4}>
                    {/* Alinhamento: Padrão esquerda, Centralizado no MD */}
                    <Typography variant='h5' className='!font-bold !mb-4 tracking-wide md:text-center'>
                        <Box component='span' sx={{ color: 'white' }}>OUR</Box>{' '}
                        <Box component='span' sx={{ color: '#3E0404' }}>LOCATIONS</Box>
                    </Typography>
        
                    {/* Alinhamento: Padrão esquerda, Centralizado no MD */}
                    <div className='flex md:justify-center'> 
                        <ul className='space-y-2 list-disc pl-5 text-gray-300'>
                            <li>Juazeiro do Norte, Ceará</li>
                            <li>Crato, Ceará</li>
                            <li>Aquiraz, Ceará</li>
                            <li>Cedro, Ceará</li>
                        </ul>
                    </div>
                </Grid>
                
                {/* 3 - CONTACT US */}
                <Grid item xs={12} md={4}>
                    
                    {/* Alinhamento: Padrão esquerda, Centralizado no MD */}
                    <Typography variant='h5' className='!font-bold !mb-4 tracking-wide md:text-center'>
                        <Box component='span' sx={{ color: 'white' }}>CONTACT</Box>{' '}
                        <Box component='span' sx={{ color: '#3E0404' }}>US</Box>
                    </Typography>

                    {/* USANDO O GRID DO MUI: xs=12 faz com que fiquem UM ABAIXO DO OUTRO no mobile.
                        md=6 faz com que fiquem LADO A LADO no desktop. */}
                    <Grid container spacing={{ xs: 2, md: 4 }} className='md:justify-center'>

                        {/* BLOCO 1: Instagram (xs=12 para vertical no mobile; md=6 para 2 colunas no desktop) */}
                        <Grid item xs={12} md={6}> 
                            <div className='flex flex-col gap-4'>
                                <Link href='https://www.instagram.com/morimitsu_kmrbjj_cedro' target='_blank' rel='noopener' className='!flex !items-center !space-x-3 !text-gray-300 hover:!text-white !transition-colors'>
                                    {/* COR RIGOROSAMENTE BRANCA para mobile (como na imagem) */}
                                    <Instagram fontSize='medium' sx={{color: 'white'}}></Instagram>
                                    <span>@morimitsu_kmrbjj_cedro</span>
                                </Link>
                                <Link href='https://www.instagram.com/saulobezerrabjj' target='_blank' rel='noopener' className='!flex !items-center !space-x-3 !text-gray-300 hover:!text-white !transition-colors'>
                                    {/* COR RIGOROSAMENTE BRANCA para mobile */}
                                    <Instagram fontSize='medium' sx={{color: 'white'}}></Instagram>
                                    <span>@saulobezerrabjj</span>
                                </Link>
                            </div>
                        </Grid>

                        {/* BLOCO 2: Email e Telefone (xs=12 para vertical no mobile; md=6 para 2 colunas no desktop) */}
                        <Grid item xs={12} md={6}>
                            <div className='flex flex-col gap-4'>
                                <Link href='mailto:saulo@ifce.edu.br' className='!flex !items-center !space-x-3 !text-gray-300 hover:!text-white !transition-colors'>
                                    {/* CORRIGIDO: Cor do ícone Mail para branco */}
                                    <Mail size={20} color='white'/>
                                    <span>saulo@ifce.edu.br</span>
                                </Link>
                                <Link href='tel:88999650480' className='!flex !items-center !space-x-3 !text-gray-300 hover:!text-white !transition-colors'>
                                    {/* CORRIGIDO: Cor do ícone Phone para branco */}
                                    <Phone size={20} color='white'/>
                                    <span>88 9965-0480</span>
                                </Link>
                            </div>
                        </Grid>
                    </Grid> 
                </Grid>
            </Grid>
        </Box>
    );
};