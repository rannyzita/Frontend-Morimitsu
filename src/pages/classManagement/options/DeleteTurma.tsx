import { useState, type FC, type ReactNode } from 'react';
import { Box } from '@mui/material';
import { PageLayout } from '../../../components/layout/BigCardGray';
import { ActionSelectionScreen } from './ActionSelectScreen';
import { FeedbackToast } from '../../../components/Feedback/Feedback';

// Importe o seu ícone de exclusão
import deleteClassIcon from '../assets/Delete-Class.png';

// --- Dados Mock ---
const turmasMock = [
    { id: 1, label: 'Turma Baby', icon: 'https://placehold.co/32x32/1E1E1E/FFF?text=👶' },
    { id: 2, label: 'Turma Infantil', icon: 'https://placehold.co/32x32/1E1E1E/FFF?text=👧' },
    { id: 3, label: 'Turma Mista', icon: 'https://placehold.co/32x32/1E1E1E/FFF?text=🧑‍🤝‍🧑' },
];

// --- COMPONENTE: Modal de Confirmação (AJUSTADO PARA RESPONSIVIDADE) ---
interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    children: ReactNode;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, children }) => {
    if (!isOpen) return null;

    return (
        // Backdrop
        <div className='fixed inset-0
                        bg-black/40      
                        backdrop-blur-[4px]
                        flex items-center justify-center z-50'>

            {/* Conteúdo do Modal */}
            {/* Altura e largura ajustada para mobile (max-w-xs) e padding reduzido (p-6) */}
            <div className='bg-white text-black rounded-xl shadow-lg p-6 w-full max-w-xs sm:max-w-md mx-4'>
                <div className='text-center'>
                    {/* Título menor no mobile */}
                    <h2 className='text-xl font-bold mb-3 sm:text-2xl'>{title}</h2>
                    <div className='text-gray-600 text-sm mb-6'>
                        {children}
                    </div>
                </div>
                {/* Botões: Ocupam largura total (w-full) no mobile */}
                <div className='flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-8'>
                    <button
                        onClick={onClose}
                        // Botão Mobile: w-full e padding vertical maior (py-3)
                        className='bg-neutral-800 text-white font-semibold py-3 w-full rounded-lg hover:bg-neutral-700 transition-colors'
                    >
                        NÃO
                    </button>
                    <button
                        onClick={onConfirm}
                        // Botão Mobile: w-full e padding vertical maior (py-3)
                        className='bg-[#690808] text-white font-semibold py-3 w-full rounded-lg hover:bg-red-800 transition-colors'
                    >
                        SIM
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- COMPONENTE PRINCIPAL DA PÁGINA ---
export const DeleteTurma: FC = () => {
    const [turmaToDelete, setTurmaToDelete] = useState<number | null>(null);
    const [feedback, setFeedback] = useState({ visible: false, message: '', type: 'success' as 'success' | 'error' });

    const pageTitle = 'EXCLUIR TURMAS';
    // ÍCONE PRINCIPAL: Ajustado para responsividade
    const pageIcon = <img src={deleteClassIcon} alt='Excluir Turma' className='w-8 h-6 lg:w-12 lg:h-8' />;

    const handleOpenConfirmModal = (id: number) => {
        setTurmaToDelete(id);
    };

    const handleCloseConfirmModal = () => {
        setTurmaToDelete(null);
    };

    const handleConfirmDelete = () => {
        if (turmaToDelete === null) return;

        // Na aplicação real, a exclusão da turma seria feita aqui
        console.log(`Excluindo turma com ID: ${turmaToDelete}`);
        handleCloseConfirmModal();
        setFeedback({
            visible: true,
            message: 'Turma excluída com sucesso!',
            type: 'success'
        });
        // Lógica: Remover a turma de turmasMock se fosse um estado real
    };

    // Ajuste de Altura: Adicionando gap vertical para forçar o PageLayout a ser mais alto no mobile
    return (
        <Box
            component='div'
            className='flex flex-col items-center justify-center h-full p-4'
        >
            <PageLayout
                title={pageTitle}
                icon={pageIcon}
            >
                {/* Contêiner principal com espaçamento otimizado para mobile */}
                <div className='max-w-5xl mx-auto'>
                    <div className='flex flex-col gap-4 lg:gap-6'> 

                        <ActionSelectionScreen
                            instructionText='SELECIONE A TURMA QUE DESEJA EXCLUIR:'
                            items={turmasMock}
                            actionType='delete'
                            onActionClick={handleOpenConfirmModal}
                        />
                    </div>
                </div>

                <ConfirmationModal
                    isOpen={turmaToDelete !== null}
                    onClose={handleCloseConfirmModal}
                    onConfirm={handleConfirmDelete}
                    title='Tem certeza que deseja excluir a Turma selecionada?'
                >
                    <p>Ao confirmar, todos os dados da turma serão permanentemente removidos.</p>
                    <p className='mt-2 font-bold'>Esta ação não pode ser desfeita.</p>
                </ConfirmationModal>

                {feedback.visible && (
                    <FeedbackToast
                        message={feedback.message}
                        type={feedback.type}
                        onClose={() => setFeedback({ ...feedback, visible: false })}
                    />
                )}
            </PageLayout>
        </Box>
    );
};