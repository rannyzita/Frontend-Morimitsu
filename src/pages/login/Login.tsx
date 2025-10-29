import type { FC } from 'react';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, TextField, Button, Link, InputAdornment, IconButton } from '@mui/material';
import { Eye, EyeOff, Mail } from 'lucide-react';
import { useLogin } from '../../hooks/Uselogin';

export const Login: FC = () => {
    const { handleLogin, loading, error } = useLogin();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => setShowPassword(!showPassword);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleLogin(email, password);
    };

    return (
        <div className='flex justify-center items-start md:items-center min-h-screen text-gray-400 pt-16 md:pt-0'>

            <div className='flex flex-col md:flex-row w-full max-w-7xl h-auto md:h-[600px] items-center justify-center'>

                {/* Imagem */}
                <div className='flex-1 flex justify-center items-center h-full mb-8 md:mb-0'>
                    <img
                        src='/MorimitsuLogo.jpeg'
                        alt='Logo Morimitsu Jiu Jitsu'
                        className='w-[120px] h-[120px] md:w-[550px] md:h-[550px] object-contain'
                    />
                </div>

                {/* Formulário */}
                <div className='flex-1 flex justify-center items-center h-full w-full p-8 md:p-12'>
                    <div className='w-full max-w-sm h-auto flex flex-col'>

                        <div className='mb-10 border-b-2 border-[#690808] pb-1 self-center'>
                            <h1 className='text-white text-5xl md:text-6xl font-normal tracking-wide'>SIGN IN</h1>
                        </div>

                        <Box component='form' onSubmit={onSubmit} className='flex-grow flex flex-col'>
                            <div className='space-y-6 mt-4'>
                                <div>
                                    <label htmlFor='email' className='text-[#757575] text-lg mb-2 block'>Usuário:</label>
                                    <TextField
                                        required
                                        fullWidth
                                        id='email'
                                        variant='outlined'
                                        type='text'
                                        placeholder='Digite seu e-mail, CPF ou Matrícula'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='[&_input]:!text-[#9E9E9E] [&_.MuiOutlinedInput-root]:!rounded-2xl [&_.MuiOutlinedInput-notchedOutline]:!border-[1.95px] [&_.MuiOutlinedInput-notchedOutline]:!border-[#757575]'
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& input:-webkit-autofill': {
                                                    transition: 'background-color 5000s ease-in-out 0s',
                                                    boxShadow: '0 0 0 30px #000000 inset !important',
                                                    WebkitTextFillColor: '#9E9E9E !important',
                                                },
                                            },
                                        }}
                                        // InputProps={{
                                        //     endAdornment: (
                                        //         <InputAdornment position='end'>
                                        //             <Mail className='text-[#757575]' size={22} />
                                        //         </InputAdornment>
                                        //     ),
                                        // }}
                                    />
                                </div>

                                {/* Campo Senha */}
                                <div>
                                    <label htmlFor='password' className='text-[#757575] text-lg mb-2 block'>Senha:</label>
                                    <TextField
                                        required
                                        fullWidth
                                        id='password'
                                        variant='outlined'
                                        placeholder='Digite sua senha'
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className='[&_input]:!text-[#9E9E9E] [&_.MuiOutlinedInput-root]:!rounded-2xl [&_.MuiOutlinedInput-notchedOutline]:!border-[1.95px] [&_.MuiOutlinedInput-notchedOutline]:!border-[#757575]'
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
                                                <InputAdornment position='end'>
                                                    <IconButton onClick={togglePassword} edge='end' className='!text-[#75757S75]'>
                                                        {showPassword ? <Eye size={22} className='text-[#757575]' /> : <EyeOff size={22} className='text-[#757575]' />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <Link component={RouterLink} to='/recuperar-senha' className='!text-[#757575] !font-normal hover:!underline'>
                                    Esqueceu a senha?
                                </Link>
                            </div>

                            <div className='h-6 mt-4 text-left'>
                                {error && (
                                    <p className='text-red-500 text-sm'>{error}</p>
                                )}
                            </div>

                            <div className='flex-grow mt-8'></div>

                            <Button
                                type='submit'
                                variant='contained'
                                disabled={loading}
                                className='!w-full !py-3 !bg-[#690808] !text-white !rounded-[10px] hover:!bg-red-800 !transition-colors !text-lg !normal-case disabled:!bg-red-900/100'
                            >
                                {loading ? 'Entrando...' : 'Entrar'}
                            </Button>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
};