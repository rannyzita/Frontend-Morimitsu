import { type FC, useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

import { PageLayout } from '../../components/layout/BigCard';
import { Pagination } from '../../components/Pagination/Pagination';

import student1 from '../classManagement/options/assetsTest/IconBaby.png';
import student2 from '../classManagement/options/assetsTest/TurmaInfantil.png';
import student3 from '../classManagement/options/assetsTest/iconMista.png';

interface PresenceItem {
    id: number;
    name: string;
    avatar: string;
    value: number;
}

const initialPresence: PresenceItem[] = [
    { id: 1, name: 'Anna', avatar: student1, value: 1 },
    { id: 2, name: 'Anna', avatar: student2, value: 3 },
    { id: 3, name: 'Anna', avatar: student3, value: 19 },
    { id: 4, name: 'Anna', avatar: student1, value: 22 },
    { id: 5, name: 'Anna', avatar: student2, value: 24 },
    { id: 6, name: 'Anna', avatar: student3, value: 10 },
    { id: 7, name: 'Anna', avatar: student1, value: 200 },
    { id: 8, name: 'Anna', avatar: student2, value: 8 },
    { id: 9, name: 'Anna', avatar: student2, value: 8 },
    { id: 10, name: 'Anna', avatar: student2, value: 8 },
];

interface BarItemProps {
    avatar: string;
    name: string;
    value: number;
}

const PresenceBarItem: FC<BarItemProps> = ({ avatar, name, value }) => {
    const percentage = Math.min(value, 100);

    const MIN_WIDTH = 120;

    const barWidth =
        value >= 1
            ? `calc(${MIN_WIDTH}px + ${percentage}%)`
            : '0%';

    return (
        <div className='flex items-center w-full gap-4'>

            <div className='flex items-center gap-2 w-[50px]'>
                <span className='text-white font-semibold'>{name}</span>
            </div>

            <div className='relative w-full h-10 flex items-center'>

                <div className='absolute inset-0 flex'>
                    {[0, 25, 50, 75, 100].map((_, i) => (
                        <div
                            key={i}
                            className='border-l border-white h-full'
                            style={{
                                marginLeft: i === 0 ? '0%' : undefined,
                                width: i === 4 ? '0%' : '25%'
                            }}
                        />
                    ))}
                </div>

                <div className='relative h-[50px] bg-[#560000] rounded-r-md transition-all duration-300'
                    style={{
                        width: barWidth,
                        minWidth: value >= 1 ? `${MIN_WIDTH}px` : '0px',
                }}>

                    <img
                        src={avatar}
                        className='absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full'
                    />

                    <span className='absolute right-2 top-1/2 -translate-y-1/2 text-white font-bold'>
                        {value}
                    </span>                                             
                </div>
            </div>
        </div>
    );
};

export const AulasDosAlunos: FC = () => {
    const { id } = useParams<{ id: string }>();

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setPerPage] = useState(5);

    const totalPages = Math.ceil(initialPresence.length / itemsPerPage);
    const currentItems = initialPresence.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        const update = () => {
            if (window.innerWidth < 600) setPerPage(4);
            else setPerPage(5);

            if (window.innerHeight > 700) setPerPage(6);

            if (window.innerWidth < 900 && window.innerHeight > 800) setPerPage(8)
            
            if (window.innerWidth < 400 && window.innerHeight > 800) setPerPage(6)

            if (window.innerWidth < 400 && window.innerHeight < 700) setPerPage(3)

            if (window.innerWidth < 400 && window.innerHeight < 780) setPerPage(5)

            if (window.innerWidth < 800 && window.innerHeight > 1000) setPerPage(7)
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    return (
        <Box className='flex flex-col items-center justify-center h-full p-4 relative'>
            <PageLayout
                title='AULAS TOTAIS DOS ALUNOS'
                icon={null}
                className='flex flex-col h-full relative'
            >
                <div className='flex flex-col h-full md:h-[600px] gap-6 pt-4'>

                    <div className='bg-[#690808] w-[250px] mx-auto rounded-xl py-3 flex items-center justify-center gap-3 shadow-lg'>
                        <img src={student1} className='w-10 h-10' />
                        <p className='text-white text-[12px] md:text-[16px] font-bold text-lg'>TURMA INFANTIL</p>
                    </div>

                    <p className='text-white font-semibold text-lg md:mt-4 ml-2 text-[12px] md:text-[20px]'>
                        PRESENÇAS POR ALUNO:
                    </p>
                    
                    <div className='flex flex-col gap-8 mt-2 mb-20'>
                        {currentItems.map(item => (
                            <PresenceBarItem
                                key={item.id}
                                avatar={item.avatar}
                                name={item.name}
                                value={item.value}
                            />
                        ))}
                    </div>

                    <div className='absolute bottom-0 md:bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[650px]'>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            </PageLayout>
        </Box>
    );
};
