import React from 'react';
import { Box, Grid, Typography, Link } from '@mui/material';
import { Mail, Phone } from 'lucide-react';
import { Instagram } from '@mui/icons-material';

export const Bottombar: React.FC = () => {
    return (
        <Box
            component='footer'
            className='bg-[#690808] py-10 px-8 md:px-24'
            sx={{
                '@media (min-width: 768px) and (max-width: 1024px)': {
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                },
            }}
        >
            <Grid
                container
                spacing={{ xs: 6, md: 8 }}
                sx={{
                '@media (min-width: 768px) and (max-width: 1024px)': {
                    justifyContent: 'center',
                    textAlign: 'center',
                    },
                }}
            >
                {/* 1 - ABOUT US */}
                <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                        '@media (min-width: 768px) and (max-width: 1024px)': {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        },
                    }}
                >
                    <Typography
                        variant='h5'
                        className='!font-bold !mb-4 tracking-wide'
                        sx={{
                        fontSize: {
                                xs: '2.50rem',
                                md: '3.50rem', 
                            },
                        }}
                    >
                        <Box component='span' sx={{ color: 'white' }}>
                            ABOUT
                        </Box>{' '}
                        <Box component='span' sx={{ color: '#3E0404' }}>
                            US
                        </Box>
                    </Typography>

                    <Typography
                        variant='body2'
                        className='leading-relaxed text-gray-300 max-w-xs md:max-w-md'
                        sx={{
                            '@media (min-width: 768px) and (max-width: 1024px)': {
                                textAlign: 'center',
                                fontSize: '1.1rem', 
                            },
                        }}
                    >
                        Somos a Morimitsu Tradição Jiu-jitsu. Honramos o ensino da arte marcial,
                        com foco na disciplina e respeito, para forjar o caráter e a técnica de
                        cada aluno nos desafios dentro e fora do tatame.
                    </Typography>
                </Grid>

                {/* 2 - OUR LOCATIONS */}
            <Grid
                item
                xs={12}
                md={4}
                sx={{
                    '@media (min-width: 768px) and (max-width: 1024px)': {
                        display: 'flex',
                        flexDirection: 'column',
                    },
                }}
            >
            {/* TÍTULO - AUMENTO NO MD (TABLET/IPAD) */}
            <Typography
                variant='h5'
                className='!font-bold !mb-4 tracking-wide'
                sx={{
                    fontSize: {
                        xs: '2.50rem',
                        md: '3.50rem', 
                    },
                }}
            >
                <Box component='span' sx={{ color: 'white' }}>
                    OUR
                </Box>{' '}
                <Box component='span' sx={{ color: '#3E0404' }}>
                    LOCATIONS
                </Box>
            </Typography>

            {/* LISTA DE LOCALIDADES - AUMENTO NO MD (TABLET/IPAD) */}
            <ul
                className='space-y-2 list-disc pl-5 text-gray-300'
                style={{
                    listStyle: 'none',
                    padding: 0,
                    // Estilo inline para aumentar o texto da lista no iPad
                    fontSize: window.innerWidth >= 768 && window.innerWidth <= 1024 ? '1.1rem' : undefined,
                }}
            >
                <li>- Juazeiro do Norte, Ceará</li>
                <li>- Crato, Ceará</li>
                <li>- Aquiraz, Ceará</li>
                <li>- Cedro, Ceará</li>
            </ul>
            </Grid>

            {/* 3 - CONTACT US */}
            <Grid
                item
                xs={12}
                md={4}
                sx={{
                    '@media (min-width: 768px) and (max-width: 1024px)': {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    },
                }}
            >
            
            <Typography
                variant='h5'
                className='!font-bold !mb-4 tracking-wide'
                sx={{
                fontSize: {
                    xs: '2.50rem',
                    md: '3.50rem', 
                },
                textAlign: {
                    lg: 'center'
                }
                }}
            >
                <Box component='span' sx={{ color: 'white' }}>
                    CONTACT
                </Box>{' '}
                <Box component='span' sx={{ color: '#3E0404' }}>
                    US
                </Box>
            </Typography>

                <Grid
                    container
                    spacing={{ xs: 2, md: 4 }}
                >
                    
                    <Grid item xs={12} md={6}>
                        <div className='flex flex-col gap-4 md:items-center '>
                            <Link
                                href='https://www.instagram.com/morimitsu_kmrbjj_cedro'
                                target='_blank'
                                rel='noopener'
                                className='!flex !items-center !space-x-3 !text-gray-300 hover:!text-white !transition-colors'
                                sx={{
                                    // Aumento do tamanho do texto no iPad/Tablet
                                    fontSize: { md: '2.1rem' },
                                }}
                            >
                                <Instagram fontSize='medium' sx={{ color: 'white' }} />
                                <span>@morimitsu_kmrbjj_cedro</span>
                            </Link>

                            <Link
                                href='https://www.instagram.com/saulobezerrabjj'
                                target='_blank'
                                rel='noopener'
                                className='!flex !items-center !space-x-3 !text-gray-300 hover:!text-white !transition-colors'
                                sx={{
                                    // Aumento do tamanho do texto no iPad/Tablet
                                    fontSize: { md: '2.1rem' },
                                }}
                            >
                                <Instagram fontSize='medium' sx={{ color: 'white' }} />
                                <span>@saulobezerrabjj</span>
                            </Link>
                        </div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <div className='flex flex-col gap-4 md:items-center'>
                            <Link
                            href='mailto:saulo@ifce.edu.br'
                            className='!flex !items-center !space-x-3 !text-gray-300 hover:!text-white !transition-colors'
                            sx={{
                                // Aumento do tamanho do texto no iPad/Tablet
                                fontSize: { md: '2.1rem' },
                            }}
                            >
                            <Mail size={20} color='white' />
                                <span>saulo@ifce.edu.br</span>
                            </Link>

                            <Link
                            href='tel:88999650480'
                            className='!flex !items-center !space-x-3 !text-gray-300 hover:!text-white !transition-colors'
                            sx={{
                                // Aumento do tamanho do texto no iPad/Tablet
                                fontSize: { md: '2.1rem' },
                            }}
                            >
                            <Phone size={20} color='white' />
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