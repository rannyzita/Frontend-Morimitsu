import { useState, type FC, type ReactNode } from 'react';
import { Box } from '@mui/material';
import { PageLayout } from '../../../components/layout/BigCard';
import { FeedbackToast } from '../../../components/Feedback/Feedback';
import { FormField } from '../../../components/formField/formField';
import { ActionSelectionScreen } from './ActionSelectScreen';
import { User, SquarePen } from 'lucide-react';

// 2. Importando o seu ícone
import editClassIcon from '../assets/Edit-Class.png'

// --- Dados Mock ---
const turmasMock = [
    { id: 1, label: 'Turma Baby', icon: 'https://placehold.co/32x32/1E1E1E/FFF?text=👶', minAge: '4', maxAge: '6', responsible: 'Saulo Bezerra' },
    { id: 2, label: 'Turma Infantil', icon: 'https://placehold.co/32x32/1E1E1E/FFF?text=👧', minAge: '7', maxAge: '10', responsible: 'Outro Professor' },
    { id: 3, label: 'Turma Mista', icon: 'https://placehold.co/32x32/1E1E1E/FFF?text=🧑‍🤝‍🧑', minAge: '11', maxAge: '14', responsible: 'Saulo Bezerra' },
];

// --- Sub-componente para o Formulário de Edição (Passo 2) ---
const EditingForm: FC<{ turmaId: number }> = ({ turmaId }) => {
    const turmaData = turmasMock.find(t => t.id === turmaId);
    if (!turmaData) return <div>Turma não encontrada!</div>;

    const [turmaName, setTurmaName] = useState(turmaData.label);
    const [minAge, setMinAge] = useState(turmaData.minAge);
    const [maxAge, setMaxAge] = useState(turmaData.maxAge);
    const [responsible, setResponsible] = useState(turmaData.responsible);
    const [avatarImage, setAvatarImage] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<{ visible: boolean; message: string; type: 'success' | 'error'; }>({ visible: false, message: '', type: 'success' });

    const handleConfirmClick = () => {
        setFeedback({ visible: true, message: 'Turma editada com sucesso!', type: 'success' });
    };

    const AvatarUpload: FC<{ imageSrc: string | null; onEdit: () => void }> = ({ imageSrc, onEdit }) => (
        <div className='relative mx-auto w-24 h-24 md:w-32 md:h-32'>
            <div className='w-full h-full rounded-full bg-neutral-700 flex items-center justify-center'>
                {imageSrc ? <img src={imageSrc} alt='Avatar' className='w-full h-full rounded-full object-cover' /> : <User size={48} className='text-gray-500 md:w-[60px] md:h-[60px]' />}
            </div>
            {/* Ícone de edição menor no mobile (size=16) */}
            <button onClick={onEdit} className='absolute bottom-0 right-0 bg-neutral-600 p-1 rounded-full text-gray-300 cursor-pointer hover:text-white'>
                <SquarePen size={16} className='md:w-5 md:h-5'/>
            </button>
        </div>
    );

    return (
        <>
            <div className='flex flex-col justify-center min-h-[65vh] gap-10 px-4 md:px-16'>
                
                <div className='flex flex-col gap-8'>
                    <AvatarUpload imageSrc={avatarImage} onEdit={() => {}} />
                </div>
                
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 md:gap-y-6'>
                    <FormField label='Nome da Turma:' value={turmaName} onChange={setTurmaName} showEditIcon={true} />
                    <FormField label='Responsável:' value={responsible} onChange={setResponsible} isSelect={true} showEditIcon={true} />
                    <FormField label='Faixa Etária Mínima:' value={minAge} onChange={setMinAge} type='number' showEditIcon={true} />
                    <FormField label='Faixa Etária Máxima:' value={maxAge} onChange={setMaxAge} type='number' showEditIcon={true} />
                </div>
                
                {/* AJUSTE 3: Botão de Confirmação - Ocupa largura total no mobile, centralizado no desktop */}
                <div className='flex justify-center pt-3 md:pt-8'>
                    <button 
                        onClick={handleConfirmClick} 
                        // Mobile: w-full (largura total), py-2 (padding menor), px-4 (padding para evitar que o texto encoste nas bordas)
                        // Desktop: py-3 (padding maior), px-50 (valor original)
                        className='bg-[#690808] text-white font-semibold w-full max-w-sm py-4 px-4 rounded-lg 
                                   hover:bg-red-800 transition-colors shadow-[0_5px_15px_rgba(0,0,0,0.3)] 
                                   md:w-auto md:max-w-none md:py-3 md:px-50'
                    >
                        Confirmar Alterações
                    </button>
                </div>
            </div>
            {feedback.visible && <FeedbackToast message={feedback.message} type={feedback.type} onClose={() => setFeedback({ ...feedback, visible: false })} />}
        </>
    );
};


// --- Componente Principal que gerencia o fluxo (Mantido como estava) ---
export const EditTurma: FC = () => {
    const [selectedTurmaId, setSelectedTurmaId] = useState<number | null>(null);

    const isSelectionStep = selectedTurmaId === null;
    const pageTitle = isSelectionStep ? 'EDITAR TURMAS' : 'EDITAR TURMA';

    const pageIcon = <img src={editClassIcon} alt='Editar Turma' className='w-12 h-8' />;

    return (
        <Box 
            component='div' 
            className='flex flex-col items-center justify-center h-full p-4'
        >
            <PageLayout 
                title={pageTitle}
                icon={pageIcon}
            >
                {isSelectionStep ? (
                    <ActionSelectionScreen 
                        instructionText='SELECIONE A TURMA QUE DESEJA EDITAR:'
                        items={turmasMock}
                        actionType='edit'
                        onActionClick={(id) => setSelectedTurmaId(id)}
                    />
                ) : (
                    <EditingForm turmaId={selectedTurmaId!} />
                )}
            </PageLayout>
        </Box>
    );
};