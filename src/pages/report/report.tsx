import { type FC } from 'react';
import { Box, Grid, Typography, Card, Divider } from '@mui/material';
import { PageLayout } from '../../components/layout/BigCard'; 
import { ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react'; 
import { RankingCard, type RankedStudent } from '../../components/Dashboard/Podio/rankingCard';

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

export const Report: FC = () => {

    const podiumData = {
        first: 'ANA LAURA',
        second: 'JOÃO LUCAS',
        third: 'NICHOLAS ALVES',
    };

    const studentListData: RankedStudent[] = [
        { id: 1, name: 'ANA LAURA', avatarUrl: '/avatar1.png' },
        { id: 2, name: 'JOÃO LUCAS', avatarUrl: '/avatar2.png' },
        { id: 3, name: 'NICHOLAS ALVES', avatarUrl: '/avatar3.png' },
    ];

    return (
        <Box component='div' className='flex flex-col items-center justify-center h-full p-4'>
            <PageLayout backPath='/home' icon={<ClipboardList size={36} className='lg:w-[50px] lg:h-[50px]' />} title='RELATÓRIO'>
                
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
                        <RankingCard
                            title='MAIOR PRESENÇA'
                            rankingPodium={podiumData}
                            rankedStudents={studentListData}
                            graphTitle='GRÁFICO'
                        />
                    </Grid>
                </Grid>
            </PageLayout>
        </Box>
    )
}