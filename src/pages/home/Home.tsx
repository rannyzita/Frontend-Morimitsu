import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { FC, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { BirthdayCarousel } from '../../components/ScrollBirthday/scrollBirthday';
import { useAuth } from '../../contexts/AuthContext';

import { 
    Users, 
    GraduationCap, 
    ChevronRight, 
    ChevronLeft, 
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
        className='bg-[#880000] text-white p-4 lg:p-6 rounded-lg border-[10px] border-[#3E0404] 
                    flex items-center  gap-3 lg:gap-4 text-2xl lg:text-4xl font-bold tracking-wide
                    hover:bg-[#8e0303] transition-colors duration-200
                    w-full cursor-pointer' 

    >
        <div className='w-[40px] md:w-[61px]'> 
            {React.cloneElement(icon as React.ReactElement, { className: 'w-full h-full' })}
        </div>

        <span className='flex-1 text-center'>{label}</span> 
    </button>
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

    return (
        <Box component='div' className='max-w-7xl mx-auto lg:max-w-full lg:mx-0 flex flex-col gap-10 py-6 px-8 lg:py-26 lg:px-30'> 

            <section className='grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-20 items-start flex-1 justify-center'>
                
                { user.role === 'COORDENADOR' && (
                    <>
                        <div className='lg:col-span-4 xl:col-span-3 
                                    order-1 lg:order-3 
                                    bg-[#880000] rounded-lg text-white border-[10px] border-[#3E0404] 
                                    overflow-hidden self-stretch flex flex-col'>
                            
                            <div className='flex justify-center pt-4 px-4'> 
                                <div className='inline-flex items-center gap-2 md:gap-3 bg-[#3E0404] rounded-lg px-3 py-3 md:px-4 md:py-4 shadow-[0_5px_15px_rgba(0,0,0,0.4)]'>
                                    <span className='text-[13px] md:text-base font-bold tracking-wide text-center'> 
                                        ALUNOS APTOS À GRADUAÇÃO
                                    </span>
                                    <Bell className='w-6 h-6 md:w-8 md:h-8 text-white flex-shrink-0' />
                                </div>
                            </div>

                            <div className='space-y-2 px-4 md:px-5 pt-3 h-[230px] overflow-y-auto'>
                                {currentStudents.map((student) => (
                                    <div key={student.name} className='border-b border-white pb-2 last:border-b-0'>
                                        <Typography variant='body2' className='!font-semibold'>{student.name}</Typography>
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

                            {/* Paginação */}
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

                        {/* Botão Turmas */}
                        {/* MOBILE: order-2 (Segundo) | DESKTOP: lg:order-1 (Primeiro) */}
                        <div className='lg:col-span-3 xl:col-span-3 order-2 lg:order-1 flex self-center'> 
                            <Link to={'/gerenciamento-turmas'} className='w-full'>
                                <BigButton 
                                    icon={<Users />} 
                                    label='TURMAS' 
                                />
                            </Link>
                        </div>
                        
                        {/* Botão Graduação */}
                        {/* MOBILE: order-3 (Terceiro) | DESKTOP: lg:order-2 (Segundo) */}
                        <div className='lg:col-span-3 xl:col-span-3 order-3 lg:order-2 flex self-center'> 
                            <Link to={'/graduacao'} className='w-full'>
                                <BigButton 
                                    icon={<GraduationCap />} 
                                    label='GRADUAÇÃO' 
                                />
                            </Link>
                        </div>
                    </>
                )}

                { user.role === 'PROFESSOR' && (
                    <>
                        <div className='lg:col-span-3 flex self-center pt-10 lg:pb-0'> 
                            <BigButton 
                                icon={<ListChecks size={61} />} 
                                label='FREQUÊNCIA' 
                            />
                        </div>
                        
                        <div className='lg:col-span-3 flex self-center lg:pt-10 pb-20 lg:pb-0'> 
                            <BigButton 
                                icon={<ClipboardList size={61} />} 
                                label='RELATÓRIO' 
                            />
                        </div>
                    </>
                )}
            </section>

            {/* SEÇÃO 2: Aniversariantes do Mês */}
            <BirthdayCarousel members={birthdayMembers}></BirthdayCarousel>
        </Box>
    );
}