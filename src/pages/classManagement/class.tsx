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
                icon={<Users size={36} className='lg:w-[50px] lg:h-[50px]' />}
            >
                <div className='flex flex-col pb-18 lg:pb-0 gap-6 mt-10 lg:mt-14 items-center'>

                    <Link
                        to={'/gerenciamento-turmas/realizar-frequencia'}
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

                    {/* Botão 3: VER TURMAS */}
                    <Link
                        to={'/gerenciamento-turmas/ver-turmas'}
                        className='w-full max-w-sm lg:max-w-none lg:w-auto'
                    >
                        <ActionButton
                            icon={<img src={seeClassIcon} alt='' className='w-6 h-6 lg:w-8 lg:h-8' />}
                            label='VER TURMAS'
                        />
                    </Link>

                    {/* Botão 4: CRIAR TURMA */}
                    <Link
                        to={'/gerenciamento-turmas/criar-turma'}
                        className='w-full max-w-sm lg:max-w-none lg:w-auto'
                    >
                        <ActionButton
                            icon={<img src={createClassIcon} alt='' className='w-6 h-6 lg:w-12 lg:h-8' />}
                            label='CRIAR TURMA'
                        />
                    </Link>

                    {/* Botão 5: EDITAR TURMA */}
                    <Link
                        to={'/gerenciamento-turmas/editar-turma'}
                        className='w-full max-w-sm lg:max-w-none lg:w-auto'
                    >
                        <ActionButton
                            icon={<img src={editClassIcon} alt='' className='w-6 h-6 lg:w-12 lg:h-8' />}
                            label='EDITAR TURMA'
                        />
                    </Link>

                    {/* Botão 6: EXCLUIR TURMA */}
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