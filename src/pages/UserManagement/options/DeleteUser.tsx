import { useState, type FC, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { PageLayout } from '../../../components/layout/BigCard';
import { Pagination } from '../../../components/Pagination/Pagination';
import { UserMinus, Award } from 'lucide-react';

import { SearchInput } from '../../../components/SearchInput/SearchInput';
import { AlertModal } from '../../../components/Alert/alert';
import { FeedbackToast } from '../../../components/Feedback/Feedback';
import { CustomCheckbox } from '../../../components/CheckBox/checkBox';

// Importe das funções da API e tipos
import { fetchUsuarios, deleteUsuario } from '../../../services/Usuario/Usuario'; 
import type { UsuarioResumo } from '../../../services/Usuario/types/types';

const HEIGHT_BREAKPOINT = 800;

const StudentListItem: FC<{
    avatar: string;
    name: string;
    studentId: string;
    isSelected: boolean;
    onToggleSelect: (studentId: string) => void;
}> = ({ avatar, name, studentId, isSelected, onToggleSelect }) => {
    return (
        <div className='relative flex items-center bg-[#690808] p-2 lg:p-3 rounded-lg
                        w-full max-w-lg lg:w-[950px] lg:max-w-none shadow-[0_5px_15px_rgba(0,0,0,0.3)]'>

            <img src={avatar || 'https://via.placeholder.com/40'} alt={name} className='w-8 h-8 lg:w-10 lg:h-10 rounded-full flex-shrink-0 object-cover' />

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
    const [usuarios, setUsuarios] = useState<UsuarioResumo[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage, setStudentsPerPage] = useState(4);

    const token = localStorage.getItem('token'); 

    const loadData = async () => {
        setLoading(true);
        try {
            const response = await fetchUsuarios(token);
            if (response.sucesso) {
                setUsuarios(response.dados);
            }
        } catch (error) {
            setToast({ message: 'Erro ao carregar usuários.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const calculateStudentsPerPage = () => {
        const screenHeight = window.innerHeight;
        setStudentsPerPage(screenHeight >= HEIGHT_BREAKPOINT ? 4 : 4);
    };

    useEffect(() => {
        calculateStudentsPerPage();
        window.addEventListener('resize', calculateStudentsPerPage);
        return () => window.removeEventListener('resize', calculateStudentsPerPage);
    }, []);

    const filtered = usuarios.filter(u => 
        u.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / studentsPerPage);
    const currentItems = filtered.slice(
        (currentPage - 1) * studentsPerPage, 
        currentPage * studentsPerPage
    );

    const toggle = (id: string) =>
        setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

    const confirmDelete = async () => {
        try {
            // Executa a deleção para todos os IDs selecionados
            await Promise.all(selectedIds.map(id => deleteUsuario(id, token)));
            
            setToast({ message: 'Usuário(s) excluído(s) com sucesso.', type: 'success' });
            setSelectedIds([]);
            setShowAlert(false);
            loadData(); // Recarrega a lista da API
        } catch (error) {
            setToast({ message: 'Erro ao excluir usuário(s).', type: 'error' });
        }
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
                        {loading ? (
                            <CircularProgress color="inherit" sx={{ mt: 10 }} />
                        ) : (
                            currentItems.map(user => (
                                <StudentListItem
                                    key={user.id}
                                    studentId={user.id}
                                    name={user.nome}
                                    avatar={user.fotoPerfil}
                                    isSelected={selectedIds.includes(user.id)}
                                    onToggleSelect={toggle}
                                />
                            ))
                        )}
                    </div>

                    {/* Botão com as classes originais restauradas */}
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
                        <Pagination 
                            currentPage={currentPage} 
                            totalPages={totalPages > 0 ? totalPages : 1} 
                            onPageChange={setCurrentPage} 
                        />
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