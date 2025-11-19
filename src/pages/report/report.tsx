import { type FC } from 'react';
import { Box, Grid, Typography, Card, Divider } from '@mui/material';
import { PageLayout } from '../../components/layout/BigCard'; 
import { Cake } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react'; 

interface StatisticProps {
    title: string;
    total: number;
}

const StatisticCard: FC<StatisticProps> = ({ title, total}) => (
    <Card className='!bg-[#690808] text-white p-4 flex flex-col items-center gap-1 !rounded-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.4)]'>
        <div className='flex items-center justify-start'>
            <Typography variant='body1' className='!font-bold tracking-wide lg:text-xl'>
                {title}
            </Typography>
        </div>

        <Card className='!bg-[#500000] text-white p-4 flex flex-col items-center rounded-xl  h-32 lg:h-25 w-full justify-between'>
            <Typography variant='h4' className='!font-extrabold lg:text-5xl'>
                {total}
            </Typography>
            <Typography variant='caption' className='text-white lg:text-sm mb-4'>
                TOTAIS
            </Typography>
        </Card>
    </Card>
);

const RankingCard: FC = () => (
    <Card 
        className='!bg-[#690808] text-white p-6 !rounded-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.4)]'
        sx={{
            height: { xs: 'auto', lg: '560px' }, 
        }}
    >
        <Typography variant='h4' className='!font-bold !text-[30px] tracking-wide text-center'>
            MAIOR PRESENÇA
        </Typography>

        <Divider className='!border-[#3E0404] !border-[2px] !my-3' />
        
        <Box className='flex flex-col lg:flex-row gap-6 mt-4 h-113'>
            <Box className='lg:w-1/2 flex flex-col items-center gap-4 bg-[#500000] border-3 border-[#3E0404] !rounded-[5px] shadow-[0_5px_15px_rgba(0,0,0,0.4)]'>
                <Typography variant='h5' className='!font-semibold text-white pt-4'>RANKING</Typography>
                <Trophy size={62} className='text-white' strokeWidth={1.5} />
                
                {/* PÓDIO */}
                <div className='w-full flex justify-center mt-6'>
                <div className='flex items-end text-white font-bold select-none'>

                    {/* 2º Lugar */}
                    <div className='bg-[#500000] w-24 h-20 flex flex-col items-center justify-center relative border-t-4 border-[#3E0404]'>
                    <span className='absolute top-1 text-[10px] tracking-wide'>JOÃO LUCAS</span>
                    <span className='text-xl mt-4'>2º</span>
                    </div>

                    {/* 1º Lugar */}
                    <div className='bg-[#500000] w-28 h-28 mx-2 flex flex-col items-center justify-center relative border-t-4 border-[#3E0404]'>
                    <span className='absolute top-1 text-[12px] tracking-wide'>ANA LAURA</span>
                    <span className='text-3xl mt-3'>1º</span>
                    </div>

                    {/* 3º Lugar */}
                    <div className='bg-[#500000] w-24 h-16 flex flex-col items-center justify-center relative border-t-4 border-[#3E0404]'>
                    <span className='absolute top-1 text-[10px] tracking-wide'>NICHOLAS ALVES</span>
                    <span className='text-xl mt-4'>3º</span>
                    </div>

                </div>
                </div>
                
                <Box className='flex flex-col gap-3 w-full mt-auto mb-4 px-3'>
                
                    <Divider className='!border-[#3E0404] !border-[2px]' />

                    <Typography className='!font-bold text-center'>ALUNOS</Typography>

                    {/* ITEM 1 */}
                    <div className='bg-[#690808] p-1 rounded-xl flex justify-between items-center  shadow-[0_5px_15px_rgba(0,0,0,0.4)]'>
                        <div className='flex items-center gap-1'>
                            <img src='/avatar1.png' className='w-4 h-4 rounded-full' />
                            <span className='font-bold text-[10px]'>ANA LAURA</span>
                        </div>
                        <button className='bg-[#3E0404] px-3 py-1 rounded-md text-[10px]'>Ver mais</button>
                    </div>

                    {/* ITEM 2 */}
                    <div className='bg-[#690808] p-1 rounded-xl flex justify-between items-center shadow-[0_5px_15px_rgba(0,0,0,0.4)]'>
                        <div className='flex items-center gap-1'>
                            <img src='/avatar2.png' className='w-4 h-4 rounded-full' />
                            <span className='font-bold text-[10px]'>JOÃO LUCAS</span>
                        </div>
                        <button className='bg-[#3E0404] px-3 py-1 rounded-md text-[10px]'>Ver mais</button>
                    </div>

                    {/* ITEM 3 */}
                    <div className='bg-[#690808] p-1 rounded-xl flex justify-between items-center shadow-[0_5px_15px_rgba(0,0,0,0.4)]'>
                        <div className='flex items-center gap-1'>
                            <img src='/avatar3.png' className='w-4 h-4 rounded-full' />
                            <span className='font-bold text-[10px]'>NICHOLAS ALVES</span>
                        </div>
                        <button className='bg-[#3E0404] px-3 py-1 rounded-md text-[10px]'>Ver mais</button>
                    </div>
                </Box>
            </Box>

            {/* GRÁFICO (Lado Direito) */}
            <Box className='lg:w-1/2 flex flex-col items-center mt-6 lg:mt-0 bg-[#500000] border-3 border-[#3E0404] !rounded-[5px] shadow-[0_5px_15px_rgba(0,0,0,0.4)]'>
                <Typography variant='h5' className='!font-semibold text-white pt-4'>GRÁFICO</Typography>
                <Box className='h-64 w-full mt-2 flex justify-around items-end p-2'>
                    {/* Barras de Exemplo */}
                    <div className='w-4 !bg-red-700 h-1/2 text-xs text-center' style={{ height: '70%' }}></div>
                    <div className='w-4 !bg-red-700 h-1/2 text-xs text-center' style={{ height: '90%' }}></div>
                    <div className='w-4 !bg-red-700 h-1/2 text-xs text-center' style={{ height: '50%' }}></div>
                </Box>
            </Box>
        </Box>
    </Card>
);

export const Report: FC = () => {
    return (
        <Box component='div' className='flex flex-col items-center justify-center h-full p-4'>
            <PageLayout backPath='/home' icon={<Cake size={36} className='lg:w-[50px] lg:h-[50px]' />} title='RELATÓRIO'>
                
                <Grid 
                    container 
                    spacing={6}     
                    className='mt-8 lg:pt-8'
                >
                    
                    <Grid item xs={12} lg={5}>
                        <Grid container spacing={12} rowSpacing={5}>
                            
                            <Grid item xs={6} sm={4} lg={6}> 
                                <StatisticCard title='TURMAS' total={4} />
                            </Grid>
                            <Grid item xs={6} sm={4} lg={6}>
                                <StatisticCard title='ALUNOS' total={220} />
                            </Grid>
                            <Grid item xs={6} sm={4} lg={6}> 
                                <StatisticCard title='PROFESSOR' total={2} />
                            </Grid>

                            <Grid item xs={6} sm={4} lg={6}>
                                <StatisticCard title='COORDENADOR' total={1} />
                            </Grid>
                            <Grid item xs={6} sm={4} lg={6}>
                                <StatisticCard title='USUÁRIOS' total={50} />
                            </Grid>
                            <Grid item xs={6} sm={4} lg={6}>
                                <StatisticCard title='AULAS' total={1200} />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} lg={7}>
                        <RankingCard />
                    </Grid>
                </Grid>
            </PageLayout>
        </Box>
    )
}