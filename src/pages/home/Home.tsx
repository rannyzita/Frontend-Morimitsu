import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { FC, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

import { useAuth } from '../../contexts/AuthContext';

import { 
    Users, 
    GraduationCap, 
    Cake, 
    ChevronRight, 
    ChevronLeft, 
    User,
    Bell,
    ListChecks,
    ClipboardList
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
    { 
        name: 'Ana Julia - Turma Kids', 
        status: 'Está próximo de se graduar!', 
        progressLabel: 'Grau: 3/4', 
    },
    { 
        name: 'Lucas Mendes - Turma Adulto', 
        status: 'Está próximo de se graduar!', 
        progressLabel: 'Próxima Faixa: Roxa', 
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
                    flex items-center gap-4 text-4xl font-bold tracking-wide
                    hover:bg-[#8e0303] transition-colors duration-200
                    w-full' 
    >
        {icon}
        <span className='flex-1 text-center'>{label}</span> 
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
        
        <div className='bg-white/20 rounded-full p-5 text-white'>
            <User size={64} /> 
        </div>

        <span className='text-white bg-black/30 px-3 py-1 rounded-full text-sm font-semibold'>
            {team}
        </span>
    </div>
);

export const Home: FC = () => {

    const { user, logout } = useAuth();

    if (!user) return null;

    const [currentPage, setCurrentPage] = useState(0); 
    const STUDENTS_PER_PAGE = 3; 

    const totalPages = Math.ceil(graduationStudents.length / STUDENTS_PER_PAGE);
    
    const startIndex = currentPage * STUDENTS_PER_PAGE;
    const endIndex = startIndex + STUDENTS_PER_PAGE;
    
    const currentStudents = graduationStudents.slice(startIndex, endIndex);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };
    
    // --- LÓGICA DO CARROSSEL DE ANIVERSARIANTES ---

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const handleScrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    const handleScrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const checkScroll = () => {
        const container = scrollContainerRef.current;
        if (container) {
            const { scrollLeft, scrollWidth, clientWidth } = container;

            setShowLeftArrow(scrollLeft > 0);

            setShowRightArrow(Math.ceil(scrollLeft) + clientWidth < scrollWidth);
        }
    };

    useEffect(() => {
        checkScroll(); 
        
        window.addEventListener('resize', checkScroll);

        return () => window.removeEventListener('resize', checkScroll);
    }, [birthdayMembers]); 

    return (
        <Box component='div' className='flex flex-col px-20 min-h-screen'> 

            <section className='grid grid-cols-1 lg:grid-cols-10 gap-20 items-start flex-1 justify-center'>
                
                { user.role === 'coordenador' && (
                    <>
                        {/* Botão Turmas */}
                        <div className='lg:col-span-3 flex self-center'> 
                            <Link to={'/gerenciamento-turmas'} className='w-full'>
                                <BigButton 
                                    icon={<Users size={61} />} 
                                    label='TURMAS' 
                                />
                            </Link>
                        </div>
                        
                        {/* Botão Graduação */}
                        <div className='lg:col-span-3 flex self-center'> 
                            <Link to={'/graduacao'} className='w-full'>
                                <BigButton 
                                    icon={<GraduationCap size={61} />} 
                                    label='GRADUAÇÃO' 
                                />
                            </Link>
                        </div>

                        {/* Card Alunos Aptos */}
                        <div className='lg:col-span-3 bg-[#880000] rounded-lg text-white border-[10px] border-[#3E0404] overflow-hidden self-center'>
                            
                            <div className='flex justify-center pt-4'> 
                                <div className='inline-flex items-center gap-3 bg-[#3E0404] rounded-lg px-4 py-4'>
                                    <span className='text-lg font-bold tracking-wide'> 
                                        ALUNOS APTOS À GRADUAÇÃO
                                    </span>
                                    <Bell className='w-8 h-8 text-white' />
                                </div>
                            </div>

                            <div className='space-y-3 px-5 pt-4 min-h-60'>
                                {currentStudents.map((student) => (
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

                            {totalPages > 1 && (
                                <div className='flex justify-between items-center mt-3 text-white px-5 pb-4'>
                                    
                                    <button 
                                        onClick={handlePrevPage} 
                                        className={`cursor-pointer hover:text-gray-300 transition-colors ${
                                            currentPage === 0 ? 'invisible' : 'visible'
                                        }`}
                                        disabled={currentPage === 0}
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    
                                    <span>{currentPage + 1}/{totalPages}</span>

                                    <button 
                                        onClick={handleNextPage}
                                        className={`cursor-pointer hover:text-gray-300 transition-colors ${
                                            currentPage === totalPages - 1 ? 'invisible' : 'visible'
                                        }`}
                                        disabled={currentPage === totalPages - 1}
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}

                { user.role === 'aluno/professor' && (
                    <>
                        {/* Botão Turmas */}
                        <div className='lg:col-span-3 flex self-center'> 
                            <BigButton 
                                icon={<ListChecks size={61} />} 
                                label='FREQUÊNCIA' 
                            />
                        </div>
                        
                        {/* Botão Graduação */}
                        <div className='lg:col-span-3 flex self-center'> 
                            <BigButton 
                                icon={<ClipboardList size={61} />} 
                                label='RELATÓRIO' 
                            />
                        </div>
                    </>
                )}
            </section>

            {/* SEÇÃO 2: Aniversariantes do Mês */}
            <section className='pb-4'> 
                <header className='flex items-center gap-4 mb-6'>
                    <Cake size={58} className='text-white' />
                    <Typography variant='h4' className='text-white !font-bold'>
                        ANIVERSÁRIANTES DO MÊS:
                    </Typography>
                </header>

                <div className='relative flex items-center pr-2'>

                    <div 
                        className={`pr-8 ${showLeftArrow ? 'visible' : 'invisible'}`}
                    >
                        <ChevronLeft 
                            size={42} 
                            className='text-white cursor-pointer' 
                            onClick={handleScrollLeft} 
                        />
                    </div>

                    <div 
                        ref={scrollContainerRef}
                        onScroll={checkScroll} 
                        className='flex overflow-x-auto gap-30 pb-4 flex-1
                                    [&::-webkit-scrollbar]:h-2
                                    [&::-webkit-scrollbar-thumb]:bg-[#880000]
                                    [&::-webkit-scrollbar-track]:bg-[#3E0404] 
                                    [&::-webkit-scrollbar-thumb]:rounded-full'
                    >
                        
                        {birthdayMembers.map((member) => (
                            <BirthdayCard 
                                key={member.name}
                                date={member.date}
                                name={member.name}
                                team={member.team}
                            />
                        ))}
                    </div>

                    <div 
                        className={`pl-8 ${showRightArrow ? 'visible' : 'invisible'}`}
                    >
                        <ChevronRight 
                            size={42} 
                            className='text-white cursor-pointer' 
                            onClick={handleScrollRight}
                        />
                    </div>
                </div>
            </section>
        </Box>
    );
}