import { type FC, type ReactNode } from 'react';
import { Box } from '@mui/material';
import { PageLayout } from '../../../components/layout/BigCardGray'; 
import { Link } from 'react-router-dom';

// MUDANÇA 1: A importação do ActionButton foi REMOVIDA
// import { ActionButton } from '../../../components/Button/ActionButton'; 

import turmaBaby from './assetsTest/IconBaby.png';
import turmaInfantil from './assetsTest/TurmaInfantil.png';
import turmaMista from './assetsTest/iconMista.png';

import seeClassIcon from '../assets/See-Class.png'; 

const ClassButton: FC<{ icon: ReactNode, label: string, to: string }> = ({ icon, label, to }) => (
    <Link 
        to={to}
        className='flex items-center justify-between bg-[#690808] p-4 rounded-lg 
                    font-semibold text-lg hover:bg-[rgb(170,0,0)] transition-colors
                    w-full lg:w-150 shadow-[0_5px_15px_rgba(0,0,0,0.4)]'
    >
        <div className="flex items-center justify-center w-8 h-8">
            {icon}
        </div>
        
        <span className="text-center">
            {label}
        </span>
        
        <div className="w-8 h-8" /> 
    </Link>
);

const turmasDaPagina = [
    { id: 1, label: 'TURMA BABY', icon: turmaBaby },
    { id: 2, label: 'TURMA INFANTIL', icon: turmaInfantil },
    { id: 3, label: 'TURMA MISTA', icon: turmaMista },
];

export const VerTurmas: FC = () => {

    return (
        <Box 
            component='div' 
            className='flex flex-col items-center justify-center h-full p-4'
        >
            <PageLayout 
                title='VER TURMAS' 
                icon={<img src={seeClassIcon} alt='' className='w-8 h-8' />} 
            >
                <div className='flex flex-col h-full gap-6 items-center justify-center'>
                    
                    {turmasDaPagina.map(turma => (
                        <ClassButton
                            key={turma.id}
                            to={`/gerenciamento-turmas/ver/${turma.id}`}
                            label={turma.label}
                            icon={<img src={turma.icon} alt={turma.label} className='w-8 h-8'/>}
                        />
                    ))}
                </div>
            </PageLayout>
        </Box>
    );
}