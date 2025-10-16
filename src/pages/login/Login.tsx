// src/pages/Login.tsx

import type { FC } from 'react';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// Componentes do MUI
import { Box, TextField, Button, Link, InputAdornment, IconButton } from '@mui/material';

// Ícones do MUI para consistência
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonOutline from '@mui/icons-material/PersonOutline';
import { useAuth } from '../../contexts/AuthContext';

export const Login: FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => setShowPassword(!showPassword);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Lógica de API viria aqui...

        // Simulando o login como coordenador para teste
        // login({
        //     id: 'coord-001',
        //     name: 'Coordenador Teste',
        //     email: 'coordenador@teste.com',
        //     role: 'coordenador',
        // });

        navigate('/'); // Navega para a home após o login
    };

    return (
        <div className='flex justify-center items-center h-screen bg-black text-gray-400'>
            <div className='flex flex-row w-full max-w-7xl h-[600px] items-center justify-center'>
                
                {/* Lado Esquerdo: Imagem (puro Tailwind) */}
                <div className='flex-1 hidden md:flex justify-center items-center h-full'>
                    <img src='/MorimitsuLogo.jpeg' alt='Logo Morimitsu Jiu Jitsu' className='w-[550px] h-[550px] object-contain' />
                </div>

                {/* Lado Direito: Formulário */}
                <div className='flex-1 flex justify-center items-center h-full p-8 md:p-12'>
                    <div className='w-full max-w-sm h-full flex flex-col'>
                        
                        {/* Título (puro Tailwind) */}
                        <div className='mb-10 border-b-2 border-[#690808] pb-1 self-center'>
                            <h1 className='text-white text-6xl font-normal tracking-wide'>SIGN IN</h1>
                        </div>

                        {/* O formulário usa componentes MUI estilizados com Tailwind */}
                        <Box component="form" onSubmit={handleSubmit} className='flex-grow flex flex-col'>
                            <div className='space-y-6 mt-4'>
                                <TextField
                                    required
                                    fullWidth
                                    label="Usuário:"
                                    variant="outlined"
                                    // Estilização customizada com Tailwind!
                                    className="[&_label]:!text-[#757575] [&_input]:!text-[#757575] [&_.MuiOutlinedInput-root]:!rounded-2xl [&_.MuiOutlinedInput-notchedOutline]:!border-[1.95px] [&_.MuiOutlinedInput-notchedOutline]:!border-[#757575]"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <PersonOutline className="text-[#757575]" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    label="Senha:"
                                    variant="outlined"
                                    type={showPassword ? 'text' : 'password'}
                                    className="[&_label]:!text-[#757575] [&_input]:!text-[#757575] [&_.MuiOutlinedInput-root]:!rounded-2xl [&_.MuiOutlinedInput-notchedOutline]:!border-[1.95px] [&_.MuiOutlinedInput-notchedOutline]:!border-[#757575]"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={togglePassword} edge="end">
                                                    {showPassword ? <Visibility className="text-[#757575]" /> : <VisibilityOff className="text-[#757575]" />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Link component={RouterLink} to="/recuperar-senha" className='!text-[#757575] !font-normal hover:!underline'>
                                    Esqueceu a senha?
                                </Link>
                            </div>
                            
                            <div className='flex-grow'></div>

                            <Button
                                type="submit"
                                variant="contained"
                                // Estilização direta com Tailwind! O '!' força a sobreposição.
                                className="!w-full !py-3 !bg-[#690808] !text-white !rounded-[10px] hover:!bg-red-800 !transition-colors !text-lg !normal-case"
                            >
                                Entrar
                            </Button>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
};