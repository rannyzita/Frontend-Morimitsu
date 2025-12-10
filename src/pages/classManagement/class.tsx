import type { FC } from 'react';
import { Box } from '@mui/material';
import { PageLayout } from '../../components/layout/BigCard';

import { Users, ListChecks, UserPlus, UserMinus } from 'lucide-react';

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
                icon={<Users size={36} className='lg:w-[50px] lg:h-[50px]' />}
            >
                <div className='flex flex-col pb-18 lg:pb-0 gap-6 mt-10 lg:mt-14 items-center'>

                    <Link
                        to={'/gerenciamento-turmas/frequencia'}
                        className='w-full max-w-sm lg:max-w-none lg:w-auto'
                    >
                        <ActionButton
                            icon={<ListChecks size={24} strokeWidth={3} className='lg:w-8 lg:h-8' />}
                            label='REALIZAR FREQUÊNCIA'
                        />
                    </Link>

                    <Link
                        to={'/gerenciamento-turmas/enturmar-aluno'}
                        className='w-full max-w-sm lg:max-w-none lg:w-auto'
                    >
                        <ActionButton
                            icon={<UserPlus size={24} strokeWidth={3} className='lg:w-8 lg:h-8' />}
                            label='ENTURMAR ALUNO'
                        />
                    </Link>

                    <Link
                        to={'/gerenciamento-turmas/desenturmar-aluno'}
                        className='w-full max-w-sm lg:max-w-none lg:w-auto'
                    >
                        <ActionButton
                            icon={<UserMinus size={24} strokeWidth={3} className='lg:w-8 lg:h-8' />}
                            label='DESENTURMAR ALUNO'
                        />
                    </Link>

                    <Link
                        to={'/gerenciamento-turmas/ver-turmas'}
                        className='w-full max-w-sm lg:max-w-none lg:w-auto'
                    >
                        <ActionButton
                            icon={<img src={seeClassIcon} alt='' className='w-6 h-6 lg:w-8 lg:h-8' />}
                            label='VER TURMAS'
                        />
                    </Link>

                    <Link
                        to={'/gerenciamento-turmas/criar-turma'}
                        className='w-full max-w-sm lg:max-w-none lg:w-auto'
                    >
                        <ActionButton
                            icon={<img src={createClassIcon} alt='' className='w-6 h-6 lg:w-12 lg:h-8' />}
                            label='CRIAR TURMA'
                        />
                    </Link>

                    <Link
                        to={'/gerenciamento-turmas/editar-turma'}
                        className='w-full max-w-sm lg:max-w-none lg:w-auto'
                    >
                        <ActionButton
                            icon={<img src={editClassIcon} alt='' className='w-6 h-6 lg:w-12 lg:h-8' />}
                            label='EDITAR TURMA'
                        />
                    </Link>

                    <Link
                        to={'/gerenciamento-turmas/deletar-turma'}
                        className='w-full max-w-sm lg:max-w-none lg:w-auto'
                    >
                        <ActionButton
                            icon={<img src={deleteClassIcon} alt='' className='w-6 h-6 lg:w-12 lg:h-8' />}
                            label='EXCLUIR TURMA'
                        />
                    </Link>
                </div>
            </PageLayout>
        </Box>
    );
}