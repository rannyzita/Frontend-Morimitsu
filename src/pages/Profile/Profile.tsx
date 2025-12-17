import { useState, type FC, type ReactNode, useEffect, useCallback, useRef } from 'react';
import { Box } from '@mui/material';
import { PageLayout } from '../../components/layout/BigCardGray_';
import { SquarePen, LogOut, Save, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { updateUserProfile } from '../../services/profile/profile';  
import type { UserProfileUpdate } from '../../services/profile/types/types';
import FaixaTeste  from './assetsTest/FaixaPretaTeste.png'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import { ProfileDateField } from './components/ProfileDateField/ProfileDateField';
import { FeedbackToast } from '../../components/Feedback/Feedback';
import { updateProfileImage } from '../../services/profile/profile';

interface ProfileFieldProps {
    label: string;
    initialValue: string; 
    type?: string;
    className?: string;
    startIcon?: ReactNode;
    onSave: (newValue: string) => Promise<void>; 
}

const ProfileField: FC<ProfileFieldProps> = ({ 
    label, 
    initialValue, 
    type = 'text', 
    className = '',
    startIcon,
    onSave
}) => {
    const [value, setValue] = useState(initialValue); 
    const [isEditing, setIsEditing] = useState(false); 
    const [isSaving, setIsSaving] = useState(false); 
    const [originalValue, setOriginalValue] = useState(initialValue); 
    
    useEffect(() => {
        setValue(initialValue);
        setOriginalValue(initialValue);
    }, [initialValue]);

    const handleSave = async () => {
        if (value === originalValue) {
            setIsEditing(false); 
            return;
        }

        setIsSaving(true);
        try {
            await onSave(value); 
            setOriginalValue(value);
            setIsEditing(false);
        } catch (error) {
            console.error(`Erro ao salvar ${label}:`, error);
            setValue(originalValue);
            throw error; 
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setValue(originalValue);
        setIsEditing(false);
    };

    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <label className='text-[12px] lg:text-[14px] text-gray-400'>{label}</label>
            <div className='flex items-center gap-3'>
                <div className='flex-1 relative'>
                    {startIcon && (
                        <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                            {startIcon}
                        </div>
                    )}
                    <input 
                        type={type} 
                        value={value} 
                        readOnly={!isEditing || isSaving}
                        onChange={(e) => setValue(e.target.value)}
                        className={`bg-neutral-700 p-3 rounded-lg w-full 
                                    focus:outline-none text-white text-[12px] lg:text-[14px]
                                    ${startIcon ? 'pl-10' : ''} 
                                    ${isEditing ? 'border-2 border-yellow-500' : ''}
                                `}
                    />
                </div>
                
                <div className='flex gap-2'>
                    {isEditing ? (
                        <>
                            <button onClick={handleSave} disabled={isSaving || value === originalValue} title='Salvar' className='text-green-500 hover:text-green-300 disabled:text-gray-500 transition-colors'>
                                {isSaving ? '...' : <Save size={28} />}
                            </button>
                            <button onClick={handleCancel} disabled={isSaving} title='Cancelar' className='text-red-500 hover:text-red-300 disabled:text-gray-500 transition-colors'>
                                <X size={28} />
                            </button>
                        </>
                    ) : (
                        <button onClick={() => setIsEditing(true)} title='Editar' className='text-gray-400 cursor-pointer hover:text-white transition-colors'>
                            <SquarePen size={28} />
                        </button>
                    )}
                </div>
            </div>
            {isSaving && <p className='text-xs text-yellow-500'>Salvando...</p>}
        </div>
    );
};

interface ProfileHeaderFieldProps {
    initialValue: string;
    onSave: (newValue: string) => Promise<void>;
    textClasses: string; 
    inputClasses?: string;
}

const ProfileHeaderField: FC<ProfileHeaderFieldProps> = ({
    initialValue,
    onSave,
    textClasses,
    inputClasses = '',
}) => {
    const [value, setValue] = useState(initialValue);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [originalValue, setOriginalValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
        setOriginalValue(initialValue);
    }, [initialValue]);

    const handleSave = async () => {
        if (value === originalValue) {
            setIsEditing(false);
            return;
        }

        setIsSaving(true);
        try {
            await onSave(value);
            setOriginalValue(value);
            setIsEditing(false);
        } catch (error) {
            console.error('Erro ao salvar no cabeçalho:', error);
            setValue(originalValue);
            throw error; 
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setValue(originalValue);
        setIsEditing(false);
    };

    return (
        <div className='flex items-center gap-2'>
            {isEditing ? (
                <>
                    <input
                        type='text'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSave();
                            if (e.key === 'Escape') handleCancel();
                        }}
                        readOnly={isSaving}
                        className={`bg-neutral-800 p-1 rounded-md text-white ${inputClasses} ${isSaving ? 'opacity-70' : ''}`}
                    />
                    <button onClick={handleSave} disabled={isSaving || value === originalValue} title='Salvar' className='text-green-300 hover:text-green-100 disabled:text-gray-500 transition-colors'>
                        {isSaving ? '...' : <Save size={20} />}
                    </button>
                    <button onClick={handleCancel} disabled={isSaving} title='Cancelar' className='text-red-300 hover:text-red-100 disabled:text-gray-500 transition-colors'>
                        <X size={20} />
                    </button>
                </>
            ) : (
                <>
                    <h1 className={textClasses}>{value || 'Adicionar Nome Social'}</h1>
                    <button onClick={() => setIsEditing(true)} title='Editar Nome Social' className='text-white cursor-pointer hover:text-gray-300 transition-colors w-5 h-5'>
                        <SquarePen size={26} className='w-5 h-5'/>
                    </button>
                </>
            )}
        </div>
    );
};

