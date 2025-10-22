import type { FC } from 'react';
import { useState } from 'react'; 
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// Importa sua instância 'api' configurada
import api from '../../../API/api';

import { Box, TextField, Button, Link, InputAdornment, IconButton } from '@mui/material';
import { Eye, EyeOff, Mail } from 'lucide-react'; 

// Importa o hook do seu contexto de autenticação
import { useAuth } from '../../contexts/AuthContext';

export const Login: FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); 
    
    // O usuário digita o e-mail, então o estado 'email' está correto
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    
    // Estados para feedback do usuário
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const togglePassword = () => setShowPassword(!showPassword);

    /**
     * Lida com o submit do formulário de login
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
        setError(null);     
        setLoading(true);   

        try {
            // 1. Chamar a API (ATUALIZADO: enviando 'identifier')
            // O valor vem do estado 'email', mas a chave é 'identifier'
            const response = await api.post('/auth/login', {
                identifier: email, // <--- MUDANÇA AQUI
                password: password
            });

            // 2. Extrair o token da resposta
            const token = response.data.token || response.data.accessToken;

            if (token) {
                // 3. Chamar a função 'login' do seu AuthContext
                login(token);

                // 4. Redirecionar para a home APÓS o login
                navigate('/home');
            } else {
                throw new Error('Token não recebido da API.');
            }

        } catch (err: any) {
            // 5. Tratar erros da API
            console.error('Falha no login:', err);
            // ATUALIZADO: Mensagem de erro
            setError(err.response?.data?.message || 'Identificador ou senha inválidos.');
        
        } finally {
            // 6. Parar o loading
            setLoading(false);
        }
    };

    return (
        // O RESTANTE DO SEU JSX ESTÁ PERFEITO E NÃO PRECISA MUDAR
        // O usuário vê um campo de "E-mail" e o valor é salvo no estado 'email'
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

                        <Box component='form' onSubmit={handleSubmit} className='flex-grow flex flex-col'>
                            <div className='space-y-6 mt-4'>
                                
                                {/* Campo E-mail (o usuário vê 'E-mail') */}
                                <div>
                                    <label htmlFor='email' className='text-[#757575] text-lg mb-2 block'>E-mail:</label>
                                    <TextField
                                        required
                                        fullWidth
                                        id='email'
                                        variant='outlined'
                                        type='email' 
                                        placeholder='Digite seu e-mail' 
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
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <Mail className='text-[#757575]' size={22} />
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
                            
                            {/* Espaço para exibir mensagens de erro */}
                            <div className='h-6 mt-4 text-center'>
                                {error && (
                                    <p className='text-red-500 text-sm'>{error}</p>
                                )}
                            </div>
                            
                            {/* Espaçador flexível */}
                            <div className='flex-grow mt-8'></div>

                            {/* Botão de Entrar com estado de loading */}
                            <Button
                                type='submit'
                                variant='contained'
                                disabled={loading} 
                                className='!w-full !py-3 !bg-[#690808] !text-white !rounded-[10px] hover:!bg-red-800 !transition-colors !text-lg !normal-case disabled:!bg-red-900/50'
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