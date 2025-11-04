import { useState, type FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { PageLayout } from '../../../components/layout/BigCard';
import { Pagination } from '../../../components/Pagination/Pagination';
import { Award, User } from 'lucide-react';

import { SearchInput } from '../../../components/SearchInput/SearchInput';

import studentAvatar1 from '../options/assetsTest/IconBaby.png';
import studentAvatar2 from '../options/assetsTest/TurmaInfantil.png';
import studentAvatar3 from '../options/assetsTest/iconMista.png';
import studentAvatar4 from '../options/assetsTest/IconBaby.png';

const initialAlunos = [
    { id: 1, name: 'Antônio Henrique Pereira da Silva', avatar: studentAvatar1, role: 'Coordenador(a)', isPromoted: false },
    { id: 2, name: 'Anna Cristina Laurencio de Oliveira', avatar: studentAvatar2, role: 'Aluno(a)', isPromoted: false },
    { id: 3, name: 'Juliana Souza da Paz', avatar: studentAvatar3, role: 'Professor(a)', isPromoted: false },
    { id: 4, name: 'Enzo Alves da Costa', avatar: studentAvatar4, role: 'Professor(a)', isPromoted: false },
    { id: 5, name: 'Beatriz Martins', avatar: studentAvatar1, role: 'Aluno(a)', isPromoted: false },
    { id: 6, name: 'Carlos Eduardo Lima', avatar: studentAvatar2, role: 'Professor(a)', isPromoted: false },
    { id: 7, name: 'Daniela Ferreira', avatar: studentAvatar3, role: 'Professor(a)', isPromoted: false },
    { id: 8, name: 'Gabriel Ribeiro', avatar: studentAvatar4, role: 'Professor(a)', isPromoted: false },
    { id: 9, name: 'Helena Santos', avatar: studentAvatar1, role: 'Aluno(a)', isPromoted: false },
    { id: 10, name: 'Isabela Rocha', avatar: studentAvatar2, role: 'Professor(a)', isPromoted: false },
    { id: 11, name: 'João Victor Almeida', avatar: studentAvatar3, role: 'Professor(a)', isPromoted: false },
];

interface StudentListItemProps {
    avatar: string;
    name: string;
    role: string;
    studentId: number;
    isPromoted: boolean;
    onTogglePromoted: (studentId: number, isPromoted: boolean) => void;
}

const StudentListItem: FC<StudentListItemProps> = ({
    avatar,
    name,
    role,
    studentId,
    isPromoted,
    onTogglePromoted,
}) => {
    return (
        <div className='relative flex flex-col lg:flex-row items-center bg-[#690808] p-3 rounded-lg w-full max-w-lg lg:w-[950px] lg:max-w-none shadow-[0_5px_15px_rgba(0,0,0,0.3)]'>
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

                {/* Linha vertical sempre na mesma posição */}
                <div className='h-8 lg:h-10 border-l border-white opacity-50 mx-1 flex-shrink-0' />

                {/* Nome do aluno ocupa o restante */}
                <span className='flex-1 text-white truncate text-left text-[10px] md:text-[14px] lg:text-base'>
                    {name}
                </span>
            </div>

            {/* Container do cargo e botão "Ver Mais" fixo */}
            <div className='flex-shrink-0 flex items-center gap-3 lg:ml-auto'>
                {/* Linha vertical do cargo */}
                <div className='h-10 border-l border-white opacity-50 mx-1 hidden lg:block' />

                {/* Cargo sempre na mesma posição */}
                <span className='hidden lg:flex text-white text-xs lg:text-sm pl-2 pr-6'>
                    Cargo: {role}
                </span>

                <div className='hidden relative lg:flex flex-col items-center justify-center bg-[#3E0404] py-1 px-1 rounded-[10px] w-28 h-10'>
                    <span className='block text-white text-[10px] lg:text-[14px] leading-tight text-center'>
                        Ver Mais
                    </span>
                </div>
            </div>
        </div>
    );
};

export const VerUsuarios: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [searchQuery, setSearchQuery] = useState('');
    const [alunos, setAlunos] = useState(initialAlunos);

    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage, setStudentsPerPage] = useState(5);

    useEffect(() => {
        const updateStudentsPerPage = () => {
            const newStudentsPerPage = window.innerWidth < 768 ? 5 : 5; // 4 mobile, 5 iPad/Desktop
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

    const filteredAlunos = alunos.filter(aluno =>
        aluno.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredAlunos.length / studentsPerPage);
    const startIndex = (currentPage - 1) * studentsPerPage;
    const endIndex = startIndex + studentsPerPage;
    const currentAlunos = filteredAlunos.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => setCurrentPage(page);

    const mobileHeightClass = studentsPerPage === 4 ? 'h-[270px]' : 'h-full';

    return (
        <Box component='div' className='flex flex-col items-center justify-center h-full p-4 pt-4 relative'>
            <PageLayout
                title='VER USUÁRIOS'
                icon={<User size={36} className='lg:w-[50px] lg:h-[50px]' />}
                className='flex flex-col h-full relative'
            >
                <div className='flex flex-col h-full gap-4 pt-8 lg:gap-2 lg:pt-8'>
                    <SearchInput
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder='Digite o nome do usuário'
                        className='w-full max-w-sm mx-auto lg:w-[650px] lg:max-w-none lg:mx-auto'
                    />

                    {/* Lista de alunos */}
                    <div
                        className={`flex-1 ${mobileHeightClass} flex flex-col gap-6 items-center overflow-y-auto pr-0 md:pr-2 mt-2 md:mt-4 mb-20 md:min-h-[450px] lg:min-h-[500px]`}
                    >
                        {currentAlunos.map((aluno) => (
                            <StudentListItem
                                key={aluno.id}
                                studentId={aluno.id}
                                name={aluno.name}
                                avatar={aluno.avatar}
                                role={aluno.role}
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
            </PageLayout>
        </Box>
    );
};
