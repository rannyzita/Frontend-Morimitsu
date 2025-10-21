import { useState, type FC, type ReactNode } from 'react';
import { Box } from '@mui/material';
import { PageLayout } from '../../../components/layout/BigCardGray'; 
import { FeedbackToast } from '../../../components/Feedback/Feedback'; 
import { User, SquarePen, ChevronDown } from 'lucide-react'; 

const EditableFormField: FC<{
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    isSelect?: boolean;
}> = ({ label, value, onChange, type = 'text', isSelect = false }) => {
    const [isSelectOpen, setIsSelectOpen] = useState(false);

    return (
        <div className='flex flex-col gap-1'>
            <label className='text-sm text-gray-400'>{label}</label>
            <div className='flex items-center gap-3'>
                <div className='relative flex-1'>
                    {isSelect ? (
                        <>
                            <select
                                value={value}
                                onChange={(e) => {
                                    onChange(e.target.value);
                                    setIsSelectOpen(false);
                                }}
                                onMouseDown={() => setIsSelectOpen(true)}
                                onBlur={() => setIsSelectOpen(false)}
                                className='w-full bg-neutral-700 p-3 rounded-lg appearance-none focus:outline-none text-white border border-neutral-600'
                            >
                                <option value='Saulo Bezerra'>Saulo Bezerra</option>
                                <option value='Outro Professor'>Outro Professor</option>
                            </select>
                            <ChevronDown 
                                size={24} 
                                className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transition-transform duration-200 ${isSelectOpen ? 'rotate-180' : ''}`} 
                            />
                        </>
                    ) : (
                        <input 
                            type={type} 
                            value={value} 
                            onChange={(e) => onChange(e.target.value)}
                            className={`w-full bg-neutral-700 p-3 rounded-lg focus:outline-none text-white border border-neutral-600`}
                        />
                    )}
                </div>
                
                <SquarePen size={28} className='text-gray-400 cursor-pointer hover:text-white' />
            </div>
        </div>
    );
};

const AvatarUpload: FC<{ imageSrc: string | null; onEdit: () => void }> = ({ imageSrc, onEdit }) => (
    <div className='relative mx-auto w-32 h-32'>
        <div className='w-full h-full rounded-full bg-neutral-700 flex items-center justify-center'>
            {imageSrc ? (
                <img src={imageSrc} alt='Avatar da Turma' className='w-full h-full rounded-full object-cover' />
            ) : (
                <User size={60} className='text-gray-500' />
            )}
        </div>
        <button 
            onClick={onEdit}
            className='absolute bottom-0 right-0 bg-neutral-600 p-1.5 rounded-full
                        text-gray-300 cursor-pointer hover:text-white'
        >
            <SquarePen size={20} />
        </button>
    </div>
);

// --- Componente Principal EditTurma ---
export const EditTurma: FC = () => {
    
    const [turmaName, setTurmaName] = useState('Turma Baby');
    const [minAge, setMinAge] = useState('4');
    const [maxAge, setMaxAge] = useState('6');
    const [responsible, setResponsible] = useState('Saulo Bezerra');
    const [avatarImage, setAvatarImage] = useState<string | null>(null);

    const [feedback, setFeedback] = useState<{
        visible: boolean;
        message: string;
        type: 'success' | 'error';
    }>({ visible: false, message: '', type: 'success' });

    const handleAvatarEdit = () => {
        console.log('Editar avatar clicado!');
    };
    
    const handleConfirmClick = () => {
        setFeedback({ 
            visible: true, 
            message: 'Turma editada com sucesso!', 
            type: 'success' 
        });
    };

    return (
        <Box 
            component='div' 
            className='flex flex-col items-center justify-center h-full p-4'
        >
            <PageLayout 
                title='EDITAR TURMA' 
                icon={<SquarePen size={32} className='text-white' />} // Ícone alterado
            >
                <div className='flex flex-col justify-center min-h-[65vh] gap-16 px-16'>
                    <AvatarUpload imageSrc={avatarImage} onEdit={handleAvatarEdit} />

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6'>
                        {/* Componente de campo de formulário trocado para a versão com ícone de edição */}
                        <EditableFormField 
                            label='Nome da Turma:' 
                            value={turmaName} 
                            onChange={setTurmaName}
                        />
                        <EditableFormField 
                            label='Responsável:' 
                            value={responsible} 
                            onChange={setResponsible}
                            isSelect={true}
                        />
                        <EditableFormField label='Faixa Etária Mínima:' value={minAge} onChange={setMinAge} type='number' />
                        <EditableFormField label='Faixa Etária Máxima:' value={maxAge} onChange={setMaxAge} type='number' />
                    </div>

                    <div className='flex justify-center pt-8'>
                        <button 
                            onClick={handleConfirmClick}
                            className='bg-[#690808] text-white font-semibold py-3 px-50 rounded-lg
                                        hover:bg-red-800 transition-colors shadow-[0_5px_15px_rgba(0,0,0,0.3)]'>
                            Confirmar Alterações
                        </button>
                    </div>
                </div>
            </PageLayout>
            
            {feedback.visible && (
                <FeedbackToast
                    message={feedback.message}
                    type={feedback.type}
                    onClose={() => setFeedback({ ...feedback, visible: false })}
                />
            )}
        </Box>
    );
};