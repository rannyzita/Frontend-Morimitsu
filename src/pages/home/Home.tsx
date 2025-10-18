import type { FC, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { 
    Users, 
    GraduationCap, 
    Cake, 
    ChevronRight, 
    User,
    Bell
} from 'lucide-react';

// --- Dados Mock (Exemplo) ---

const graduationStudents = [
    { 
        name: 'Cleberson - Turma Mista', 
        status: 'Está próximo de se graduar!', 
        progressLabel: 'Grau: 1/4', 
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
	{ date: '05/11', name: 'Pedro Sampaio', team: 'TURMA ADULTA' },
	{ date: '05/11', name: 'Pedro Sampaio', team: 'TURMA ADULTA' },
	{ date: '05/11', name: 'Pedro Sampaio', team: 'TURMA ADULTA' },
];

interface BigButtonProps {
    icon: ReactNode;
    label: string;
}

const BigButton: FC<BigButtonProps> = ({ icon, label }) => (
    <button 
        className='bg-[#880000] text-white p-6 rounded-lg border-[10px] border-[#3E0404] 
                    flex items-center gap-4 text-2xl font-bold tracking-wide
                    hover:bg-[#8e0303] transition-colors duration-200
                    w-full' 
    >
        {icon}
        <span className='flex-1 text-left'>{label}</span> 
    </button>
);
interface BirthdayCardProps {
    date: string;
    name: string;
    team: string;
}

const BirthdayCard: FC<BirthdayCardProps> = ({ date, name, team }) => (
    <div 
        className='bg-[#880000] rounded-lg p-2 flex flex-col items-center gap-3 min-w-[250px] border-[10px] border-[#3E0404]'
    >
        <div className='text-center text-white'>
            <Typography variant='h4' className='!font-bold'>{date}</Typography>
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

export const Home: FC = () => {
    return (
        <Box component='div' className='flex flex-col px-22 min-h-screen'> 

            <section className='grid grid-cols-1 lg:grid-cols-10 gap-28 items-start flex-1 justify-center'>
                
                {/* Botão Turmas */}
                <div className='lg:col-span-3 flex self-center'> 
                    <BigButton 
                        icon={<Users size={61} />} 
                        label='TURMAS' 
                    />
                </div>
                
                {/* Botão Graduação */}
                <div className='lg:col-span-3 flex self-center'> 
                    <BigButton 
                        icon={<GraduationCap size={61} />} 
                        label='GRADUAÇÃO' 
                    />
                </div>

				<div className='lg:col-span-3 bg-[#880000] rounded-lg text-white border-[10px] border-[#3E0404] overflow-hidden self-center'>
					
					<div className='flex justify-center pt-4'> 
						<div className='inline-flex items-center gap-3 bg-[#3E0404] rounded-lg px-4 py-4'>
							<span className='text-lg font-bold tracking-wide'> 
								ALUNOS APTOS À GRADUAÇÃO
							</span>
							<Bell className='w-8 h-8 text-white' />
						</div>
					</div>

					<div className='space-y-3 px-5 pt-4'>
						{graduationStudents.map((student) => (
							<div key={student.name} className='border-b border-white pb-2 last:border-b-0'>
								<Typography variant='body1' className='!font-semibold'>{student.name}</Typography>
								<div className='flex justify-between items-center mt-1'>
									<Typography variant='body2' className='text-white !text-sm'>
										{student.status}
									</Typography>
									<span className='text-white text-xs'>
										{student.progressLabel}
									</span>
								</div>
							</div>
						))}
					</div>

					<div className='flex justify-center items-center mt-3 space-x-2 text-white px-5 pb-4'>
						<span>1/2</span>
						<ChevronRight size={20} />
					</div>
				</div>

            </section>

            {/* SEÇÃO 2: Aniversariantes do Mês */}
            <section className='pb-2'> 
                <header className='flex items-center gap-3 mb-6'>
                    <Cake size={58} className='text-white' />
                    <Typography variant='h4' className='text-white !font-bold'>
                        ANIVERSÁRIANTES DO MÊS:
                    </Typography>
                </header>

                {/* Wrapper para container rolável + seta */}
                <div className="relative flex items-center">
                    {/* Container Rlável Horizontalmente */}
                    <div className='flex overflow-x-auto gap-30 pb-4 flex-1
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

                    {/* Seta de navegação à direita */}
                    <div className="pl-2">
                        <ChevronRight size={32} className="text-white cursor-pointer" />
                    </div>
                </div>
            </section>
        </Box>
    );
}