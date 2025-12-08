import { useState, type FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { PageLayout } from '../../../components/layout/BigCard';
import { Pagination } from '../../../components/Pagination/Pagination';
import { Award, Info} from 'lucide-react';

import { SearchInput } from '../../../components/SearchInput/SearchInput';

import turmaBabyIcon from './assetsTest/IconBaby.png';
import studentAvatar1 from './assetsTest/IconBaby.png';
import studentAvatar2 from './assetsTest/TurmaInfantil.png';
import studentAvatar3 from './assetsTest/iconMista.png';
import studentAvatar4 from './assetsTest/IconBaby.png';

import { ClassModal } from '../../../components/Modal/Turma';

const mockTurma = {
    id: '1',
    nome: 'TURMA BABY',
    icone: turmaBabyIcon,
};

const initialAlunos = [
    { id: 1, name: 'Antônio Henrique Pereira da Silva', avatar: studentAvatar1, current: 30, total: 40, isPromoted: false },
    { id: 2, name: 'Anna Cristina Laurencio de Oliveira', avatar: studentAvatar2, current: 30, total: 40, isPromoted: false },
    { id: 3, name: 'Juliana Souza da Paz', avatar: studentAvatar3, current: 30, total: 40, isPromoted: false },
    { id: 4, name: 'Enzo Alves da Costa', avatar: studentAvatar4, current: 30, total: 40, isPromoted: false },
    { id: 5, name: 'Beatriz Martins', avatar: studentAvatar1, current: 28, total: 40, isPromoted: false },
    { id: 6, name: 'Carlos Eduardo Lima', avatar: studentAvatar2, current: 35, total: 40, isPromoted: false },
    { id: 7, name: 'Daniela Ferreira', avatar: studentAvatar3, current: 22, total: 40, isPromoted: false },
    { id: 8, name: 'Gabriel Ribeiro', avatar: studentAvatar4, current: 38, total: 40, isPromoted: false },
    { id: 9, name: 'Helena Santos', avatar: studentAvatar1, current: 15, total: 40, isPromoted: false },
    { id: 10, name: 'Isabela Rocha', avatar: studentAvatar2, current: 39, total: 40, isPromoted: false },
    { id: 11, name: 'João Victor Almeida', avatar: studentAvatar3, current: 12, total: 40, isPromoted: false },
];

interface StudentListItemProps {
    avatar: string; name: string; currentClasses: number; totalClasses: number; studentId: number; isPromoted: boolean; index: number;
    onTogglePromoted: (studentId: number, isPromoted: boolean) => void;
}

const StudentListItem: FC<StudentListItemProps> = ({
    avatar,
    name,
    currentClasses,
    totalClasses,
    studentId,
    isPromoted,
    onTogglePromoted,
    index 
}) => {
    return (
        <div
            className='flex flex-col lg:flex-row lg:items-center bg-[#690808] p-3 rounded-lg w-full max-w-lg lg:w-[950px] lg:max-w-none shadow-[0_5px_15px_rgba(0,0,0,0.3)]'
        >
            <div className='flex items-center gap-1 md:gap-3 w-full lg:w-auto'>
                <img
                    src={avatar}
                    alt={name}
                    className='w-8 h-8 lg:w-10 lg:h-10 rounded-full flex-shrink-0'
                />
                <Award
                    size={20}
                    className='text-white flex-shrink-0 lg:w-6 lg:h-6'
                />
                <div className='h-8 lg:h-10 border-l border-white opacity-50 mx-1 flex-shrink-0' />

                <span className='flex-1 text-white truncate text-left text-[10px] md:text-[14px] lg:text-base'>
                    {name}
                </span>
            </div>

            <div
                    className={`flex items-center justify-between w-full lg:w-auto lg:gap-3 lg:ml-auto ${
                    index !== 0 ? "lg:justify-end" : ""
                }`}
            >
                <div className='h-10 border-l border-white opacity-50 mx-1 flex-shrink-0 hidden lg:block' />
                    <span className='hidden lg:flex text-white text-xs lg:text-sm flex-shrink-0 pl-2 md:pl-0 pr-6'>
                        Aulas: {currentClasses}/{totalClasses}
                    </span>

                    {/* Só o primeiro aluno mostra o promover */}
                    {index === 0 && (
                    <div className='hidden relative lg:flex flex-col items-center justify-center bg-[#3E0404] py-1 px-1 rounded w-36 flex-shrink-0 h-10'>
                        <div className='pr-5'>
                            <span className='block text-white text-[9px] lg:text-[10px] leading-tight text-center'>
                                PROMOVER P/
                            </span>
                            <span className='block text-white text-[9px] lg:text-[10px] leading-tight text-center'>
                                PROFESSOR(A)
                            </span>
                        </div>

                        <input
                            type='checkbox'
                            checked={isPromoted}
                            onChange={(e) =>
                                onTogglePromoted(studentId, e.target.checked)
                        }
                        className='absolute right-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 lg:w-4 lg:h-4 bg-transparent border border-white rounded-sm appearance-none checked:bg-white checked:border-transparent cursor-pointer focus:outline-none focus:ring-1 focus:ring-white'
                        />
                </div>
                )}
            </div>
        </div>
    );
};


export const VerDetalhesTurma: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [searchQuery, setSearchQuery] = useState('');
    const [alunos, setAlunos] = useState(initialAlunos);

    const [currentPage, setCurrentPage] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [classToIgnoreId, setClassToIgnoreId] = useState<number | null>(null);

    const [studentsPerPage, setStudentsPerPage] = useState(5);

    useEffect(() => {
        const updateStudentsPerPage = () => {
            const newStudentsPerPage = window.innerWidth < 768 ? 4 : 5;
            setStudentsPerPage(newStudentsPerPage);

            if (newStudentsPerPage !== studentsPerPage) {
                setCurrentPage(1);
            }
        };

        updateStudentsPerPage();
        window.addEventListener('resize', updateStudentsPerPage);

        return () => window.removeEventListener('resize', updateStudentsPerPage);
    }, []); 

    const handleIgnoreAssessmentClick = (id: number) => {
        setClassToIgnoreId(id);
        setIsModalOpen(true);
    };

    const handleConfirmIgnore = () => {
        setIsModalOpen(false);
        setClassToIgnoreId(null);
    };

    const handleCancelIgnore = () => {
        setIsModalOpen(false);
        setClassToIgnoreId(null);
    };

    const handleTogglePromoted = (studentId: number, isChecked: boolean) => {
        const updatedAlunos = alunos.map(aluno => ({
            ...aluno,
            isPromoted: aluno.id === studentId ? isChecked : false
        }));
        setAlunos(updatedAlunos);
    };

    const filteredAlunos = alunos.filter(aluno =>
        aluno.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredAlunos.length / studentsPerPage);
    const startIndex = (currentPage - 1) * studentsPerPage;
    const endIndex = startIndex + studentsPerPage;
    const currentAlunos = filteredAlunos.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const turma = mockTurma;

    const mobileHeightClass = studentsPerPage === 3 ? 'h-[270px]' : 'h-full';


    return (
        <Box
            component='div'
            className='flex flex-col items-center justify-center h-full p-4 pt-4 relative'
        >
            <PageLayout
                title={turma.nome.toUpperCase()}
                icon={<img src={turma.icone} alt={turma.nome} className='w-8 h-8 lg:w-10 lg:h-10' />}
                className='flex flex-col h-full relative'
                info={true}
                onClick={() => setIsModalOpen(true)}
            >
                <div className='flex flex-col h-full gap-4 pt-8 lg:gap-2 lg:pt-8'>
                    <div className='flex'>
                        <SearchInput
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder='Digite o nome do aluno'
                            className='w-full max-w-sm mx-auto lg:w-[650px] lg:max-w-none lg:mx-auto'
                        />
                    </div>

                    {/* Lista de alunos */}
                    <div
                        className={`flex-1 ${mobileHeightClass} flex flex-col gap-6 items-center overflow-y-auto pr-0 md:pr-2 mt-2 md:mt-4 mb-20`}
                    >
                    {currentAlunos.map((aluno, index) => (
                        <StudentListItem
                            key={aluno.id}
                            index={index}
                            studentId={aluno.id}
                            name={aluno.name}
                            avatar={aluno.avatar}
                            currentClasses={aluno.current}
                            totalClasses={aluno.total}
                            isPromoted={aluno.isPromoted}
                            onTogglePromoted={handleTogglePromoted}
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

                <ClassModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    classInfo={{ 
                        id: 1,
                        name: "TURMA BABY",
                        responsavel: "Fulano",
                        avatar: turmaBabyIcon,
                        ageMax: 6,
                        ageMin: 4,
                        quantityStudents: alunos.length
                    }}
                />
            </PageLayout>
        </Box>
    );
}