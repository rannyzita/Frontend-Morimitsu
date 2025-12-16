import { type FC, useEffect, useState } from 'react';
import { Box, Grid, Typography, Card } from '@mui/material';
import { PageLayout } from '../../components/layout/BigCard';
import { ClipboardList } from 'lucide-react';
import { RankingCard, type RankedStudent } from '../../components/Dashboard/Podio/rankingCard';
import { fetchRelatorioMetricas, fetchRelatorioRankingGeral } from '../../services/report/report';
import { useNavigate } from 'react-router-dom';
import type { RelatorioRankingGeral } from '../../services/report/types/types';
import { UserModal } from '../../components/Modal/User';

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

    const handleViewStudent = (studentId: string) => {
        const aluno = ranking.find(a => a.alunoId === studentId);

        if (!aluno) return;

        setSelectedStudent({
            id:(aluno.alunoId),
            name: aluno.nome,
            nameSocial: aluno.nome, 
            avatar: aluno.foto,
            role: 'ALUNO',
        });

        setIsUserModalOpen(true);
    };
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<{
        id: string;
        name: string;
        nameSocial: string;
        avatar: string;
        role: string;
    } | null>(null);

    const [ranking, setRanking] = useState<RelatorioRankingGeral[]>([]);

    useEffect(() => {
        const rawToken = localStorage.getItem('token');
        const token = rawToken ?? undefined;

        async function loadMetricas() {
            try {
                const data = await fetchRelatorioMetricas(token);
                setMetricas(data);
            } catch (err) {
                console.error('Erro ao carregar métricas:', err);
            }
        }

        async function loadRanking() {
            try {
                const data = await fetchRelatorioRankingGeral(token);
                setRanking(data);
            } catch (err) {
                console.error('Erro ao carregar ranking:', err);
            }
        }

        loadMetricas();
        loadRanking();
    }, []);

    const orderedRanking = [...ranking].sort(
        (a, b) => b.totalAulas - a.totalAulas
    );

    const podiumData = {
        first: orderedRanking[0]?.nome ?? '—',
        second: orderedRanking[1]?.nome ?? '—',
        third: orderedRanking[2]?.nome ?? '—',
    };

    const studentListData: RankedStudent[] = orderedRanking.map((aluno) => ({
        id: aluno.alunoId,
        name: aluno.nome,
        value: `${aluno.totalAulas} aulas`,
        avatarUrl: aluno.foto,
    }));

    const chartData = orderedRanking.map((aluno) => ({
        name: aluno.nome,
        value: aluno.totalAulas, 
    }));

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
                            chartData={chartData}
                            onViewStudent={handleViewStudent}
                        />
                    </Grid>
                </Grid>

                <UserModal
                    isOpen={isUserModalOpen}
                    onClose={() => setIsUserModalOpen(false)}
                    student={selectedStudent}
                />
            </PageLayout>
        </Box>
    );
};