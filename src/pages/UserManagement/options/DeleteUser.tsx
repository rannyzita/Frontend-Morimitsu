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
    { id: 1, name: 'Antônio Henrique Pereira da Silva', avatar: studentAvatar1 },
    { id: 2, name: 'Anna Cristina Laurencio de Oliveira', avatar: studentAvatar2 },
    { id: 3, name: 'Juliana Souza da Paz', avatar: studentAvatar3 },
    { id: 4, name: 'Enzo Alves da Costa', avatar: studentAvatar4 },
    { id: 5, name: 'Beatriz Martins', avatar: studentAvatar1 },
    { id: 6, name: 'Carlos Eduardo Lima', avatar: studentAvatar2 },
    { id: 7, name: 'Daniela Ferreira', avatar: studentAvatar3 },
    { id: 8, name: 'Gabriel Ribeiro', avatar: studentAvatar4 },
    { id: 9, name: 'Helena Santos', avatar: studentAvatar1 },
    { id: 10, name: 'Isabela Rocha', avatar: studentAvatar2 },
    { id: 11, name: 'João Victor Almeida', avatar: studentAvatar3 },
];

interface StudentListItemProps {
    avatar: string;
    name: string;
    studentId: number;
    isSelected: boolean;
    onToggleSelect: (studentId: number) => void;
}

const StudentListItem: FC<StudentListItemProps> = ({ avatar, name, studentId, isSelected, onToggleSelect }) => {
    return (
        <div className='relative flex items-center gap-2 md:gap-3 bg-[#690808] p-2 lg:p-3 rounded-lg
                        w-full max-w-lg lg:w-[950px] shadow-[0_5px_15px_rgba(0,0,0,0.3)]'>

            <img src={avatar} alt={name} className='w-8 h-8 lg:w-10 lg:h-10 rounded-full flex-shrink-0' />

            <Award size={18} className='text-white lg:w-6 lg:h-6' />

            <div className='h-8 lg:h-10 border-l border-white opacity-50 mx-1' />

            <span className='flex-1 text-white truncate text-[11px] md:text-[14px] lg:text-base'>
                {name}
            </span>

            <button
                onClick={() => onToggleSelect(studentId)}
                className={`flex items-center justify-center border-2 rounded-md w-5 h-5 md:w-6 md:h-6
                            transition-colors ${isSelected ? 'bg-white border-white' : 'border-white'}`}
            >
                {isSelected && <X size={14} className='text-[#690808]' />}
            </button>
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
    const [studentsPerPage] = useState(5); // igual ao VerUsuarios

    const filtered = alunos.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const totalPages = Math.ceil(filtered.length / studentsPerPage);
    const startIndex = (currentPage - 1) * studentsPerPage;
    const currentAlunos = filtered.slice(startIndex, startIndex + studentsPerPage);

    const toggle = (id: number) =>
        setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

    const handleDelete = () => {
        if (selectedIds.length === 0) {
            setToast({ message: 'Selecione pelo menos um usuário para excluir.', type: 'error' });
            return;
        }
        setShowAlert(true);
    };

    const confirmDelete = () => {
        setAlunos(alunos.filter(a => !selectedIds.includes(a.id)));
        setSelectedIds([]);
        setShowAlert(false);
        setToast({ message: 'Usuário(s) excluído(s) com sucesso.', type: 'success' });
    };

    return (
        <Box className='flex flex-col items-center justify-center h-full p-4 pt-4 relative'>
            <PageLayout
                title='EXCLUIR USUÁRIO'
                icon={<UserMinus size={36} className='lg:w-[50px] lg:h-[50px]' />}
                className='flex flex-col h-full relative'
            >
                <div className='flex flex-col h-full gap-4 pt-8'>

                    {/* Search Input igual original */}
                    <SearchInput
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder='Digite o nome do usuário'
                        className='w-full max-w-sm mx-auto lg:w-[650px]'
                    />

                    {/* Lista */}
                    <div className='flex-1 flex flex-col gap-6 items-center overflow-y-auto mt-2 mb-20 lg:min-h-[500px]'>
                        {currentAlunos.map(a => (
                            <StudentListItem key={a.id} {...a} studentId={a.id}
                                isSelected={selectedIds.includes(a.id)}
                                onToggleSelect={toggle}
                            />
                        ))}
                    </div>

                    {/* Botão responsivo igual estilo do VerUsuarios */}
                    <div className='absolute right-4 lg:right-[128px] bottom-[25%] sm:bottom-[22%] md:bottom-[18%]'>
                        <button
                            onClick={handleDelete}
                            className='bg-[#690808] hover:bg-red-900 text-white font-semibold
                                    py-2 px-4 text-sm lg:py-4 lg:px-8 lg:text-base rounded-lg shadow-md transition-colors'
                        >
                            Excluir Selecionados
                        </button>
                    </div>

                    {/* Paginação */}
                    <div className='absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[650px]'>
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </div>
                </div>
            </PageLayout>

            {/* Modal */}
            <AlertModal
                isOpen={showAlert}
                onClose={() => setShowAlert(false)}
                onConfirm={confirmDelete}
                title='Tem certeza de que deseja excluir o(s) usuário(os) selecionado(s)?'
            >
                Todas as informações serão removidas permanentemente do sistema.
            </AlertModal>

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
