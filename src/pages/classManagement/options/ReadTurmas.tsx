// Em: src/pages/classManagement/VerTurmas.tsx

import { useState, type FC } from 'react';
import { Box } from '@mui/material';
import { PageLayout } from '../../../components/layout/BigCardGray'; 
import { Link } from 'react-router-dom';

// MUDANÇA 1: Importar o seu ActionButton
import { ActionButton } from '../../../components/Button/ActionButton';

// Importar os ícones
import turmaBaby from './assetsTest/IconBaby.png'
import turmaInfantil from './assetsTest/TurmaInfantil.png'
import turmaMista from './assetsTest/iconMista.png' // Corrigi o caminho/nome

import SeeClass from '../assets/See-Class.png'
// MUDANÇA 3: Definição do 'ClassButton' REMOVIDA

// Mock data (sem mudança)
const turmasDaPagina = [
    { id: 1, label: 'TURMA BABY', icon: turmaBaby },
    { id: 2, label: 'TURMA INFANTIL', icon: turmaInfantil },
    { id: 3, label: 'TURMA MISTA', icon: turmaMista },
];

export const VerTurmas: FC = () => {
    
    // Lógica da paginação (sem mudança)
    const [currentPage, setCurrentPage] = useState(2); 
    const totalPages = 10; 
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <Box 
            component='div' 
            className='flex flex-col items-center justify-center h-full p-4'
        >
            <PageLayout 
                title='VER TURMAS' 
                icon={<img src={SeeClass} alt='' className='w-8 h-8' />}
            >
                <div className='flex flex-col gap-6 mt-14 items-center'>
                    
                    {/* MUDANÇA 4: Usando <Link> + <ActionButton> */}
                    {turmasDaPagina.map(turma => (
                        <Link 
                            key={turma.id}
                            to={`/gerenciamento-turmas/ver/${turma.id}`}
                            // O Link precisa ter a mesma largura do botão
                            className='w-full lg:w-96' 
                        >
                            <ActionButton
                                label={turma.label}
                                icon={<img src={turma.icon} alt={turma.label} className='w-8 h-8'/>}
                            />
                        </Link>
                    ))}
                </div>

            </PageLayout>
        </Box>
    );
}