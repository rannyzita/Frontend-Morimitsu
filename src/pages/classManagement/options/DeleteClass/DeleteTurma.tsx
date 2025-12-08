import { useState, type FC, type ReactNode } from 'react';
import { Box } from '@mui/material';
import { PageLayout } from '../../../../components/layout/BigCard';
import { ActionSelectionScreen } from '../ActionSelectScreen';
import { FeedbackToast } from '../../../../components/Feedback/Feedback';
import { AlertModal } from '../../../../components/Alert/alert';
import deleteClassIcon from '../../assets/Delete-Class.png';

// --- Dados Mock ---
const turmasMock = [
    { id: 1, label: 'Turma Baby', icon: 'https://placehold.co/32x32/1E1E1E/FFF?text=👶' },
    { id: 2, label: 'Turma Infantil', icon: 'https://placehold.co/32x32/1E1E1E/FFF?text=👧' },
    { id: 3, label: 'Turma Mista', icon: 'https://placehold.co/32x32/1E1E1E/FFF?text=🧑‍🤝‍🧑' },
];

export const DeleteTurma: FC = () => {
    const [turmaToDelete, setTurmaToDelete] = useState<number | null>(null);
    const [feedback, setFeedback] = useState({ visible: false, message: '', type: 'success' as 'success' | 'error' });

    const pageTitle = 'EXCLUIR TURMAS';
    const pageIcon = <img src={deleteClassIcon} alt='Excluir Turma' className='w-8 h-6 lg:w-12 lg:h-8' />;

    const handleOpenConfirmModal = (id: number) => {
        setTurmaToDelete(id);
    };

    const handleCloseConfirmModal = () => {
        setTurmaToDelete(null);
    };

    const handleConfirmDelete = () => {
        if (turmaToDelete === null) return;

        console.log(`Excluindo turma com ID: ${turmaToDelete}`);
        handleCloseConfirmModal();
        setFeedback({
            visible: true,
            message: 'Turma excluída com sucesso!',
            type: 'success'
        });
    };

    return (
        <Box
            component='div'
            className='flex flex-col items-center justify-center h-full p-4'
        >
            <PageLayout
                title={pageTitle}
                icon={pageIcon}
            >
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

                <AlertModal
                    isOpen={turmaToDelete !== null}
                    onClose={handleCloseConfirmModal}
                    onConfirm={handleConfirmDelete}
                    title='Tem certeza que deseja excluir a Turma selecionada?'
                >
                    <p>Ao confirmar, todos os dados da turma serão permanentemente removidos.</p>
                    <p className='mt-2 font-bold'>Esta ação não pode ser desfeita.</p>
                </AlertModal>

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