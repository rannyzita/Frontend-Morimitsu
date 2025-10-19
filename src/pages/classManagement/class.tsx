import type { FC } from 'react';
import { Box } from '@mui/material';
import { PageLayout } from './../../components/layout/BigCardGray'; 
import type { ReactNode } from 'react';

import { Users, ListChecks, UserPlus, Eye, Plus, Edit } from 'lucide-react'; 

// Crie seus botões (ou deixe-os aqui)
const ActionButton: FC<{ icon: ReactNode, label: string }> = ({ icon, label }) => (
    <button className='flex items-center justify-center gap-4 bg-[#880000] p-4 rounded-lg 
                        font-semibold text-lg hover:bg-[#a00] transition-colors
                        border-4 border-[#3E0404]'>
        {icon}
        <span>{label}</span>
    </button>
);


export const GerenciamentoTurmas: FC = () => {
    return (
        <Box 
            component='div' 
            className='flex justify-center items-center min-h-screen p-4'
        >
        
            {/* 2. O Layout reutilizável */}
            <PageLayout 
                title='GERENCIAMENTO DE TURMAS' 
                icon={<Users size={28} />}
                className='max-w-2xl' 
            >
                {/* 3. O conteúdo (children) da sua página */}
                <div className='flex flex-col gap-4'>
                    <ActionButton icon={<ListChecks size={20} />} label='REALIZAR FREQUÊNCIA' />
                    <ActionButton icon={<UserPlus size={20} />} label='ADICIONAR ALUNO' />
                    <ActionButton icon={<Eye size={20} />} label='VER TURMAS' />
                    <ActionButton icon={<Plus size={20} />} label='CRIAR TURMA' />
                    <ActionButton icon={<Edit size={20} />} label='EDITAR TURMA' />
                    <ActionButton icon={<Edit size={20} />} label='EXCLUIR TURMA' />
                </div>
            </PageLayout>
        </Box>
    );
}