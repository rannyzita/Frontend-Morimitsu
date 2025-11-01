import { useState, type FC, type ReactNode } from 'react';
import { Box } from '@mui/material';
import { PageLayout } from '../../../components/layout/BigCard'; 
import { FeedbackToast } from '../../../components/Feedback/Feedback'
import { FormField } from '../../../components/formField/formField';

import { User, SquarePen, ChevronDown } from 'lucide-react';

import createClassIcon from '../assets/Create-Class.png'; 

// --- Componente AvatarUpload (AJUSTADO PARA RESPONSIVIDADE) ---
const AvatarUpload: FC<{ imageSrc: string | null; onEdit: () => void }> = ({ imageSrc, onEdit }) => (
    // Largura/Altura: Menor (w-24) no mobile, maior (md:w-32) no desktop
    <div className='relative mx-auto w-24 h-24 md:w-32 md:h-32'>
        <div className='w-full h-full rounded-full bg-neutral-700 flex items-center justify-center'>
            {imageSrc ? (
                <img src={imageSrc} alt='Avatar da Turma' className='w-full h-full rounded-full object-cover' />
            ) : (
                // Ícone interno ajustado para mobile/desktop
                <User size={48} className='text-gray-500 md:w-[60px] md:h-[60px]' />
            )}
        </div>
        <button 
            onClick={onEdit}
            // Ícone de edição menor (size=16) no mobile
            className='absolute bottom-0 right-0 bg-neutral-600 p-1 rounded-full
                        text-gray-300 cursor-pointer hover:text-white md:p-1.5'
        >
            <SquarePen size={16} className='md:w-5 md:h-5' />
        </button>
    </div>
);


export const CreateTurma: FC = () => {
    
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
    
    const handleCreateClick = () => {
        setFeedback({ 
            visible: true, 
            message: 'Turma criada com sucesso!', 
            type: 'success' 
        });
    };

    return (
        <Box 
            component='div' 
            className='flex flex-col items-center justify-center h-full p-4'
        >
            <PageLayout 
                title='CRIAR TURMA' 
                // ÍCONE PRINCIPAL: Ajuste para responsividade (se necessário)
                icon={<img src={createClassIcon} alt='' className='w-8 h-6 lg:w-12 lg:h-8' />}
            >
                {/* AJUSTE 1: Espaçamento vertical e horizontal no contêiner principal do formulário */}
                <div className='flex flex-col justify-center min-h-[65vh] gap-8 px-4 md:gap-16 md:px-16'>
                    
                    {/* AVATAR UPLOAD */}
                    <AvatarUpload imageSrc={avatarImage} onEdit={handleAvatarEdit} />

                    {/* AJUSTE 2: Layout do Formulário (1 coluna no mobile, 2 no md) */}
                    {/* Reduzido o gap vertical e horizontal no mobile */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 md:gap-y-6 items-end'>
                        <FormField 
                            label='Nome da Turma:' 
                            value={turmaName} 
                            onChange={setTurmaName}
                        />
                        <FormField 
                            label='Responsável:' 
                            value={responsible} 
                            onChange={setResponsible}
                            isSelect={true}
                        />
                        <FormField label='Faixa Etária Mínima:' value={minAge} onChange={setMinAge} type='number' />
                        <FormField label='Faixa Etária Máxima:' value={maxAge} onChange={setMaxAge} type='number' />
                    </div>

                    {/* AJUSTE 3: Botão de Confirmação - Largura e Altura Maiores no Mobile */}
                    <div className='flex justify-center pt-4 md:pt-8'>
                        <button 
                            onClick={handleCreateClick}
                            // Largura total (w-full max-w-sm) e Altura maior (py-4) no mobile
                            className='bg-[#690808] text-white font-semibold w-full max-w-sm py-4 px-4 rounded-lg
                                        hover:bg-red-800 transition-colors shadow-[0_5px_15px_rgba(0,0,0,0.3)]
                                        md:w-auto md:max-w-none md:py-3 md:px-50'
                        >
                            Criar
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