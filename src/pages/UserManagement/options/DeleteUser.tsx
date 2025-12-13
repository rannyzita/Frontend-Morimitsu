import { useState, type FC, useEffect } from 'react'; // Importar useEffect
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { PageLayout } from '../../../components/layout/BigCard';
import { Pagination } from '../../../components/Pagination/Pagination';
import { Award, UserMinus, X } from 'lucide-react';

import { SearchInput } from '../../../components/SearchInput/SearchInput';
import { AlertModal } from '../../../components/Alert/alert';
import { FeedbackToast } from '../../../components/Feedback/Feedback';
import { CustomCheckbox } from '../../../components/CheckBox/checkBox';

import studentAvatar1 from '../options/assetsTest/IconBaby.png';
import studentAvatar2 from '../options/assetsTest/TurmaInfantil.png';
import studentAvatar3 from '../options/assetsTest/iconMista.png';
import studentAvatar4 from '../options/assetsTest/IconBaby.png';

// Define o breakpoint de altura desejado
const HEIGHT_BREAKPOINT = 800;

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

            <CustomCheckbox
                checked={isSelected}
                onChange={() => onToggleSelect(studentId)}
            />
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
    
    // 1. Estado para o número de estudantes por página, com valor inicial padrão
    const [studentsPerPage, setStudentsPerPage] = useState(5); 

    // 2. Lógica para calcular studentsPerPage com base na altura da tela
    const calculateStudentsPerPage = () => {
        const screenHeight = window.innerHeight;
        
        // Define 5 para altura >= 800px, e 4 para altura < 800px
        const newStudentsPerPage = screenHeight >= HEIGHT_BREAKPOINT ? 5 : 4;
        
        setStudentsPerPage(newStudentsPerPage);
    };

    useEffect(() => {
        calculateStudentsPerPage(); 

        // Adiciona o event listener para redimensionamento
        window.addEventListener('resize', calculateStudentsPerPage);

        // Limpeza do event listener
        return () => {
            window.removeEventListener('resize', calculateStudentsPerPage);
        };
    }, []); // Executa apenas na montagem/desmontagem

    // Garante que a página atual não exceda o novo total de páginas após redimensionamento
    useEffect(() => {
        if (studentsPerPage > 0) {
            const maxPages = Math.ceil(filtered.length / studentsPerPage);
            if (currentPage > maxPages) {
                setCurrentPage(maxPages > 0 ? maxPages : 1);
            }
        }
    }, [studentsPerPage, alunos.length, searchQuery]);


    const filtered = alunos.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Usa a variável de estado
    const totalPages = Math.ceil(filtered.length / studentsPerPage);
    const current = filtered.slice((currentPage - 1) * studentsPerPage, currentPage * studentsPerPage);

    const toggle = (id: number) =>
        setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

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
                <div className='flex flex-col md:h-[600px] h-full gap-4 pt-8 lg:gap-2 lg:pt-4'>
                    
                    <SearchInput
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder='Digite o nome do usuário'
                        className='w-full max-w-sm mx-auto lg:w-[650px] lg:max-w-none lg:mx-auto'
                    />

                    <div className='flex-1 lg:min-h-[420px] flex flex-col gap-6 items-center overflow-y-auto mt-2 md:mt-8 mb-20'>
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

                    {/* posição do botão: mobile ↑ — iPad ↓ — desktop estável */}
                    <div className='absolute md:right-18 right-6 lg:right-[123px] bottom-[17%] md:bottom-[13%] lg:bottom-[12%]'>
                        <button
                            onClick={() => selectedIds.length ? setShowAlert(true) : setToast({ message: 'Selecione pelo menos um usuário.', type: 'error' })}
                            className='bg-[#690808] hover:bg-red-900 text-white font-semibold
                            py-3 px-4 text-sm md:py-4 md:px-8 lg:py-4 lg:px-8 lg:text-base
                            rounded-lg shadow-md transition-colors'
                        >
                            Excluir Selecionado(as)
                        </button>
                    </div>

                    <div className='absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[650px]'>
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </div>
                </div>
            </PageLayout>

            <AlertModal
                isOpen={showAlert}
                onClose={() => setShowAlert(false)}
                onConfirm={confirmDelete}
                title='Tem certeza de que deseja excluir o(s) usuário(os) selecionado(s)?'
            >
                Todas as informações serão removidas permanentemente do sistema e não poderão ser recuperadas.
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