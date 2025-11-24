import { type FC } from 'react';
import { Box, Typography, Card, Divider } from '@mui/material';
import { Trophy } from 'lucide-react'; 
import { RankingBarChart } from '../Grafico/RankingBar';

export interface RankedStudent {
    id: string | number;
    name: string;
    value?: string;
    avatarUrl?: string;
}

interface PodiumData {
    first: string;
    second: string;
    third: string;
}

export interface RankingCardProps {
    title: string;
    rankingPodium: PodiumData;
    rankedStudents: RankedStudent[];
    graphTitle: string;
}

const chartData = [
        { name: 'NICHOLAS ALVES', value: 100 },
        { name: 'JOÃO LUCAS', value: 200 },
        { name: 'ANA LAURA', value: 300 },
];

export const RankingCard: FC<RankingCardProps> = ({ 
    title, 
    rankingPodium, 
    rankedStudents, 
    graphTitle 
}) => (
    

    <Card 
        className='!bg-[#690808] text-white p-6 !rounded-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.4)]'
        sx={{
            height: { xs: 'auto', lg: '560px' }, 
        }}
    >
        {/* TÍTULO PRINCIPAL (Prop) */}
        <Typography variant='h4' className='!font-bold !text-[30px] tracking-wide text-center'>
            {title}
        </Typography>

        <Divider className='!border-[#3E0404] !border-[2px] !my-3' />
        
        <Box className='flex flex-col lg:flex-row gap-6 mt-4 h-113'>
            <Box className='lg:w-1/2 flex flex-col items-center gap-4 bg-[#500000] border-3 border-[#3E0404] !rounded-[5px] shadow-[0_5px_15px_rgba(0,0,0,0.4)]'>
                <Typography variant='h6' className='!font-semibold text-white pt-4'>RANKING</Typography>
                <Trophy size={64} className='text-white' strokeWidth={1.5} />
                
                {/* PÓDIO (Props) */}
                <div className='w-full flex justify-center mt-6'>
                    <div className='flex items-end text-white font-bold select-none'>

                        {/* 2º Lugar */}
                        <div className='bg-[#690808] w-18 h-16 flex flex-col items-center justify-center relative border-t-6 border-[#3E0404]'>
                            <span className='absolute -top-8 text-[9px] tracking-wide'>{rankingPodium.second}</span>
                            <span className='text-xl'>2º</span>
                        </div>

                        {/* 1º Lugar (MAIOR) */}
                        <div className='bg-[#690808] w-18 h-20 flex flex-col items-center justify-center relative border-t-6 border-[#3E0404]'>
                            <span className='absolute -top-8 text-[10px] tracking-wide'>{rankingPodium.first}</span>
                            <span className='text-3xl'>1º</span>
                        </div>

                        {/* 3º Lugar */}
                        <div className='bg-[#690808] w-18 h-14 flex flex-col items-center justify-center relative border-t-6 border-[#3E0404]'>
                            <span className='absolute -top-8 text-[8px] tracking-wide text-center'>{rankingPodium.third}</span>
                            <span className='text-xl'>3º</span>
                        </div>

                    </div>
                </div>
            
                <Box className='flex flex-col gap-3 w-full mt-auto mb-4 px-3'>
                
                    <Divider className='!border-[#3E0404] !border-[2px]' />

                    <Typography className='!font-bold text-center'>ALUNOS</Typography>

                    {/* LISTA DE ALUNOS (Props - Usando map) */}
                    {rankedStudents.map((student) => (
                        <div 
                            key={student.id} 
                            className='bg-[#690808] p-1 rounded-xl flex justify-between items-center  shadow-[0_5px_15px_rgba(0,0,0,0.4)]'
                        >
                            <div className='flex items-center gap-1'>
                                <img src={student.avatarUrl} className='w-4 h-4 rounded-full' alt={student.name} />
                                <span className='font-bold text-[10px]'>{student.name} {student.value}</span>
                            </div>
                            <button className='bg-[#3E0404] px-3 py-1 rounded-md text-[10px]'>Ver mais</button>
                        </div>
                    ))}
                </Box>
            </Box>

            {/* GRÁFICO (Lado Direito) */}
            <Box className='lg:w-1/2 flex flex-col items-center mt-6 lg:mt-0 bg-[#500000] border-3 border-[#3E0404] !rounded-[5px] shadow-[0_5px_15px_rgba(0,0,0,0.4)]'>
                <RankingBarChart data={chartData} chartTitle='GRÁFICO' />
            </Box>
        </Box>
    </Card>
);