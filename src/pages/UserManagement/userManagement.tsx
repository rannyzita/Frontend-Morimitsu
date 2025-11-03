import type { FC } from 'react';
import { Box } from '@mui/material';
import { PageLayout } from '../../components/layout/BigCard';

import { Users, UserPlus, UserPen, UserMinus } from 'lucide-react';

import { Link } from 'react-router-dom';

import { ActionButton } from '../../components/Button/ActionButton';

export const GerenciamentoUsuarios: FC = () => {
    return (
        <Box
            component='div'
            className='flex flex-col items-center justify-center h-full p-4'
        >
            <PageLayout
                title={'GERENCIAMENTO\nDE\nUSUÁRIOS'}
                icon={<Users size={36} className='lg:w-[36px] lg:h-[36px]' />}
            >
                <div className='flex flex-col pb-18 lg:pb-0 gap-6 mt-10 lg:mt-32 lg:h-[60hv] lg:justify-center items-center'>

                    <Link
                        to={'/gerenciamento-usuarios/ver-usuarios'}
                        className='w-full max-w-sm lg:max-w-none lg:w-auto'
                    >
                        <ActionButton
                            icon={<Users size={24} strokeWidth={2} className='lg:w-8 lg:h-8' />}
                            label='VER USUÁRIO'
                        />
                    </Link>

                    <Link
                        to={'/gerenciamento-usuarios/criar-usuario'}
                        className='w-full max-w-sm lg:max-w-none lg:w-auto'
                    >
                        <ActionButton
                            icon={<UserPlus size={24} strokeWidth={2} className='lg:w-8 lg:h-8' />}
                            label='CRIAR USUÁRIO'
                        />
                    </Link>

                    <Link
                        to={'/gerenciamento-usuarios/editar-usuario'}
                        className='w-full max-w-sm lg:max-w-none lg:w-auto'
                    >
                        <ActionButton
                            icon={<UserPen size={24} strokeWidth={2} className='lg:w-8 lg:h-8' />}
                            label='EDITAR USUÁRIO'
                        />
                    </Link>

                    <Link
                        to={'/gerenciamento-usuarios/deletar-usuario'}
                        className='w-full max-w-sm lg:max-w-none lg:w-auto'
                    >
                        <ActionButton
                            icon={<UserMinus size={24} strokeWidth={2} className='lg:w-8 lg:h-8' />}
                            label='EXCLUIR USUÁRIO'
                        />
                    </Link>
                </div>
            </PageLayout>
        </Box>
    );
}