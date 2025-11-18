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

// Cartão de Estatística (Ex: Turmas, Alunos)
const StatisticCard: FC<StatisticProps> = ({ title, total}) => (
    <Card className='bg-[#3E0404] text-white p-4 flex flex-col items-center gap-1 rounded-xl shadow-lg h-32 lg:h-40 mt-4'>
        <div className='flex items-center justify-start gap-2'>
            <Typography variant='body1' className='!font-bold tracking-wide lg:text-xl'>
                {title}
            </Typography>
        </div>
        <Divider className='w-full !my-1 bg-white/50' />
        <Typography variant='h4' className='!font-extrabold lg:text-5xl'>
            {total}
        </Typography>
        <Typography variant='caption' className='text-gray-300 lg:text-sm'>
            TOTAIS
        </Typography>
    </Card>
);

// Cartão de Ranking (Para simular a estrutura do cartão maior)
const RankingCard: FC = () => (
    <Card 
        className='bg-[#3E0404] text-white p-6 rounded-xl shadow-lg'
        sx={{
            height: { xs: 'auto', lg: '500px' }, 
        }}
    >
        <Typography variant='h5' className='!font-bold !text-xl tracking-wide text-center'>
            MAIOR PRESENÇA
        </Typography>
        <Divider className='w-full !my-3 bg-white/50' />
        
        {/* Simulação do Layout de Ranking e Gráfico */}
        <Box className='flex flex-col lg:flex-row gap-6 mt-4 h-full'>
            
            {/* RANKING (Lado Esquerdo) */}
            <Box className='lg:w-1/2 flex flex-col items-center gap-4'>
                <Typography variant='h6' className='!font-semibold text-white/80'>RANKING</Typography>
                <Trophy size={48} className='text-yellow-400' />
                <Typography className='text-xl'>JOÃO LUCAS</Typography>
                
                {/* Alunos de Exemplo */}
                <Box className='flex flex-col gap-2 w-full mt-4'>
                    <Typography className='!font-bold'>ALUNOS</Typography>
                    <div className='bg-red-900 p-2 rounded text-sm flex justify-between'>
                        <span>ANA LAURA</span><span>10x</span>
                    </div>
                    <div className='bg-red-900 p-2 rounded text-sm flex justify-between'>
                        <span>JOÃO LUCAS</span><span>9x</span>
                    </div>
                </Box>
            </Box>

            {/* GRÁFICO (Lado Direito) */}
            <Box className='lg:w-1/2 flex flex-col items-center mt-6 lg:mt-0'>
                <Typography variant='h6' className='!font-semibold text-white/80'>GRÁFICO</Typography>
                <Box className='h-64 w-full bg-red-900 mt-2 flex justify-around items-end p-2'>
                    {/* Barras de Exemplo */}
                    <div className='w-4 bg-red-700 h-1/2 text-xs text-center' style={{ height: '70%' }}></div>
                    <div className='w-4 bg-red-700 h-1/2 text-xs text-center' style={{ height: '90%' }}></div>
                    <div className='w-4 bg-red-700 h-1/2 text-xs text-center' style={{ height: '50%' }}></div>
                </Box>
            </Box>
        </Box>
    </Card>
);


// --- Componente Principal ---

export const Report: FC = () => {
    // Note: Mantive o nome Birthday, mas o conteúdo é o dashboard de Relatório
    return (
        <Box component='div' className='flex flex-col items-center justify-center h-full p-4'>
            <PageLayout backPath='/home' icon={<Cake size={36} className='lg:w-[50px] lg:h-[50px]' />} title='RELATÓRIO'>
                
                <Grid 
                    container 
                    spacing={4} 
                    className='mt-4 lg:mt-10'
                >
                    {/* COLUNA DE ESTATÍSTICAS (Ocupa 8 de 12 no Desktop, 12 de 12 no Mobile) */}
                    <Grid item xs={12} lg={8}>
                        <Grid container spacing={3}>
                            {/* LINHA 1 DE ESTATÍSTICAS */}
                            <Grid item xs={6} sm={4}> 
                                <StatisticCard title='TURMAS' total={4} />
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <StatisticCard title='ALUNOS' total={220} />
                            </Grid>
                            <Grid item xs={6} sm={4}> 
                                {/* Ocupa a terceira coluna no SM/LG, mas quebra para baixo no XS */}
                                <StatisticCard title='PROFESSOR' total={2} />
                            </Grid>

                            {/* LINHA 2 DE ESTATÍSTICAS */}
                            <Grid item xs={6} sm={4}>
                                <StatisticCard title='COORDENADOR' total={1} />
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <StatisticCard title='USUÁRIOS' total={50} />
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <StatisticCard title='AULAS' total={1200} />
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* COLUNA DE RANKING/GRÁFICO (Ocupa 4 de 12 no Desktop, 12 de 12 no Mobile) */}
                    <Grid item xs={12} lg={4}>
                        <RankingCard />
                    </Grid>
                </Grid>
            </PageLayout>
        </Box>
    )
}