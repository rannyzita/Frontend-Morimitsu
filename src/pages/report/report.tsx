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
            <Box className='lg:w-1/2 flex flex-col items-center gap-4 bg-[#500000] border-3 border-[#3E0404] !rounded-[5px]'>
                <Typography variant='h5' className='!font-semibold text-white pt-4'>RANKING</Typography>
                <Trophy size={48} className='text-white' />
                <Typography className='text-xl'>JOÃO LUCAS</Typography>
                
                <Box className='flex flex-col gap-2 w-full mt-4 border-2 border-[#3E0404]'>
                    <Typography className='!font-bold text-center pt-4'>ALUNOS</Typography>
                    <div className='bg-red-900 p-2 rounded text-sm flex justify-between'>
                        <span>ANA LAURA</span><span>10x</span>
                    </div>
                    <div className='bg-red-900 p-2 rounded text-sm flex justify-between'>
                        <span>JOÃO LUCAS</span><span>9x</span>
                    </div>
                </Box>
            </Box>

            {/* GRÁFICO (Lado Direito) */}
            <Box className='lg:w-1/2 flex flex-col items-center mt-6 lg:mt-0 bg-[#500000] border-3 border-[#3E0404] !rounded-[5px]'>
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