interface GenderRadioProps {
    label: string;
    value: 'F' | 'M' | 'O';
    isChecked: boolean;
    onChange: (value: 'F' | 'M' | 'O') => void;
    disabled?: boolean;
}

const GenderRadio: FC<GenderRadioProps> = ({ label, value, isChecked, onChange, disabled }) => {
    const radioId = `gender-radio-${value}`;
    return (
        <label htmlFor={radioId} className={`flex items-center gap-3 text-white text-[12px] cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <div className='relative w-5 h-5'>
                
                <input 
                    type='radio' 
                    id={radioId}
                    name='gender' 
                    value={value} 
                    checked={isChecked}
                    onChange={() => onChange(value)}
                    disabled={disabled}
                    className='peer absolute top-0 left-0 w-full h-full opacity-0'
                />
                
                <div className='w-5 h-5 rounded-full 
                                border-2 border-neutral-700
                                bg-transparent 
                                transition-colors duration-150
                                pointer-events-none
                                peer-checked:bg-neutral-700
                                peer-checked:border-neutral-600
                                cursor-pointer'>
                </div>
            </div>
            <span>{label}</span>
        </label>
    );
};

export const Profile: FC = () => {
    const { user, token, logout, login, updateUser } = useAuth(); 
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handlePhotoChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!e.target.files?.[0] || !user || !token) return;

        const file = e.target.files[0];

        try {
            const imageUrl = uploadResponse.url;

            // 2️⃣ salva URL no perfil
            await updateProfileImage(user.id, imageUrl, token);

            // 3️⃣ atualiza tela
            setProfileData(prev => ({
                ...prev,
                imagem_perfil_url: imageUrl,
            }));

            // 4️⃣ atualiza AuthContext (sidebar, header, etc)
            updateUser({
                imagem_perfil_url: imageUrl,
            });

            displayStatusMessage('Foto atualizada com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao atualizar foto:', error);
            displayStatusMessage('Erro ao atualizar foto.', 'error');
        }
    };


    const [statusMessage, setStatusMessage] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    const [birthDate, setBirthDate] = useState<Date | null>(null);

    const [profileData, setProfileData] = useState<UserProfileUpdate>({
        nome: user?.nome || 'Nome Completo do Usuário',
        nome_social: (user as any)?.nome_social || '', 
        dataNascimento: '18/01/1980', 
        cpf: 'XXX.XXX.XXX-XX', 
        genero: 'F', 
        email: user?.email || 'EmailDoUsuario@gmail.com',
        endereco: 'EnderecoDoUsuario, XXX, Bairro', 
        telefone: '(XX) XXXXX-XXXX', 
        imagem_perfil_url: '/IconProfile.png',
    });

    const handleCloseFeedback = () => setStatusMessage(null);

    const displayStatusMessage = useCallback((message: string, type: 'success' | 'error') => {
        setStatusMessage({ message, type });
    }, []);
    
    const handleFieldUpdate = useCallback(async (fieldName: keyof UserProfileUpdate, newValue: string | 'F' | 'M' | 'O' | Date | null) => {
        if (!user || !token) {
            throw new Error('Usuário não autenticado.'); 
        }

        const dataToUpdate: Partial<UserProfileUpdate> = { [fieldName]: newValue };
        
        try {
            const updatedProfile = await updateUserProfile(String(user.id), dataToUpdate, token);
            

            setProfileData(prev => ({ ...prev, [fieldName]: newValue }));
            
            if (fieldName === 'nome_social' || fieldName === 'imagem_perfil_url') {
                updateUser({
                    [fieldName]: newValue as string,
                });
            }

            displayStatusMessage('Atualizado com sucesso!', 'success');

            if (fieldName === 'nome' || fieldName === 'email') {
                const updatedUser = {
                    ...user,
                    nome: fieldName === 'nome' ? (newValue as string) : user.nome,
                    email: fieldName === 'email' ? (newValue as string) : user.email,
                };
                login(token, updatedUser); 
            }
            
            console.log('Perfil atualizado com sucesso:', updatedProfile);

        } catch (error) {
            console.error('Falha ao atualizar o perfil:', error);
            displayStatusMessage('Erro ao atualizar o perfil. Tente novamente.', 'error');
            throw error; 
        }
    }, [user, token, login, displayStatusMessage]); 

    useEffect(() => {
        if (user) {
            const fetchProfileData = async () => {
                const response = await api.get(`/usuarios/${user.id}`);

                const apiData: UserProfileUpdate = {
                    nome: response.data.nome,
                    nome_social: response.data.nome_social,
                    dataNascimento: response.data.dataNascimento,
                    cpf: response.data.cpf,
                    genero: response.data.genero,
                    email: response.data.email,
                    endereco: response.data.endereco,
                    telefone: response.data.telefone,
                    imagem_perfil_url: response.data.imagem_perfil_url,
                };

                setProfileData(apiData);
            };

            fetchProfileData();
        }
    }, [user]); 

    if (!user) {
        return <Box component='div' className='flex justify-center items-center h-full'>Carregando ou usuário não autenticado.</Box>;
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>

            <Box component='div' className='flex flex-col items-center justify-center h-full p-4'>
                <PageLayout backPath='/home'>
                    <div className='flex flex-col gap-6'>
                        
                        <div className='flex justify-between items-center bg-[#690808] p-4 rounded-lg'>
                            <div className='flex items-center gap-4'>

                                <div className='flex flex-row'>
                                    <img 
                                        src={FaixaTeste} 
                                        alt='Ícone de faixa' 
                                        className='w-17 h-9 md:w-25 md:h-17' 
                                    />
                                    <SquarePen size={26} className='text-white cursor-pointer hover:text-white w-5 h-5' />
                                </div>
                                
                                <div className='md:ml-4'>
                                    <ProfileHeaderField
                                        initialValue={profileData.nome_social || profileData.nome} 
                                        onSave={(newValue) => handleFieldUpdate('nome_social', newValue)}
                                        textClasses='text-[10px] md:text-xl lg:text-2xl font-bold'
                                        inputClasses='w-56 md:w-80'
                                    />
                                    
                                    <div className='flex gap-2 mt-2'>
                                        <p className='text-[10px] md:text-sm text-white'>{user.tipo}</p>
                                        <SquarePen size={18} className='text-white cursor-pointer hover:text-white w-5 h-5' />
                                        <p className='text-[10px] md:text-sm'>Grau: 2</p>
                                        <SquarePen size={18} className='text-white cursor-pointer hover:text-white w-5 h-5' />
                                    </div> 
                                </div>
                            </div>
                            
                            <div className='relative flex 
                                            items-center justify-center flex-shrink-0 ml-2'>
                                <img 
                                    src={profileData.imagem_perfil_url} 
                                    alt='Ícone de perfil' 
                                    className='w-10 h-10 md:w-20 md:h-20 rounded-full' 
                                />
                                {/* Botão de edição sobre a imagem */}
                                <button className='absolute bottom-0 left-8 md:left-17 border-[#690808] 
                                                text-white cursor-pointer hover:text-white'>
                                    <SquarePen size={20} className='w-5 h-5'/>
                                </button>
                            </div>
                        </div>

                        <div>
                            <h2 className='text-2xl font-semibold text-center tracking-wide text-white'>DADOS PESSOAIS</h2>
                            <hr className='bg-white mt-3 h-0.5 border-0' />
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'>
                            {/* Nome Completo (Mantido editável) */}
                            <ProfileField 
                                label='Nome Completo:' 
                                initialValue={profileData.nome} 
                                onSave={(newValue) => handleFieldUpdate('nome', newValue)}
                            />
                            {/* Data de Nascimento */}
                            <ProfileDateField 
                                label='Data de Nascimento:' 
                                initialDate={birthDate}
                                onSave={(newDate) => handleFieldUpdate('dataNascimento', newDate)}
                            />

                            {/* CPF */}
                            <ProfileField 
                                label='CPF:' 
                                initialValue={profileData.cpf} 
                                onSave={(newValue) => handleFieldUpdate('cpf', newValue)}
                            />
                            {/* Gênero */}
                            <div className='flex flex-col gap-2'>
                                <label className='text-[12px] text-gray-400'>Gênero:</label>
                                <div className='flex gap-4 pt-3'>
                                    <GenderRadio 
                                        label='Feminino' 
                                        value='F' 
                                        isChecked={profileData.genero === 'F'} 
                                        onChange={(val) => handleFieldUpdate('genero', val)}
                                    />
                                    <GenderRadio 
                                        label='Masculino' 
                                        value='M' 
                                        isChecked={profileData.genero === 'M'} 
                                        onChange={(val) => handleFieldUpdate('genero', val)}
                                    />
                                    <GenderRadio 
                                        label='Outro' 
                                        value='O' 
                                        isChecked={profileData.genero === 'O'} 
                                        onChange={(val) => handleFieldUpdate('genero', val)}
                                    />
                                </div>
                            </div>
                            {/* Email */}
                            <ProfileField 
                                label='E-mail:' 
                                initialValue={profileData.email} 
                                type='email' 
                                onSave={(newValue) => handleFieldUpdate('email', newValue)}
                            />
                            {/* Endereço */}
                            <ProfileField 
                                label='Endereço:' 
                                initialValue={profileData.endereco} 
                                onSave={(newValue) => handleFieldUpdate('endereco', newValue)}
                            />
                            {/* Senha */}
                            <Link to='/recuperar-senha' className='w-full'>
                                <ProfileField 
                                    label='Senha:' 
                                    initialValue='************' 
                                    type='password' 
                                    onSave={async () => { }}
                                />    
                            </Link>
                            {/* Telefone */}
                            <ProfileField 
                                label='Telefone:' 
                                initialValue={profileData.telefone} 
                                onSave={(newValue) => handleFieldUpdate('telefone', newValue)}
                            />
                        </div>
                        
                        <div className='flex justify-end mt-10'>
                            <button 
                                onClick={logout} 
                                className='flex items-center gap-2 text-white hover:text-red-400 
                                                transition-colors cursor-pointer'>
                                <span>Logout</span>
                                <LogOut size={32} />
                            </button>
                        </div>
                    </div> 
                </PageLayout>

                {statusMessage && (
                    <FeedbackToast 
                        message={statusMessage.message}
                        type={statusMessage.type}
                        onClose={handleCloseFeedback}
                    />
                )}
            </Box>
        </LocalizationProvider>
    )
}