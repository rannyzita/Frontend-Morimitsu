import { type FC, useEffect, useState } from 'react';
import { Box, Grid, Typography, Card } from '@mui/material';
import { PageLayout } from '../../components/layout/BigCard';
import { ClipboardList } from 'lucide-react';
import { RankingCard, type RankedStudent } from '../../components/Dashboard/Podio/rankingCard';
import { fetchRelatorioMetricas } from '../../services/report/report';
import { useNavigate } from 'react-router-dom';

interface StatisticProps {
    title: string;
    total: number;
    to?: string;
}

const StatisticCard: FC<StatisticProps> = ({ title, total, to }) => {
    const navigate = useNavigate();

    return (
        <Card
            onClick={() => to && navigate(to)}
            className='
                !bg-[#690808] text-white p-2 md:p-3 lg:p-4 
                flex flex-col items-center gap-1 
                !rounded-[10px] 
                shadow-[0_5px_15px_rgba(0,0,0,0.4)]
                cursor-pointer
                transition-transform hover:scale-[1.03]
                hover:shadow-[0_8px_20px_rgba(0,0,0,0.6)]
            '
        >
            <div className='flex items-center justify-center'>
                <Typography variant='body1' className='!font-bold tracking-wide !text-[10px] lg:!text-[16px]'>
                    {title}
                </Typography>
            </div>

            <Card className='!bg-[#500000] text-white p-2 flex flex-col items-center rounded-xl h-16 lg:h-24 w-full justify-center'>
                <Typography variant='h4' className='!font-extrabold !text-xl md:!text-3xl lg:!text-4xl'>
                    {total}
                </Typography>
                <Typography variant='caption' className='text-white text-xs lg:text-sm'>
                    TOTAIS
                </Typography>
            </Card>
        </Card>
    );
};

export const Report: FC = () => {

    const [metricas, setMetricas] = useState({
        totalAlunos: 0,
        totalProfessores: 0,
        totalCoordenadores: 0,
        totalTurmas: 0,
        totalUsuarios: 0,
        totalAulas: 0
    });

    useEffect(() => {
        const rawToken = localStorage.getItem('token');
        const token = rawToken ?? undefined;

        async function loadMetricas() {
            try {
                const data = await fetchRelatorioMetricas(token);
                setMetricas(data);
            } catch (err) {
                console.error('Erro ao carregar métricasss:', err);
            }
        }

        loadMetricas();
    }, []);

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
            <PageLayout backPath='/home' icon={<ClipboardList size={36} />} title='RELATÓRIO'>
                <Grid container spacing={4} className='!mt-2 md:!mt-2'>
                    
                    <Grid item xs={12} sm={12} lg={5}> 
                        <Grid container spacing={12} rowSpacing={5}>
                            
                            <Grid item xs={6} sm={4} lg={6}>
                                <StatisticCard title='TURMAS' total={metricas.totalTurmas} to='/gerenciamento-turmas/ver-turmas'/>
                            </Grid>

                            <Grid item xs={6} sm={4} lg={6}>
                                <StatisticCard title='ALUNOS' total={metricas.totalAlunos} to='/gerenciamento-usuarios/ver-usuarios'/>
                            </Grid>

                            <Grid item xs={6} sm={4} lg={6}>
                                <StatisticCard title='PROFESSOR' total={metricas.totalProfessores} to='/gerenciamento-usuarios/ver-usuarios'/>
                            </Grid>

                            <Grid item xs={6} sm={4} lg={6}>
                                <StatisticCard title='COORDENADOR' total={metricas.totalCoordenadores} to='/gerenciamento-usuarios/ver-usuarios'/>
                            </Grid>

                            <Grid item xs={6} sm={4} lg={6}>
                                <StatisticCard title='USUÁRIOS' total={metricas.totalUsuarios} to='/gerenciamento-usuarios/ver-usuarios'/>
                            </Grid>

                            <Grid item xs={6} sm={4} lg={6}>
                                <StatisticCard title='AULAS' total={metricas.totalAulas} />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} lg={7}>
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
    );
};