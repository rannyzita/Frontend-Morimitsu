import type { FC, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { 
    Users, 
    GraduationCap, 
    Bell, 
    Cake, 
    ChevronRight, 
    User 
} from 'lucide-react';

// --- Dados Mock (Exemplo) ---

const graduationStudents = [
    { 
        name: 'Cleberson - Turma Mista', 
        status: 'Está próximo de se graduar!', 
        progressLabel: 'Grav: 1/4', 
        progressPercent: '25%' 
    },
    { 
        name: 'Maria Vitória - Turma Mista', 
        status: 'Está promovido(a) de se graduar!', 
        progressLabel: 'Aulas: 20/20', 
        progressPercent: '100%' 
    },
    { 
        name: 'Rodrigo Faro - Turma Adulto', 
        status: 'Está próximo de se graduar!', 
        progressLabel: 'Próxima Faixa: Azul', 
        progressPercent: '75%' 
    },
];

const birthdayMembers = [
    { date: '22/10', name: 'Antônio Henrique', team: 'TURMA MISTA' },
    { date: '10/10', name: 'Anna Cristina', team: 'TURMA ADULTA' },
    { date: '10/10', name: 'Julianna Souza', team: 'TURMA KIDS' },
    { date: '29/10', name: 'Enzo Alves', team: 'TURMA KIDS' },
    { date: '05/11', name: 'Pedro Sampaio', team: 'TURMA ADULTA' },
];


// --- Componente de Botão Reutilizável ---

interface BigButtonProps {
    icon: ReactNode;
    label: string;
}

// Botões Principais
const BigButton: FC<BigButtonProps> = ({ icon, label }) => (
    <button 
        className='bg-[#880000] text-white p-6 rounded-lg border-10 border-[#3E0404] 
                	flex items-center justify-center gap-4 text-2xl font-bold tracking-wide
                	hover:bg-[#8e0303] transition-colors duration-200'
    >
        {icon}
        <span>{label}</span>
    </button>
);
interface BirthdayCardProps {
    date: string;
    name: string;
    team: string;
}

const BirthdayCard: FC<BirthdayCardProps> = ({ date, name, team }) => (
    <div 
        className='bg-[#880000] rounded-lg p-4 flex flex-col items-center gap-3 min-w-[200px] border-10 border-[#3E0404]'
    >
        <div className='text-center text-white'>
            <Typography variant='h6' className='!font-bold'>{date}</Typography>
            <Typography variant='body1' className='!font-semibold'>{name}</Typography>
        </div>
        
        {/* Placeholder para o Avatar */}
        <div className='bg-white/20 rounded-full p-5 text-white'>
            <User size={64} /> 
        </div>

        <span className='text-white bg-black/30 px-3 py-1 rounded-full text-sm font-semibold'>
            {team}
        </span>
    </div>
);

// --- Componente Principal da Home ---

export const Home: FC = () => {
    return (
        <Box component='div' className='flex flex-col space-y-10'>

            {/* SEÇÃO 1: Botões e Alunos Aptos */}
            <section className='grid grid-cols-1 lg:grid-cols-12 gap-6 items-start'>
                
                {/* Botão Turmas */}
                <div className='lg:col-span-3'>
                    <BigButton 
                        icon={<Users size={61} />} 
                        label='TURMAS' 
                    />
                </div>
                
                {/* Botão Graduação */}
                <div className='lg:col-span-3'>
                    <BigButton 
                        icon={<GraduationCap size={61} />} 
                        label='GRADUAÇÃO' 
                    />
                </div>

                {/* Card Alunos Aptos */}
                <div className='lg:col-span-6 bg-[#880000] rounded-lg p-5 text-white border-10 border-[#3E0404]'>
                    <Box component='header' className='flex justify-between items-center mb-4'>
                        <Typography variant='h6' className='!font-bold tracking-wide'>
                            ALUNOS APTOS À GRADUAÇÃO
                        </Typography>
                        <Bell className='text-yellow-400' />
                    </Box>

                    {/* Lista de Alunos */}
                    <div className='space-y-4'>
                        {graduationStudents.map((student) => (
                            <div key={student.name} className='border-b border-neutral-700 pb-3 last:border-b-0'>
                                <Typography variant='body1' className='!font-semibold'>{student.name}</Typography>
                                <Typography variant='body2' className='text-white !text-sm'>{student.status}</Typography>
                                
                                <div className='flex justify-between items-center mt-2 text-gray-400 text-xs'>
                                    <span>{student.progressLabel}</span>
                                    {/* Barra de Progresso Falsa */}
                                    <div className='w-1/2 bg-neutral-600 rounded-full h-1.5'>
                                        <div 
                                            className='bg-red-600 h-1.5 rounded-full' 
                                            style={{ width: student.progressPercent }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Paginação */}
                    <div className='flex justify-end items-center mt-4 space-x-2 text-gray-400'>
                        <span>1/2</span>
                        <ChevronRight size={20} />
                    </div>
                </div>

            </section>

            {/* SEÇÃO 2: Aniversariantes do Mês */}
            <section>
                <header className='flex items-center gap-3 mb-4'>
                    <Cake size={58} className='text-white' />
                    <Typography variant='h5' className='text-white !font-bold'>
                        ANIVERSARIANTES DO MÊS:
                    </Typography>
                </header>

                {/* Container Rlável Horizontalmente */}
                <div className='flex overflow-x-auto gap-6 pb-4
                                [&::-webkit-scrollbar]:h-2
                                [&::-webkit-scrollbar-thumb]:bg-neutral-700
                                [&::-webkit-scrollbar-track]:bg-neutral-900
                                [&::-webkit-scrollbar-thumb]:rounded-full'>
                    
                    {birthdayMembers.map((member) => (
                        <BirthdayCard 
                            key={member.name}
                            date={member.date}
                            name={member.name}
                            team={member.team}
                        />
                    ))}
                </div>
            </section>

        </Box>
    );
}