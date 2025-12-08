import { useState, type FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { PageLayout } from '../../../components/layout/BigCard';
import { Pagination } from '../../../components/Pagination/Pagination';
import { UserPen } from 'lucide-react';

import { SearchInput } from '../../../components/SearchInput/SearchInput';

import studentAvatar1 from '../options/assetsTest/IconBaby.png';
import studentAvatar2 from '../options/assetsTest/TurmaInfantil.png';
import studentAvatar3 from '../options/assetsTest/iconMista.png';
import studentAvatar4 from '../options/assetsTest/IconBaby.png';

const initialAlunos = [
    { id: 1, name: 'Antônio Henrique Pereira da Silva', nameSocial: 'Antônio', avatar: studentAvatar1, role: 'Coordenador(a)' },
    { id: 2, name: 'Anna Cristina Laurencio de Oliveira', nameSocial: 'Anna', avatar: studentAvatar2, role: 'Aluno(a)' },
    { id: 3, name: 'Juliana Souza da Paz', nameSocial: 'Juliana', avatar: studentAvatar3, role: 'Professor(a)' },
    { id: 4, name: 'Enzo Alves da Costa', nameSocial: 'Enzo', avatar: studentAvatar4, role: 'Professor(a)' },
    { id: 5, name: 'Beatriz Martins', nameSocial: 'Beatriz', avatar: studentAvatar1, role: 'Aluno(a)' },
    { id: 6, name: 'Carlos Eduardo Lima', nameSocial: 'Carlos', avatar: studentAvatar2, role: 'Professor(a)' },
    { id: 7, name: 'Daniela Ferreira', nameSocial: 'Daniela', avatar: studentAvatar3, role: 'Professor(a)' },
    { id: 8, name: 'Gabriel Ribeiro', nameSocial: 'Gabriel', avatar: studentAvatar4, role: 'Professor(a)' },
    { id: 9, name: 'Helena Santos', nameSocial: 'Helena', avatar: studentAvatar1, role: 'Aluno(a)' },
    { id: 10, name: 'Isabela Rocha', nameSocial: 'Isabela', avatar: studentAvatar2, role: 'Professor(a)' },
    { id: 11, name: 'João Victor Almeida', nameSocial: 'João', avatar: studentAvatar3, role: 'Professor(a)' },
];

interface StudentListItemProps {
    avatar: string;
    name: string;
    nameSocial: string;
    role: string;
    studentId: number;
    onOpenEdit: (id: number) => void;
}

const StudentListItem: FC<StudentListItemProps> = ({
    avatar,
    name,
    nameSocial,
    role,
    studentId,
    onOpenEdit
}) => {
    return (
        <div
            className='relative flex flex-col lg:flex-row items-center bg-[#690808] p-3 rounded-lg w-full max-w-lg lg:w-[950px] lg:max-w-none shadow-[0_5px_15px_rgba(0,0,0,0.3)] cursor-pointer'
            onClick={() => onOpenEdit(studentId)}
        >
            <div className='flex items-center gap-3 w-full'>
                <img
                    src={avatar}
                    alt={nameSocial}
                    className='w-10 h-10 rounded-full'
                />

                <div className='h-10 border-l border-white opacity-50 mx-2' />

                <span className='flex-1 text-white truncate text-left text-[10px] md:text-[14px] lg:text-base'>
                    {name}
                </span>
            </div>

            <div className='flex-shrink-0 flex items-center gap-3 lg:ml-auto'>
                <span className='hidden lg:flex text-white text-sm pl-2 pr-6'>
                    Cargo: {role}
                </span>

                <div className='hidden lg:flex bg-[#3E0404] py-1 px-2 rounded-[10px] w-28 h-10 items-center justify-center'>
                    <span className='text-white text-sm text-center'>
                        Editar
                    </span>
                </div>
            </div>
        </div>
    );
};

export const EditVerUsuarios: FC = () => {
    const navigate = useNavigate();
    
    const [searchQuery, setSearchQuery] = useState('');
    const [alunos] = useState(initialAlunos);

    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 5;

    const filteredAlunos = alunos.filter(aluno =>
        aluno.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredAlunos.length / studentsPerPage);
    const startIndex = (currentPage - 1) * studentsPerPage;
    const currentAlunos = filteredAlunos.slice(startIndex, startIndex + studentsPerPage);

    const handlePageChange = (page: number) => setCurrentPage(page);

    const goToEdit = (id: number) => {
        navigate(`/gerenciamento-usuarios/editar-usuario/${id}`);
    };

    return (
        <Box className='flex flex-col items-center justify-center h-full p-4 pt-4 relative'>
            <PageLayout
                title='EDITAR USUÁRIO'
                icon={<UserPen className='lg:w-[50px] lg:h-[50px]' />}
                className='flex flex-col h-full relative'
            >
                <div className='flex flex-col h-full gap-8 pt-8'>
                    <SearchInput
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder='Digite o nome do usuário'
                        className='w-full max-w-sm mx-auto lg:w-[650px] lg:max-w-none lg:mx-auto'
                    />

                    <div className='flex-1 flex flex-col gap-6 items-center overflow-y-auto pr-2 mt-2 mb-20'>
                        {currentAlunos.map((aluno) => (
                            <StudentListItem
                                key={aluno.id}
                                studentId={aluno.id}
                                name={aluno.name}
                                nameSocial={aluno.nameSocial}
                                avatar={aluno.avatar}
                                role={aluno.role}
                                onOpenEdit={goToEdit}
                            />
                        ))}
                    </div>

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
