import type { FC } from 'react';
import { Box } from '@mui/material';
import { PageLayout } from './../../components/layout/BigCardGray'; 

import { Users, ListChecks, UserPlus } from 'lucide-react'; 

import { Link } from 'react-router-dom';

import createClassIcon from './assets/Create-Class.png';
import deleteClassIcon from './assets/Delete-Class.png';
import editClassIcon from './assets/Edit-Class.png';
import seeClassIcon from './assets/See-Class.png';

import { ActionButton } from '../../components/Button/ActionButton';

export const GerenciamentoTurmas: FC = () => {
    return (
        <Box 
            component='div' 
            className='flex flex-col items-center justify-center h-full p-4'
        >
            <PageLayout 
                title='GERENCIAMENTO DE TURMAS' 
                icon={<Users size={50} />}
            >
                <div className='flex flex-col gap-6 mt-14 items-center'>

                    <Link to={'/gerenciamento-turmas/realizar-frequencia'} className='cursor-pointer'>
                        <ActionButton icon={<ListChecks size={32} strokeWidth={3} />} label='REALIZAR FREQUÊNCIA' />    
                    </Link>
                    
                    <Link to={'/gerenciamento-turmas/enturmar-aluno'} className='cursor-pointer'>
                        <ActionButton icon={<UserPlus size={32} strokeWidth={3} />} label='ENTURMAR ALUNO' />
                    </Link>

                    <Link to={'/gerenciamento-turmas/ver-turmas'} className='cursor-pointer'>
                        <ActionButton 
                            icon={<img src={seeClassIcon} alt='' className='w-8 h-8' />} 
                            label='VER TURMAS' 
                        />
                    </Link>

                    <Link to={'/gerenciamento-turmas/criar-turma'} className='cursor-pointer'>
                        <ActionButton 
                            icon={<img src={createClassIcon} alt='' className='w-12 h-8' />} 
                            label='CRIAR TURMA' 
                        />
                    </Link>

                    <Link to={'/gerenciamento-turmas/editar-turma'} className='cursor-pointer'>
                        <ActionButton 
                            icon={<img src={editClassIcon} alt='' className='w-12 h-8' />} 
                            label='EDITAR TURMA' 
                        />
                    </Link>

                    <Link to={'/gerenciamento-turmas/excluir-turma'} className='cursor-pointer'>
                        <ActionButton 
                            icon={<img src={deleteClassIcon} alt='' className='w-12 h-8' />} 
                            label='EXCLUIR TURMA' 
                        />
                    </Link>
                </div>
            </PageLayout>
        </Box>
    );
}