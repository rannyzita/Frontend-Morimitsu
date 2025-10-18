import type { FC, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { 
    Users, 
    GraduationCap, 
    Cake, 
    ChevronRight, 
    User 
} from 'lucide-react';

// Assumindo que seu import do Bell.svg está configurado no Vite
// para exportar um componente React (ex: via vite-plugin-svgr)
import Bell from './assets/Bell.svg';

// --- Dados Mock (Exemplo) ---

const graduationStudents = [
    { 
        name: 'Cleberson - Turma Mista', 
        status: 'Está próximo de se graduar!', 
        progressLabel: 'Grav: 1/4', 
    },
    { 
        name: 'Maria Vitória - Turma Mista', 
        status: 'Está promovido(a) de se graduar!', 
        progressLabel: 'Aulas: 20/20', 
    },
    { 
        name: 'Rodrigo Faro - Turma Adulto', 
        status: 'Está próximo de se graduar!', 
        progressLabel: 'Próxima Faixa: Azul', 
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
        className='bg-[#880000] text-white p-6 rounded-lg border-[10px] border-[#3E0404] 
                    flex items-center justify-center gap-4 text-2xl font-bold tracking-wide
                    hover:bg-[#8e0303] transition-colors duration-200
                    w-full' 
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
        className='bg-[#880000] rounded-lg p-4 flex flex-col items-center gap-3 min-w-[220px] border-[10px] border-[#3E0404]' // MUDANÇA: border-10 -> border-[10px] e min-w-[200px] -> min-w-[220px]
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
        <Box component='div' className='flex flex-col space-y-8'> {/* MUDANÇA: space-y-10 -> space-y-8 */}

            {/* SEÇÃO 1: Botões e Alunos Aptos */}
            <section className='grid grid-cols-1 lg:grid-cols-12 gap-6 items-start'>
                
                {/* Botão Turmas */}
                <div className='lg:col-span-3 flex'> {/* MUDANÇA: Adicionado 'flex' */}
                    <BigButton 
                        icon={<Users size={61} />} 
                        label='TURMAS' 
                    />
                </div>
                
                {/* Botão Graduação */}
                <div className='lg:col-span-3 flex'> {/* MUDANÇA: Adicionado 'flex' */}
                    <BigButton 
                        icon={<GraduationCap size={61} />} 
                        label='GRADUAÇÃO' 
                    />
                </div>

                {/* Card Alunos Aptos */}
                {/* MUDANÇA: "menor" -> lg:col-span-5. Removido p-5, add overflow-hidden */}
                <div className='lg:col-span-5 bg-[#880000] rounded-lg text-white border-[10px] border-[#3E0404] overflow-hidden'>
                    {/* MUDANÇA: Header com fundo escuro e Bell icon */}
                    <Box component='header' className='flex justify-between items-center bg-[#3E0404] p-4'>
                        <Typography variant='h6' className='!font-bold tracking-wide'>
                            ALUNOS APTOS À GRADUAÇÃO
                        </Typography>
                        {/* MUDANÇA: Adicionado seu SVG Bell importado */}
                        <Bell/>
                    </Box>

                    {/* Lista de Alunos */}
                    <div className='space-y-4 px-5 pt-5'> {/* MUDANÇA: Adicionado padding (px-5 pt-5) */}
                        {graduationStudents.map((student) => (
                            <div key={student.name} className='border-b border-neutral-700 pb-3 last:border-b-0'>
                                <Typography variant='body1' className='!font-semibold'>{student.name}</Typography>
                                <Typography variant='body2' className='text-white !text-sm'>{student.status}</Typography>
                                
                                <div className='flex justify-between items-center mt-2 text-white text-xs'>
                                    <span>{student.progressLabel}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Paginação */}
                    {/* MUDANÇA: centralizado (justify-center) e com padding (px-5 pb-5) */}
                    <div className='flex justify-center items-center mt-4 space-x-2 text-white px-5 pb-5'>
                        <span>1/2</span>
                        <ChevronRight size={20} />
                    </div>
                </div>

            </section>

            {/* SEÇÃO 2: Aniversariantes do Mês */}
            <section>
                <header className='flex items-center gap-3 mb-6'> {/* MUDANÇA: mb-4 -> mb-6 */}
                    <Cake size={58} className='text-white' />
                    <Typography variant='h5' className='text-white !font-bold'>
                        ANIVERSARIANTES DO MÊS:
                    </Typography>
                </header>

                {/* MUDANÇA: Wrapper para container rolável + seta */}
                <div className="relative flex items-center">
                    {/* Container Rlável Horizontalmente */}
                    <div className='flex overflow-x-auto gap-6 pb-4 flex-1
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

                    {/* MUDANÇA: Seta de navegação à direita */}
                    <div className="pl-4">
                        <ChevronRight size={32} className="text-white cursor-pointer" />
                    </div>
                </div>
            </section>

        </Box>
    );
}