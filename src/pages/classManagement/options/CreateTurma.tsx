import { useState, type FC, type ReactNode } from 'react';
import { Box } from '@mui/material';
import { PageLayout } from '../../../components/layout/BigCardGray';
import { User, SquarePen, ChevronDown, Calendar } from 'lucide-react';

import createClassIcon from '../assets/Create-Class.png';

interface FormFieldProps {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    icon?: ReactNode; 
    isSelect?: boolean;
    className?: string;
}

const FormField: FC<FormFieldProps> = ({ label, placeholder, value, onChange, type = 'text', icon, isSelect = false, className = '' }) => {
    const [isSelectOpen, setIsSelectOpen] = useState(false);

    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <label className='text-sm text-gray-400'>{label}</label>
            <div className='relative'>
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
                    <>
                        <input 
                            type={type} 
                            placeholder={placeholder}
                            value={value} 
                            onChange={(e) => onChange(e.target.value)}
                            className={`w-full bg-neutral-700 p-3 rounded-lg focus:outline-none text-white border border-neutral-600 ${icon ? 'pl-10' : ''}`}
                        />
                        {icon && (
                            <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                                {icon}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

interface AvatarUploadProps {
    imageSrc: string | null;
    onEdit: () => void;
}

const AvatarUpload: FC<AvatarUploadProps> = ({ imageSrc, onEdit }) => (
    <div className='relative mx-auto w-38 h-38'>
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
            <SquarePen size={28} />
        </button>
    </div>
);


export const CreateTurma: FC = () => {
    
    const [turmaName, setTurmaName] = useState('Turma Baby');
    const [minAge, setMinAge] = useState('4');
    const [maxAge, setMaxAge] = useState('6');
    const [responsible, setResponsible] = useState('Saulo Bezerra');
    const [avatarImage, setAvatarImage] = useState<string | null>(null);

    const handleAvatarEdit = () => {
        console.log('Editar avatar clicado!');
    };
    
    return (
        <Box 
            component='div' 
            className='flex flex-col items-center justify-center h-full p-4'
        >
            <PageLayout 
                title='CRIAR TURMA' 
                icon={<img src={createClassIcon} alt='' className='w-12 h-8' />}
            >
                <div className='flex flex-col justify-center min-h-[65vh] gap-16 px-16'>

                    {/* 1. Avatar */}
                    <AvatarUpload imageSrc={avatarImage} onEdit={handleAvatarEdit} />

                    {/* 2. Grid de Formulários */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 items-end'>
                        
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

                    {/* 3. Botão Criar */}
                    <div className='flex justify-center'>
                        <button className='bg-[#690808] text-white font-semibold py-3 px-50 rounded-lg
                                        hover:bg-red-800 transition-colors shadow-[0_5px_15px_rgba(0,0,0,0.3)]'>
                            Criar
                        </button>
                    </div>
                </div>
            </PageLayout>
        </Box>
    );
};