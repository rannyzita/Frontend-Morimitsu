import type { FC } from 'react';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { Box, TextField, Button, Link, InputAdornment, IconButton } from '@mui/material';

import { Eye, EyeOff, UserRound } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Login: FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => setShowPassword(!showPassword);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <div className='flex justify-center items-center h-screen text-gray-400'>
            <div className='flex flex-row w-full max-w-7xl h-[600px] items-center justify-center'>
                
                <div className='flex-1 hidden md:flex justify-center items-center h-full'>
                    <img src='/MorimitsuLogo.jpeg' alt='Logo Morimitsu Jiu Jitsu' className='w-[550px] h-[550px] object-contain' />
                </div>

                <div className='flex-1 flex justify-center items-center h-full p-8 md:p-12'>
                    <div className='w-full max-w-sm h-full flex flex-col'>
                        
                        <div className='mb-10 border-b-2 border-[#690808] pb-1 self-center'>
                            <h1 className='text-white text-6xl font-normal tracking-wide'>SIGN IN</h1>
                        </div>

                        <Box component="form" onSubmit={handleSubmit} className='flex-grow flex flex-col'>
                            <div className='space-y-6 mt-4'>
                                {/* Campo Usuário */}
                                <div>
                                    {/* 2. Separando o Label do TextField */}
                                    <label htmlFor='username' className='text-[#757575] text-lg mb-2 block'>Usuário:</label>
                                    <TextField
                                        required
                                        fullWidth
                                        id='username'
                                        variant="outlined"
                                        placeholder="Digite seu usuário"
                                        className="[&_input]:!text-[#9E9E9E] [&_.MuiOutlinedInput-root]:!rounded-2xl [&_.MuiOutlinedInput-notchedOutline]:!border-[1.95px] [&_.MuiOutlinedInput-notchedOutline]:!border-[#757575]"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& input:-webkit-autofill': {
                                                    transition: 'background-color 5000s ease-in-out 0s',
                                                    boxShadow: '0 0 0 30px #000000 inset !important',
                                                    WebkitTextFillColor: '#9E9E9E !important',
                                                },
                                            },
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <UserRound className="text-[#757575]" size={22} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>

                                {/* Campo Senha */}
                                <div>
                                    <label htmlFor='password' className='text-[#757575] text-lg mb-2 block'>Senha:</label>
                                    <TextField
                                        required
                                        fullWidth
                                        id='password'
                                        variant="outlined"
                                        placeholder="Digite sua senha"
                                        type={showPassword ? 'text' : 'password'}
                                        className="[&_input]:!text-[#9E9E9E] [&_.MuiOutlinedInput-root]:!rounded-2xl [&_.MuiOutlinedInput-notchedOutline]:!border-[1.95px] [&_.MuiOutlinedInput-notchedOutline]:!border-[#757575]"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& input:-webkit-autofill': {
                                                    transition: 'background-color 5000s ease-in-out 0s',
                                                    boxShadow: '0 0 0 30px #000000 inset !important',
                                                    WebkitTextFillColor: '#9E9E9E !important',
                                                },
                                            },
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={togglePassword} edge="end" className="!text-[#757575]">
                                                        {showPassword ? <Eye size={22} /> : <EyeOff size={22} />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <Link component={RouterLink} to="/recuperar-senha" className='!text-[#757575] !font-normal hover:!underline'>
                                    Esqueceu a senha?
                                </Link>
                            </div>
                            
                            <div className='flex-grow'></div>

                            <Button
                                type="submit"
                                variant="contained"
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