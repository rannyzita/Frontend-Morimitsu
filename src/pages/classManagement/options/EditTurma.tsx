import { useState, type FC, type ReactNode } from 'react';
import { Box } from '@mui/material';
import { PageLayout } from '../../../components/layout/BigCardGray'; 
import { FeedbackToast } from '../../../components/Feedback/Feedback'; 
import { FormField } from '../../../components/formField/formField';
import { User, SquarePen } from 'lucide-react';

import editClassIcon from '../assets/Edit-Class.png'; 

// --- Dados Mock (simulando o que viria do seu banco de dados) ---
const turmasMock = [
    { id: 1, label: 'Turma Baby', icon: 'https://placehold.co/32x32/1E1E1E/FFF?text=👶', minAge: '4', maxAge: '6', responsible: 'Saulo Bezerra' },
    { id: 2, label: 'Turma Infantil', icon: 'https://placehold.co/32x32/1E1E1E/FFF?text=👧', minAge: '7', maxAge: '10', responsible: 'Outro Professor' },
    { id: 3, label: 'Turma Mista', icon: 'https://placehold.co/32x32/1E1E1E/FFF?text=🧑‍🤝‍🧑', minAge: '11', maxAge: '14', responsible: 'Saulo Bezerra' },
];

// --- Sub-componente para o Formulário de Edição (conteúdo do Passo 2) ---
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
        <div className='relative mx-auto w-32 h-32'>
            <div className='w-full h-full rounded-full bg-neutral-700 flex items-center justify-center'>
                {imageSrc ? <img src={imageSrc} alt='Avatar' className='w-full h-full rounded-full object-cover' /> : <User size={60} className='text-gray-500' />}
            </div>
            <button onClick={onEdit} className='absolute bottom-0 right-0 bg-neutral-600 p-1.5 rounded-full text-gray-300 cursor-pointer hover:text-white'><SquarePen size={20} /></button>
        </div>
    );

    return (
        <>
            <div className='flex flex-col justify-center min-h-[65vh] gap-16 px-16'>
                <AvatarUpload imageSrc={avatarImage} onEdit={() => {}} />
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6'>
                    <FormField label='Nome da Turma:' value={turmaName} onChange={setTurmaName} showEditIcon={true} />
                    <FormField label='Responsável:' value={responsible} onChange={setResponsible} isSelect={true} showEditIcon={true} />
                    <FormField label='Faixa Etária Mínima:' value={minAge} onChange={setMinAge} type='number' showEditIcon={true} />
                    <FormField label='Faixa Etária Máxima:' value={maxAge} onChange={setMaxAge} type='number' showEditIcon={true} />
                </div>
                <div className='flex justify-center pt-8'>
                    <button onClick={handleConfirmClick} className='bg-[#690808] text-white font-semibold py-3 px-10 rounded-lg hover:bg-red-800 transition-colors shadow-[0_5px_15px_rgba(0,0,0,0.3)]'>
                        Confirmar Alterações
                    </button>
                </div>
            </div>
            {feedback.visible && <FeedbackToast message={feedback.message} type={feedback.type} onClose={() => setFeedback({ ...feedback, visible: false })} />}
        </>
    );
};

// --- Sub-componente para a Tela de Seleção (conteúdo do Passo 1) ---
const SelectionList: FC<{ onSelectTurma: (id: number) => void }> = ({ onSelectTurma }) => (
    <div className='flex flex-col items-center gap-6 mt-8'>
        <h2 className='text-gray-400 text-sm tracking-wider'>SELECIONE A TURMA QUE DESEJA EDITAR:</h2>
        <hr className='w-full border-white/20' />
        <div className='flex flex-col gap-4 w-full items-center mt-4'>
            {turmasMock.map(item => (
                <div key={item.id} className='flex items-center justify-between bg-[#690808] p-4 rounded-lg w-full max-w-lg shadow-[0_5px_15px_rgba(0,0,0,0.4)]'>
                    <div className='flex items-center gap-4'>
                        <img src={item.icon} alt={item.label} className='w-8 h-8 rounded-full' />
                        <span className='font-semibold text-lg'>{item.label}</span>
                    </div>
                    <button onClick={() => onSelectTurma(item.id)} className='text-white hover:text-gray-300'>
                        <SquarePen size={24} />
                    </button>
                </div>
            ))}
        </div>
    </div>
);


// --- Componente Principal que gerencia o fluxo ---
export const EditTurma: FC = () => {
    const [selectedTurmaId, setSelectedTurmaId] = useState<number | null>(null);

    const isSelectionStep = selectedTurmaId === null;
    const pageTitle = isSelectionStep ? 'EDITAR TURMAS' : 'EDITAR TURMA';
    
    // 2. AQUI ESTÁ A MUDANÇA: O ícone agora é sempre a sua imagem importada.
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
                    <SelectionList onSelectTurma={(id) => setSelectedTurmaId(id)} />
                ) : (
                    <EditingForm turmaId={selectedTurmaId!} />
                )}
            </PageLayout>
        </Box>
    );
};