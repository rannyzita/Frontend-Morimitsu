import { useState, type FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { PageLayout } from '../../components/layout/BigCard';
import { Pagination } from '../../components/Pagination/Pagination';
import { GraduationCap } from 'lucide-react';

import { SearchInput } from '../../components/SearchInput/SearchInput';
import { AlertModal } from '../../components/Alert/alert'; // 🚨 Importe o AlertModal
import { StudentListItem } from './components/StudentList';
import { EvaluationModal } from '../../components/Modal/Evaluation';

import studentAvatar1 from '../../pages/UserManagement/options/assetsTest/IconBaby.png';
import studentAvatar2 from '../../pages/UserManagement/options/assetsTest/TurmaInfantil.png';
import studentAvatar3 from '../../pages/UserManagement/options/assetsTest/iconMista.png';
import studentAvatar4 from '../../pages/UserManagement/options/assetsTest/IconBaby.png';

const initialAlunos = [
    { id: 1, name: 'Antônio Henrique Pereira da Silva', nameSocial:'Antônio', avatar: studentAvatar1, classname:'Mista', isPromoted: false, age: 10 },
    { id: 2, name: 'Anna Cristina Laurencio de Oliveira', nameSocial:'Anna', avatar: studentAvatar2, classname:'Mista', isPromoted: false, age: 10 },
    { id: 3, name: 'Juliana Souza da Paz', nameSocial:'Juliana', avatar: studentAvatar3,classname:'Mista', isPromoted: false, age: 10 },
    { id: 4, name: 'Enzo Alves da Costa', avatar: studentAvatar4, nameSocial:'Enzo', classname:'Mista', isPromoted: false, age: 10 },
    { id: 5, name: 'Beatriz Martins', avatar: studentAvatar1, nameSocial:'Beatriz',classname:'Mista', isPromoted: false, age: 10 },
    { id: 6, name: 'Carlos Eduardo Lima', nameSocial:'Carlos', avatar: studentAvatar2, classname:'Mista', isPromoted: false, age: 10 },
    { id: 7, name: 'Daniela Ferreira', nameSocial:'Daniela', avatar: studentAvatar3, classname:'Mista', isPromoted: false, age: 10 },
    { id: 8, name: 'Gabriel Ribeiro', nameSocial:'Gabriel', avatar: studentAvatar4, classname:'Mista', isPromoted: false, age: 10 },
    { id: 9, name: 'Helena Santos', nameSocial:'Helena', avatar: studentAvatar1, classname:'Mista', isPromoted: false, age: 10 },
    { id: 10, name: 'Isabela Rocha', nameSocial:'Isabela', avatar: studentAvatar2, classname:'Mista', isPromoted: false, age: 10 },
    { id: 11, name: 'João Victor Almeida', nameSocial:'João', avatar: studentAvatar3, classname:'Mista', isPromoted: false, age: 10 },
];

export const Graduation: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [searchQuery, setSearchQuery] = useState('');
    const [alunos, setAlunos] = useState(initialAlunos);

    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage, setStudentsPerPage] = useState(5);
    
    // 🚨 ESTADOS PARA O MODAL
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [studentToIgnoreId, setStudentToIgnoreId] = useState<number | null>(null);

    const [isEvaluationOpen, setIsEvaluationOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

    useEffect(() => {
        const updateStudentsPerPage = () => {
            const newStudentsPerPage = window.innerWidth < 768 ? 5 : 5;
            setStudentsPerPage(newStudentsPerPage);
            if (newStudentsPerPage !== studentsPerPage) setCurrentPage(1);
        };

        updateStudentsPerPage();
        window.addEventListener('resize', updateStudentsPerPage);
        return () => window.removeEventListener('resize', updateStudentsPerPage);
    }, []);

    const handleTogglePromoted = (studentId: number, isChecked: boolean) => {
        const updatedAlunos = alunos.map(aluno => ({
            ...aluno,
            isPromoted: aluno.id === studentId ? isChecked : false
        }));
        setAlunos(updatedAlunos);
    };

    const handleIgnoreAssessmentClick = (studentId: number) => {
        setStudentToIgnoreId(studentId);
        setIsModalOpen(true);
    };

    const handleConfirmIgnore = () => {
        if (studentToIgnoreId !== null) {
            setAlunos(alunos.filter(aluno => aluno.id !== studentToIgnoreId));
        }
        setIsModalOpen(false);
        setStudentToIgnoreId(null);
    };

    const handleCancelIgnore = () => {
        setIsModalOpen(false);
        setStudentToIgnoreId(null);
    };

    const handleOpenEvaluation = (aluno: any) => {
        setSelectedStudent(aluno);
        setIsEvaluationOpen(true);
    };

    const handleCloseEvaluation = () => {
        setIsEvaluationOpen(false);
        setSelectedStudent(null);
    };

    const filteredAlunos = alunos.filter(aluno =>
        aluno.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredAlunos.length / studentsPerPage);
    const startIndex = (currentPage - 1) * studentsPerPage;
    const endIndex = startIndex + studentsPerPage;
    const currentAlunos = filteredAlunos.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => setCurrentPage(page);

    const mobileHeightClass = studentsPerPage === 4 ? 'h-[270px]' : 'h-full';
    
    // Encontra o nome do aluno para exibir no modal (opcional, mas útil)
    const studentToIgnore = alunos.find(a => a.id === studentToIgnoreId);

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
                        className={`flex-1 ${mobileHeightClass} flex flex-col gap-6 items-center overflow-y-auto pr-0 md:pr-2 mt-2 md:mt-4 mb-20 md:min-h-[450px] lg:min-h-[400px]`}
                    >
                        {currentAlunos.map((aluno) => (
                            <StudentListItem
                                key={aluno.id}
                                studentId={aluno.id}
                                name={aluno.name}
                                avatar={aluno.avatar}
                                classname={aluno.classname}
                                isPromoted={aluno.isPromoted}
                                onTogglePromoted={handleTogglePromoted}
                                onIgnoreAssessment={handleIgnoreAssessmentClick}
                                onOpenModal={() => handleOpenEvaluation(aluno)}
                            />
                        ))}
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

            <AlertModal
                isOpen={isModalOpen}
                onClose={handleCancelIgnore}
                onConfirm={handleConfirmIgnore}
                title='Ignorar Avaliação?'
            >
                Tem certeza que deseja ignorar a avaliação de graduação para o aluno 
                *{studentToIgnore ? studentToIgnore.name : 'selecionado'}*? 
                Esta ação removerá esta notificação da lista e só aparecerá novamente no próximo requisito atendido.
            </AlertModal>

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