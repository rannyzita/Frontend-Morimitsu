import { useState, type FC, type ReactNode } from 'react';
import { Box } from '@mui/material';
import { PageLayout } from '../../components/layout/BigCard';
import { SquarePen, LogOut, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

import FaixaTeste  from './assetsTest/FaixaPretaTeste.png'

const ProfileField: FC<{ 
    label: string, 
    value: string, 
    type?: string, 
    className?: string,
    startIcon?: ReactNode
}> = ({ 
    label, 
    value, 
    type = 'text', 
    className = '',
    startIcon
}) => (
    <div className={`flex flex-col gap-1 ${className}`}>
        <label className='text-sm text-gray-400 '>{label}</label>
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
                    readOnly 
                    className={`bg-neutral-700 p-3 rounded-lg w-full 
                                focus:outline-none text-white
                                ${startIcon ? 'pl-10' : ''} 
                            `}
                />
            </div>
            <SquarePen size={28} className='text-gray-400 cursor-pointer hover:text-white' />
        </div>
    </div>
);

interface GenderRadioProps {
    label: string;
    value: string;
    isChecked: boolean;
    onChange: (value: string) => void;
}

const GenderRadio: FC<GenderRadioProps> = ({ label, value, isChecked, onChange }) => {
    const radioId = `gender-radio-${value}`;
    return (
        <label htmlFor={radioId} className='flex items-center gap-3 text-white cursor-pointer'>
            <div className="relative w-5 h-5">
                
                <input 
                    type="radio" 
                    id={radioId}
                    name="gender" 
                    value={value} 
                    checked={isChecked}
                    onChange={() => onChange(value)}
                    className='peer absolute top-0 left-0 w-full h-full opacity-0'
                />
                
                <div className='w-5 h-5 rounded-full 
                                border-2 border-neutral-700
                                bg-transparent 
                                transition-colors duration-150
                                pointer-events-none
                                
                                // 3. Quando selecionado (peer-checked):
                                //    - O fundo muda para cinza (a cor que o pontinho tinha)
                                //    - A borda também muda para a mesma cor, para dar um look sólido.
                                peer-checked:bg-neutral-700
                                peer-checked:border-neutral-600
                                cursor-pointer'>
                </div>
            </div>
            <span>{label}</span>
        </label>
    );
};

// --- COMPONENTE PRINCIPAL Profile ---
export const Profile: FC = () => {
    const [gender, setGender] = useState('F');

    return (
        <Box component='div' className='flex flex-col items-center justify-center h-full p-4'>
            <PageLayout backPath='/home'>
                <div className='flex flex-col gap-6'>
                    
                    <div className='flex justify-between items-center bg-[#690808] p-4 rounded-lg'>
                        <div className='flex items-center gap-4'>
                            <img 
                                src={FaixaTeste} 
                                alt='Ícone de faixa' 
                                className='w-28 h-20' 
                            />
                            <div>
                
                                <div className='flex items-center gap-2'>
                                    <h1 className='text-xl md:text-2xl font-bold'>SAULO BEZERRA</h1>
                                    <SquarePen size={26} className='text-white cursor-pointer hover:text-white' />
                                </div>
                                <p className='text-sm text-gray-300'>Coordenador</p>
                            </div>
                        </div>
                        
                        <div className='relative flex 
                                        items-center justify-center flex-shrink-0 ml-2'>
                            <img 
                                src='/IconProfile.png' 
                                alt='Ícone de perfil' 
                                className='w-20 h-20 rounded-full' 
                            />
                            {/* Botão de edição sobre a imagem */}
                            <button className='absolute bottom-0 left-17 border-[#690808] 
                                            text-white cursor-pointer hover:text-white'>
                                <SquarePen size={20} />
                            </button>
                        </div>
                    </div>

                    <div>
                        <h2 className='text-2xl font-semibold text-center tracking-wide text-white'>DADOS PESSOAIS</h2>
                        <hr className='bg-white mt-3 h-0.5 border-0' />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'>
                        <ProfileField label='Nome Completo:' value='Nome completo do Usuário' />
                        <ProfileField 
                            label='Data de Nascimento:' 
                            value='18/01/1980' 
                            startIcon={<Calendar size={18} />} 
                        />
                        <ProfileField label='CPF:' value='XXX.XXX.XXX-XX' />
                        <div className='flex flex-col gap-2'>
                            <label className='text-sm text-gray-400'>Gênero:</label>
                            <div className='flex gap-4 pt-3'>
                                <GenderRadio label='Feminino' value='F' isChecked={gender === 'F'} onChange={setGender} />
                                <GenderRadio label='Masculino' value='M' isChecked={gender === 'M'} onChange={setGender} />
                                <GenderRadio label='Outro' value='O' isChecked={gender === 'O'} onChange={setGender} />
                            </div>
                        </div>
                        <ProfileField label='E-mail:' value='EmailDoUsuario@gmail.com' type='email' />
                        <ProfileField label='Endereço:' value='EnderecoDoUsuario, XXX, Bairro' />
                        <Link to='/recuperar-senha' className='w-full'>
                            <ProfileField label='Senha:' value='************' type='password' />    
                        </Link>
                        <ProfileField label='Telefone:' value='(XX) XXXXX-XXXX' />
                    </div>
                    
                    <div className='flex justify-end mt-4'>
                        <button className='flex items-center gap-2 text-white hover:text-white 
                                            transition-colors cursor-pointer'>
                            <span>Logout</span>
                            <LogOut size={32} />
                        </button>
                    </div>

                </div> 
            </PageLayout>
        </Box>
    )
}