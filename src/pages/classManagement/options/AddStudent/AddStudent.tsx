import { useState, type FC } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { PageLayout } from '../../../../components/layout/BigCard';
import { Pagination } from '../../../../components/Pagination/Pagination';
import { Award, UserPlus, X } from 'lucide-react';

import { SearchInput } from '../../../../components/SearchInput/SearchInput';
import { FeedbackToast } from '../../../../components/Feedback/Feedback';

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
        <div className='relative flex items-center bg-[#690808] p-2 lg:p-3 rounded-lg
                        w-full max-w-lg lg:w-[950px] lg:max-w-none shadow-[0_5px_15px_rgba(0,0,0,0.3)]'>

            <img src={avatar} alt={name} className='w-8 h-8 lg:w-10 lg:h-10 rounded-full flex-shrink-0' />

            <Award size={18} className='text-white lg:w-6 lg:h-6 ml-1' />

            <div className='h-8 lg:h-10 border-l border-white opacity-50 mx-2 flex-shrink-0' />

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

export const EnturmarAluno: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [searchQuery, setSearchQuery] = useState('');
    const [alunos, setAlunos] = useState(initialAlunos);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 4; 

    const filtered = alunos.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const totalPages = Math.ceil(filtered.length / studentsPerPage);
    const current = filtered.slice((currentPage - 1) * studentsPerPage, currentPage * studentsPerPage);

    const toggle = (id: number) =>
        setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

    const confirmEnturmar = () => {
        setToast({ message: 'Usuário(s) enturmado com sucesso!', type: 'success' });
        setSelectedIds([]);
    };

    return (
        <Box className='flex flex-col items-center justify-center h-full p-4 pt-4 relative'>
            <PageLayout
                title='ENTURMAR ALUNO'
                icon={<UserPlus size={36} className='lg:w-[50px] lg:h-[50px]' />}
                className='flex flex-col h-full relative'
            >
                <div className='flex flex-col md:h-[600px] h-full gap-4 pt-8 lg:gap-2 lg:pt-4'>
                    
                    <SearchInput
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder='Digite o nome do usuário'
                        className='w-full max-w-sm mx-auto lg:w-[650px] lg:max-w-none lg:mx-auto'
                    />

                    <div className='flex-1 lg:min-h-[400px] flex flex-col gap-6 items-center overflow-y-auto mt-2 md:mt-8 mb-20'>
                        {current.map(a => (
                            <StudentListItem
                                key={a.id}
                                {...a}
                                studentId={a.id}
                                isSelected={selectedIds.includes(a.id)}
                                onToggleSelect={toggle}
                            />
                        ))}
                    </div>

                    <div className='absolute md:right-18 right-6 lg:right-[125px] bottom-[20%] md:bottom-[13%] lg:bottom-[15%]'>
                        <button
                            onClick={() => selectedIds.length > 0 ? confirmEnturmar() : setToast({ message: 'Selecione pelo menos um usuário.', type: 'error' })}
                            className='bg-[#690808] hover:bg-red-900 text-white font-semibold
                            py-3 px-4 text-sm md:py-4 md:px-8 lg:py-4 lg:px-8 lg:text-base
                            rounded-lg shadow-md transition-colors'
                        >
                            Enturmar selecionado(as)
                        </button>
                    </div>

                    <div className='absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[650px]'>
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </div>
                </div>
            </PageLayout>

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
