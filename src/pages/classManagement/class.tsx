import type { FC } from 'react';
import { Box } from '@mui/material';
import { PageLayout } from './../../components/layout/BigCardGray'; 
import type { ReactNode } from 'react';

import { Users, ListChecks, UserPlus, Eye, Plus, Edit } from 'lucide-react'; 

import createClassIcon from './assets/Create-Class.png';
import deleteClassIcon from './assets/Delete-Class.png';
import editClassIcon from './assets/Edit-Class.png';
import seeClassIcon from './assets/See-Class.png';

const ActionButton: FC<{ icon: ReactNode, label: string }> = ({ icon, label }) => (
    <button className='relative flex items-center justify-center bg-[#690808] p-4 rounded-lg 
                        font-semibold text-lg hover:bg-[rgb(170,0,0)] transition-colors
                        
                        w-full lg:w-150 
                        '
    >
        
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
            {icon}
        </div>
        
        <span>{label}</span>
    </button>
);

export const GerenciamentoTurmas: FC = () => {
    return (
        <Box 
            component='div' 
            className='flex flex-col items-center min-h-screen py-12 px-4'
        >
            <PageLayout 
                title='GERENCIAMENTO DE TURMAS' 
                icon={<Users size={50} />}
            >
                <div className='flex flex-col gap-6 mt-14 items-center'>
                    {/* Ícone Lucide (continua funcionando) */}
                    <ActionButton icon={<ListChecks size={32} strokeWidth={3} />} label='REALIZAR FREQUÊNCIA' />
                    <ActionButton icon={<UserPlus size={32} strokeWidth={3} />} label='ENTURMAR ALUNO' />

                    <ActionButton 
                        icon={<img src={seeClassIcon} alt='' className='w-8 h-8' />} 
                        label='VER TURMAS' 
                    />
                    <ActionButton 
                        icon={<img src={createClassIcon} alt='' className='w-12 h-8' />} 
                        label='CRIAR TURMA' 
                    />
                    <ActionButton 
                        icon={<img src={editClassIcon} alt='' className='w-12 h-8' />} 
                        label='EDITAR TURMA' 
                    />
                    <ActionButton 
                        icon={<img src={deleteClassIcon} alt='' className='w-12 h-8' />} 
                        label='EXCLUIR TURMA' 
                    />
                </div>
            </PageLayout>
        </Box>
    );
}