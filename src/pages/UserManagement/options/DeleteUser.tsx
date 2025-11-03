import { useState, type FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { PageLayout } from '../../../components/layout/BigCard';
import { Pagination } from '../../../components/Pagination/Pagination';
import { Award, UserMinus, X } from 'lucide-react';

import { SearchInput } from '../../../components/SearchInput/SearchInput';
import { AlertModal } from '../../../components/Alert/alert';
import { FeedbackToast } from '../../../components/Feedback/Feedback';

import studentAvatar1 from '../options/assetsTest/IconBaby.png';
import studentAvatar2 from '../options/assetsTest/TurmaInfantil.png';
import studentAvatar3 from '../options/assetsTest/iconMista.png';
import studentAvatar4 from '../options/assetsTest/IconBaby.png';

const initialAlunos = [
    { id: 1, name: 'Antônio Henrique Pereira da Silva', avatar: studentAvatar1, role: 'Coordenador(a)' },
    { id: 2, name: 'Anna Cristina Laurencio de Oliveira', avatar: studentAvatar2, role: 'Aluno(a)' },
    { id: 3, name: 'Juliana Souza da Paz', avatar: studentAvatar3, role: 'Professor(a)' },
    { id: 4, name: 'Enzo Alves da Costa', avatar: studentAvatar4, role: 'Professor(a)' },
    { id: 5, name: 'Beatriz Martins', avatar: studentAvatar1, role: 'Aluno(a)' },
    { id: 6, name: 'Carlos Eduardo Lima', avatar: studentAvatar2, role: 'Professor(a)' },
    { id: 7, name: 'Daniela Ferreira', avatar: studentAvatar3, role: 'Professor(a)' },
    { id: 8, name: 'Gabriel Ribeiro', avatar: studentAvatar4, role: 'Professor(a)' },
    { id: 9, name: 'Helena Santos', avatar: studentAvatar1, role: 'Aluno(a)' },
    { id: 10, name: 'Isabela Rocha', avatar: studentAvatar2, role: 'Professor(a)' },
    { id: 11, name: 'João Victor Almeida', avatar: studentAvatar3, role: 'Professor(a)' },
];

interface StudentListItemProps {
    avatar: string;
    name: string;
    studentId: number;
    isSelected: boolean;
    onToggleSelect: (studentId: number) => void;
}

const StudentListItem: FC<StudentListItemProps> = ({
    avatar,
    name,
    studentId,
    isSelected,
    onToggleSelect,
}) => {
    return (
        <div className='relative flex flex-col lg:flex-row items-center bg-[#690808] p-3 rounded-lg w-full max-w-lg lg:w-[950px] lg:max-w-none shadow-[0_5px_15px_rgba(0,0,0,0.3)]'>
            <div className='flex items-center gap-1 md:gap-3 w-full lg:w-auto'>
                <img
                    src={avatar}
                    alt={name}
                    className='w-8 h-8 lg:w-10 lg:h-10 rounded-full flex-shrink-0'
                />
                <Award size={20} className='text-white flex-shrink-0 lg:w-6 lg:h-6' />

                {/* Linha vertical sempre na mesma posição */}
                <div className='h-8 lg:h-10 border-l border-white opacity-50 mx-1 flex-shrink-0' />

                {/* Nome */}
                <span className='flex-1 text-white truncate text-left text-[10px] md:text-[14px] lg:text-base'>
                    {name}
                </span>
            </div>

            {/* Caixa de seleção */}
            <div className='flex-shrink-0 flex items-center gap-3 lg:ml-auto'>
                <button
                    onClick={() => onToggleSelect(studentId)}
                    className={`flex items-center justify-center border-2 rounded-md w-6 h-6 transition-colors 
                        ${isSelected ? 'bg-white border-white' : 'border-white text-white'}
                    `}
                >
                    {isSelected && <X size={16} className='text-[#690808]' />}
                </button>
            </div>
        </div>
    );
};

export const DeletarUsuario: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [searchQuery, setSearchQuery] = useState('');
    const [alunos, setAlunos] = useState(initialAlunos);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage, setStudentsPerPage] = useState(5);

    useEffect(() => {
        const updateStudentsPerPage = () => {
            const newStudentsPerPage = window.innerWidth < 768 ? 4 : 4;
            setStudentsPerPage(newStudentsPerPage);
            if (newStudentsPerPage !== studentsPerPage) setCurrentPage(1);
        };

        updateStudentsPerPage();
        window.addEventListener('resize', updateStudentsPerPage);
        return () => window.removeEventListener('resize', updateStudentsPerPage);
    }, []);

    const handleToggleSelect = (studentId: number) => {
        setSelectedIds(prev =>
            prev.includes(studentId)
                ? prev.filter(id => id !== studentId)
                : [...prev, studentId]
        );
    };

    const filteredAlunos = alunos.filter(aluno =>
        aluno.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredAlunos.length / studentsPerPage);
    const startIndex = (currentPage - 1) * studentsPerPage;
    const endIndex = startIndex + studentsPerPage;
    const currentAlunos = filteredAlunos.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => setCurrentPage(page);

    const handleDelete = () => {
        if (selectedIds.length === 0) {
            setToast({ message: 'Selecione pelo menos um usuário para excluir.', type: 'error' });
            return;
        }
        setShowAlert(true);
    };

    const confirmDelete = () => {
        const remaining = alunos.filter(aluno => !selectedIds.includes(aluno.id));
        setAlunos(remaining);
        setSelectedIds([]);
        setShowAlert(false);
        setToast({ message: 'Usuário(s) excluído(s) com sucesso.', type: 'success' });
    };

    const mobileHeightClass = studentsPerPage === 4 ? 'h-[270px]' : 'h-full';

    return (
        <Box component='div' className='flex flex-col items-center justify-center h-full p-4 pt-4 relative'>
            <PageLayout
                title='DELETAR USUÁRIOS'
                icon={<UserMinus size={36} className='lg:w-[50px] lg:h-[50px]' />}
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
                        className={`flex-1 ${mobileHeightClass} flex flex-col gap-6 items-center overflow-y-auto pr-0 md:pr-2 mt-2 md:mt-4 mb-20`}
                    >
                        {currentAlunos.map((aluno) => (
                            <StudentListItem
                                key={aluno.id}
                                studentId={aluno.id}
                                name={aluno.name}
                                avatar={aluno.avatar}
                                isSelected={selectedIds.includes(aluno.id)}
                                onToggleSelect={handleToggleSelect}
                            />
                        ))}
                    </div>

                    {/* Botão Excluir */}
                    <div className='absolute bottom-24 right-6 lg:right-[128px]'>
                        <button
                            onClick={handleDelete}
                            className='bg-[#690808] hover:bg-red-900 text-white font-semibold py-4 px-8 rounded-lg transition-colors shadow-md'
                        >
                            Excluir Selecionados
                        </button>
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

            {/* Modal de confirmação */}
            <AlertModal
                isOpen={showAlert}
                onClose={() => setShowAlert(false)}
                onConfirm={confirmDelete}
                title='Tem certeza de que deseja excluir o(s) usuário(os) selecionado(s)?'
            >
                Todas as informações serão removidas permanentemente do sistema e não será mais possível recuperá-las.
            </AlertModal>

            {/* Toast de feedback */}
            {toast && (
                <FeedbackToast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </Box>
    );
};
