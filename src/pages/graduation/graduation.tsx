import { useState, type FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { PageLayout } from '../../components/layout/BigCard';
import { Pagination } from '../../components/Pagination/Pagination';
import { GraduationCap } from 'lucide-react';

import { SearchInput } from '../../components/SearchInput/SearchInput';
import { StudentListItem } from './components/StudentList';
import { EvaluationModal } from '../../components/Modal/Evaluation';

import type { AlunoAptoGraduacao } from '../../services/graduation/types/types';
import { fetchAptosGraduacaoTela } from '../../services/graduation/graduation';
import { useAuth } from '../../contexts/AuthContext';

export const Graduation: FC = () => {
    const { token } = useAuth();
    const { id } = useParams<{ id: string }>();
    const [searchQuery, setSearchQuery] = useState('');
    const [alunos, setAlunos] = useState<AlunoAptoGraduacao[]>([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage, setStudentsPerPage] = useState(5); 
    
    const [isEvaluationOpen, setIsEvaluationOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

    const HEIGHT_BREAKPOINT = 805;

    useEffect(() => {
        async function loadAlunos() {
            try {
            setLoading(true);
            const data = await fetchAptosGraduacaoTela(token as string);
            setAlunos(data);
            } catch (error) {
            console.error('Erro ao buscar alunos aptos:', error);
            } finally {
            setLoading(false);
            }
        }

    if (token) loadAlunos();
    }, [token]);

    useEffect(() => {
        const updateStudentsPerPage = () => {
            const screenHeight = window.innerHeight;
            
            const newStudentsPerPage = screenHeight >= HEIGHT_BREAKPOINT ? 5 : 6;
            
            setStudentsPerPage(newStudentsPerPage);
            
            if (newStudentsPerPage !== studentsPerPage) setCurrentPage(1);
        };

        updateStudentsPerPage();
        window.addEventListener('resize', updateStudentsPerPage);
        
        return () => window.removeEventListener('resize', updateStudentsPerPage);
    }, [studentsPerPage]); 

    useEffect(() => {
        if (studentsPerPage > 0) {
            const filteredAlunos = alunos.filter(aluno =>
                aluno.nome.toLowerCase().includes(searchQuery.toLowerCase())
            );
            const maxPages = Math.ceil(filteredAlunos.length / studentsPerPage);
            if (currentPage > maxPages) {
                setCurrentPage(maxPages > 0 ? maxPages : 1);
            }
        }
    }, [studentsPerPage, alunos.length, searchQuery]);


    const handleTogglePromoted = (studentId: string, isChecked: boolean) => {
        setAlunos((prev) =>
            prev.map((aluno) => ({
            ...aluno,
            isPromoted: aluno.alunoId === studentId ? isChecked : false
            }))
        );
    };

    const handleOpenEvaluation = (aluno: any) => {
        const studentWithRole = { ...aluno, role: 'estudante' }; 
        setSelectedStudent(studentWithRole);
        setIsEvaluationOpen(true);
    };

    const handleCloseEvaluation = () => {
        setIsEvaluationOpen(false);
        setSelectedStudent(null);
    };

    const filteredAlunos = alunos.filter(aluno =>
        aluno.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredAlunos.length / studentsPerPage);
    const startIndex = (currentPage - 1) * studentsPerPage;
    const endIndex = startIndex + studentsPerPage;
    const currentAlunos = filteredAlunos.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => setCurrentPage(page);

    const mobileHeightClass = studentsPerPage === 5 ? 'h-auto' : 'h-full'; 

    return (
        <Box component='div' className='flex flex-col items-center justify-center h-full p-4 pt-4 relative'>
            <PageLayout
                title='APTOS À GRADUAÇÃO'
                icon={<GraduationCap size={36} className='lg:w-[50px] lg:h-[50px]' />}
                className='flex flex-col h-full relative'
            >
                <div className='flex flex-col h-full gap-4 pt-8 lg:gap-2 lg:pt-4'>
                    <SearchInput
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder='Digite o nome do aluno(a)'
                        className='w-full max-w-sm mx-auto lg:w-[650px] lg:max-w-none lg:mx-auto'
                    />

                    {/* Lista de alunos */}
                    <div
                        className={`flex-1 flex flex-col gap-6 items-center overflow-y-auto pr-0 md:pr-2 mt-2 md:mt-4 mb-20 md:min-h-[450px] lg:min-h-[400px]`}
                    >
                        {loading ? (
                            <p className='text-white font-bold mt-50'>Carregando alunos...</p>
                            ) : (
                            currentAlunos.map((aluno) => (
                                <StudentListItem
                                    key={aluno.alunoId}
                                    studentId={aluno.alunoId}
                                    name={aluno.nome}
                                    avatar={`${import.meta.env.VITE_API_URL}${aluno.imagemPerfil}`}
                                    classname={aluno.turma}
                                    currentBeltImage={`${import.meta.env.VITE_API_URL}${aluno.faixaAtual.imagem}`} 
                                    isPromoted={false}
                                    onTogglePromoted={(id, checked) =>
                                        handleTogglePromoted(id, checked)
                                    }
                                    onOpenModal={() =>
                                        handleOpenEvaluation({
                                            id: aluno.alunoId,
                                            name: aluno.nome,
                                            avatar: `${import.meta.env.VITE_API_URL}${aluno.imagemPerfil}`,
                                            classname: aluno.turma,
                                        })
                                    }
                                />
                            )))}
                    </div>

                    {/* Pagination fixa */}
                    <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-[650px]'>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </PageLayout>

            <EvaluationModal 
                isOpen={isEvaluationOpen}
                onClose={handleCloseEvaluation}
                student={selectedStudent}
                currentGrade='1º'
                nextGrade='2º'
                nextGraduationDate='10/01/2026'
            />
        </Box>
    );
};