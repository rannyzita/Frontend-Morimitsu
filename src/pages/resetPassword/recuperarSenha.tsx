import type { FC } from 'react';
import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import api from '../../../API/api'; 
import { useAuth } from '../../contexts/AuthContext';

import { Box, TextField, Button, Link, InputAdornment, IconButton, Alert, CircularProgress } from '@mui/material'; 

// Ícones do Lucide
import { Mail, Eye, EyeOff } from 'lucide-react';

type CodeInputProps = {
    value: string;
    index: number;
    onChange: (index: number, value: string) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const RecuperarSenha: FC = () => {

    const { token } = useAuth(); // Token do usuário logado
    const navigate = useNavigate();
    const [step, setStep] = useState<'email' | 'code' | 'reset'>('email');
    
    // Estados para o fluxo de recuperação
    const [email, setEmail] = useState('');
    const [code, setCode] = useState<string[]>(Array(5).fill(''));
    const [newPassword, setNewPassword] = useState(''); // Novo estado para a nova senha
    const [confirmPassword, setConfirmPassword] = useState(''); // Novo estado para confirmação

    // Estados de UI e Feedback (ADICIONADOS)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const [loadingResend, setLoadingResend] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmer, setShowPasswordConfirmer] = useState(false);

    useEffect(() => {
        const nextEmptyIndex = code.findIndex(digit => digit === '');
        if (nextEmptyIndex !== -1 && step === 'code') {
            inputRefs.current[nextEmptyIndex]?.focus();
        }
    }, [code, step]);
    
    // Limpa erros e mensagens ao mudar de passo
    useEffect(() => {
        setError(null);
        setSuccessMessage(null);
    }, [step]);


    // IMPLEMENTAÇÃO DE REENVIO DE CÓDIGO COM API
    const handleResendCode = async () => {
        setLoadingResend(true);
        setError(null);
        setSuccessMessage(null);

        // Se o token estiver disponível, usa-o para o header
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

        try {
            await api.post('/auth/request/reset', { identifier: email }, config);
            setSuccessMessage('Novo código enviado com sucesso!');
        } catch (err: any) {
            console.error("Erro ao reenviar código:", err);
            const errorMessage = err.response?.data?.message || 'Erro ao reenviar. Tente novamente.';
            setError(errorMessage);
        } finally {
            setLoadingResend(false);
        }
    };


    const handleCodeChange = (index: number, value: string) => {
        setError(null);
        const digit = value.slice(-1);
        if (/^[0-9]*$/.test(digit)) {
            const updatedCode = [...code];
            updatedCode[index] = digit;
            setCode(updatedCode);
            
            // Mover foco para o próximo campo
            if (digit !== '' && index < 4) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const togglePassword = () => setShowPassword(!showPassword);
    const togglePasswordConfirmer = () => setShowPasswordConfirmer(!showPasswordConfirmer);

    const CodeInput = React.forwardRef<HTMLInputElement, CodeInputProps>(
        ({ value, index, onChange, onKeyDown }, ref) => (
            <input
                ref={ref}
                type='text'
                maxLength={1}
                value={value}
                onChange={(e) => onChange(index, e.target.value)}
                onKeyDown={onKeyDown}
                id={`code-input-${index}`}
                className='w-12 h-14 text-3xl text-center border-[1.95px] border-[#757575] rounded-lg focus:outline-none focus:border-[#690808] transition-colors caret-[#690808] bg-white text-black'
                required
            />
        )
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && code[index] === '' && index > 0) {
            e.preventDefault();
            const prevInput = inputRefs.current[index - 1];
            if (prevInput) {
                prevInput.focus();
                const newCode = [...code];
                newCode[index - 1] = '';
                setCode(newCode);
            }
        }
    };


    // IMPLEMENTAÇÃO DA CHAMADA DE API PARA SOLICITAR CÓDIGO
    const handleSendEmailClick = async () => {
        if (!email) {
            setError('Por favor, digite seu e-mail.');
            return;
        }
    
        setLoading(true);
        setError(null);
        setSuccessMessage(null);
        
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    
        try {
            // CORREÇÃO DO ENDPOINT: /auth/request-reset
            await api.post('/auth/request-reset', { identifier: email }, config);
            
            setSuccessMessage('Código enviado! Por favor, verifique seu e-mail.');
            setStep('code'); 
        } catch (err: any) {
            console.error("Erro ao solicitar código:", err);
            const errorMessage = err.response?.data?.message || 'E-mail não encontrado ou erro no servidor.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };


    // IMPLEMENTAÇÃO DE CHAMADA DE API PARA ATUALIZAR SENHA
    const handleContinueSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setLoading(true); // Ativa o loading para as etapas 'code' e 'reset'
    
        // Lógica para a etapa 'email' (onde o submit foi desativado):
        if (step === 'email') {
            // Se, por algum motivo (como um usuário pressionar Enter), o submit for disparado
            // na etapa 'email', simplesmente ignoramos o processamento e desativamos o loading.
            setLoading(false);
            // Opcional: Se já tiver sucesso, podemos avançar (mas a lógica no onClick do botão é melhor)
            // if (successMessage) { setStep('code'); } 
            return; 
        } 
        
        // Lógica para a etapa 'code' (VALIDAÇÃO DO CÓDIGO E AVANÇO)
        else if (step === 'code') {
            
            // 1. Valida o preenchimento do código (5 dígitos)
            const fullCode = code.join('');
            if (fullCode.length !== 5 || !/^\d{5}$/.test(fullCode)) {
                setError('O código deve conter 5 dígitos.');
                setLoading(false);
                return;
            }
    
            // 2. Se for válido, avança para a próxima etapa (a validação da API será no 'reset')
            setStep('reset');
            setLoading(false); // Desativa o loading após a validação do front-end
            
            // Retorna para interromper a execução
            return; 
    
        } 
        
        // Lógica para a etapa 'reset' (CHAMADA DE API PARA ATUALIZAR SENHA)
        else if (step === 'reset') {
            
            // Validações de senha (front-end)
            if (newPassword !== confirmPassword) {
                setError('As novas senhas não coincidem.');
                setLoading(false);
                return;
            }
            if (newPassword.length < 8) {
                 setError('A nova senha deve ter no mínimo 8 caracteres.');
                 setLoading(false);
                 return;
            }
            // *Recomendado:* Adicione validação regex para maiúscula/número aqui
            
            // ETAPA 3: ATUALIZAR SENHA VIA API
            const resetToken = code.join(''); // O código de 5 dígitos é o token
    
            // Configuração de headers
            const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    
            try {
                await api.post('/auth/reset-password', {
                    token: resetToken,
                    newPassword: newPassword,
                }, config);
    
                setSuccessMessage('Senha atualizada com sucesso! Você será redirecionado.');
                // Navega após um breve delay
                setTimeout(() => navigate('/login'), 3000); 
    
            } catch (err: any) {
                console.error("Erro ao resetar senha:", err);
                const errorMessage = err.response?.data?.message || 'Erro ao alterar a senha. Código inválido ou erro interno.';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        // Wrapper principal (Layout responsivo)
        <div className='flex justify-center items-start md:items-center min-h-screen text-gray-400 pt-16 md:pt-0'>
            
            <div className='flex flex-col md:flex-row w-full max-w-7xl h-auto md:h-[600px] items-center justify-center'>
                
                {/* Imagem */}
                <div className='flex-1 flex justify-center items-center h-full mb-8 md:mb-0'>
                    <img src='/MorimitsuLogo.jpeg' alt='Logo Morimitsu Jiu Jitsu' className='w-[120px] h-[120px] md:w-[550px] md:h-[550px] object-contain' />
                </div>
    
                {/* Formulário */}
                <div className='flex-1 flex justify-center items-center h-full w-full p-8 md:p-12'>
                    <div className='w-full max-w-sm h-auto flex flex-col'>
                        
                        {/* MENSAGENS DE FEEDBACK (POSICIONADO NO INÍCIO E COM ESTILO CORRIGIDO) */}
                        {(error || successMessage) && (
                            <Alert 
                                severity={error ? "error" : "success"} 
                                className={`!mb-4 ${successMessage ? '!bg-green-700/10 !text-green-400 !border !border-green-600' : ''}`}
                                sx={{
                                    // Ajuste fino via SX para forçar o alinhamento do conteúdo (ícone e texto)
                                    // Faz o container usar flexbox reverso para alinhar à direita (sucesso)
                                    '& .MuiAlert-root': {
                                        display: 'flex',
                                        flexDirection: successMessage ? 'row-reverse' : 'row',
                                        justifyContent: successMessage ? 'flex-end' : 'flex-start', // Alinha a direita se for sucesso
                                        alignItems: 'center',
                                    },
                                    // Posiciona o ícone do lado direito na mensagem de sucesso
                                    '& .MuiAlert-icon': { 
                                        color: successMessage ? '#34D399 !important' : 'inherit',
                                        marginRight: successMessage ? '0' : '8px', 
                                        marginLeft: successMessage ? '8px' : '0', // Adiciona margem à esquerda do ícone (direita do texto)
                                    },
                                    textAlign: successMessage ? 'right' : 'left', // Alinha o texto da mensagem
                                }}
                            >
                                {error || successMessage}
                            </Alert>
                        )}
    
                        {/* ETAPA 1: PEDIR O E-MAIL (CORRIGIDA) */}
                        {step === 'email' && (
                            // Mantemos o 'onSubmit' aqui, mas ele só será acionado se o usuário apertar ENTER em um campo de texto.
                            // O 'handleContinueSubmit' nesta etapa ignora a submissão, como definido na função que corrigimos.
                            <Box component="form" onSubmit={handleContinueSubmit} className='flex-grow flex flex-col'>
                                {/* AQUI: mb-10 (igual ao Login) */}
                                <div className='mb-6 self-center'>
                                    <h1 className='text-white text-3xl sm:text-5xl font-normal tracking-wide sm:whitespace-nowrap border-b-2 border-[#690808] pb-2'>ATUALIZAR SENHA</h1>
                                </div>
                                <div className='space-y-6'>
                                    <p className='text-center text-white leading-relaxed text-[13px] md:text-base'>
                                        Para iniciar a atualização, digite seu e-mail de cadastro para que possamos enviar o código de 5 dígitos. Lembre-se de verificar sua caixa de spam caso não receba a mensagem em alguns minutos.
                                    </p>
                                    <div>
                                        <label htmlFor='email' className='text-[#9E9E9E] text-base md:text-lg mb-2 block'>E-mail:</label>
                                        <TextField 
                                            required fullWidth id='email' variant="outlined" 
                                            value={email} onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Digite seu e-mail"
                                            className="[&_input]:!text-white [&_.MuiOutlinedInput-root]:!rounded-2xl [&_.MuiOutlinedInput-notchedOutline]:!border-[1.95px] [&_.MuiOutlinedInput-notchedOutline]:!border-[#757575]"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active': {
                                                        transition: 'background-color 5000s ease-in-out 0s',
                                                        boxShadow: '0 0 0 30px #000000 inset !important',
                                                        WebkitTextFillColor: '#757575 !important',
                                                    },
                                                },
                                            }}
                                        />
                                    </div>
                                    {/* BOTÃO PRINCIPAL: Envia o e-mail e mostra o loading */}
                                    <Button 
                                        onClick={handleSendEmailClick} 
                                        type='button' // CORREÇÃO: Essencial para evitar o submit e o reload.
                                        variant="contained" 
                                        className='!w-full !py-2 md:!py-3 !bg-[#690808] !text-white !rounded-[10px] hover:!bg-red-800 !text-base md:!text-lg !normal-case'
                                        disabled={loading || !email}
                                    >
                                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Enviar E-mail'}
                                    </Button>
                                </div>
                                <div className='flex-grow mt-8'></div>
                                <div className='flex items-center justify-between mt-12'>
                                    <Link component={RouterLink} to='/login' className='!text-white !font-normal hover:!underline !pl-4'>Voltar</Link>
                                    {/* BOTÃO SECUNDÁRIO/FLUXO: Avance SOMENTE se o sucesso foi alcançado */}
                                    <Button 
                                        onClick={() => {
                                            // Se a mensagem de sucesso estiver visível, significa que o e-mail foi enviado.
                                            if (successMessage && !error) { 
                                                setStep('code'); // Avança para a próxima tela sem recarregar
                                            } else {
                                                // Se não houver sucesso (e-mail não enviado), ele tenta enviar novamente
                                                handleSendEmailClick(); 
                                            }
                                        }}
                                        type='button' // CORREÇÃO: Essencial para evitar o submit e o reload.
                                        variant="contained" 
                                        className='!px-12 !py-2 md:!py-3 !bg-[#690808] !text-white !rounded-[10px] hover:!bg-red-800'
                                        // O botão deve ser habilitado apenas após o sucesso
                                        disabled={loading || !email || !(!!successMessage && !error)} 
                                    >
                                        {'Continuar'}
                                    </Button>
                                </div>
                            </Box>
                        )}
    
                        {/* ETAPA 2: INSERIR O CÓDIGO (OK) */}
                        {step === 'code' && (
                            <Box component="form" onSubmit={handleContinueSubmit} className='flex-grow flex flex-col'>
                                {/* AQUI: mb-10 (igual ao Login) */}
                                <div className='mb-10 self-center'>
                                    <h1 className='text-white text-2xl md:text-5xl font-normal tracking-wide whitespace-nowrap border-b-2 border-[#690808] pb-2'>CÓDIGO DE RECUPERAÇÃO</h1>
                                </div>
                                <div className='space-y-6'>
                                    <p className='text-center text-white leading-relaxed text-[13px] md:text-base'>
                                        Agora, insira o código que enviamos para o seu e-mail **{email}**. Caso não tenha chegado, você pode reenviar o código abaixo.
                                    </p>
                                    <div className='flex justify-between space-x-2 my-8'>
                                        {code.map((digit, index) => (
                                            <CodeInput key={index} index={index} value={digit} onChange={handleCodeChange} ref={(el) => { inputRefs.current[index] = el; }} onKeyDown={(e) => handleKeyDown(e, index)} />
                                        ))}
                                    </div>
                                    <Button onClick={handleResendCode} disabled={loadingResend} variant="contained" className='!w-full !py-2 md:!py-3 !bg-[#690808] !text-white !rounded-[10px] hover:!bg-red-800 !text-base md:!text-lg !normal-case disabled:!bg-red-900/50'>
                                        {loadingResend ? <CircularProgress size={24} color="inherit" /> : 'Reenviar Código'}
                                    </Button>
                                </div>
                                <div className='flex-grow mt-18'></div>
                                <div className='flex items-center justify-between mt-8'>
                                    <Button onClick={() => setStep('email')} className='!text-white !font-normal hover:!underline !pl-4 !bg-transparent !normal-case'>Voltar</Button>
                                    <Button 
                                        type='submit' 
                                        variant="contained" 
                                        className='!px-12 !py-2 md:!py-3 !bg-[#690808] !text-white !rounded-[10px] hover:!bg-red-800'
                                        disabled={loading || code.join('').length !== 5}
                                    >
                                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Continuar'}
                                    </Button>
                                </div>
                            </Box>
                        )}
    
                        {/* ETAPA 3: NOVA SENHA (OK) */}
                        {step === 'reset' && (
                            <Box component="form" onSubmit={handleContinueSubmit} className='flex-grow flex flex-col'>
                                {/* AQUI: mb-10 (igual ao Login) */}
                                <div className='mb-10 self-center'>
                                    <h1 className='text-white text-4xl md:text-5xl font-normal tracking-wide whitespace-nowrap border-b-2 border-[#690808] pb-2'>ATUALIZAR SENHA</h1>
                                </div>
                                <div className='space-y-6'>
                                    <p className='text-white leading-relaxed text-[13px] md:text-base'>
                                        Sua nova senha precisa ter:<br />
                                        • No mínimo 8 caracteres<br />
                                        • Pelo menos uma letra maiúscula (A-Z)<br />
                                        • Pelo menos um número (0-9)
                                    </p>
                                    <div>
                                        <label htmlFor='password' className='text-[#9E9E9E] text-base md:text-lg mb-2 block'>Insira a nova senha:</label>
                                        <TextField 
                                            required fullWidth id='password' variant="outlined" 
                                            placeholder="Digite sua nova senha" 
                                            type={showPassword ? 'text' : 'password'}
                                            value={newPassword} 
                                            onChange={(e) => setNewPassword(e.target.value)} 
                                            className="[&_input]:!text-white [&_.MuiOutlinedInput-root]:!rounded-2xl [&_.MuiOutlinedInput-notchedOutline]:!border-[1.95px] [&_.MuiOutlinedInput-notchedOutline]:!border-[#757575]"
                                            InputProps={{ endAdornment: <InputAdornment position="end"><IconButton onClick={togglePassword} edge="end" className="!text-[#9E9E9E]">{showPassword ? <Eye size={22} /> : <EyeOff size={22} />}</IconButton></InputAdornment> }}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='passwordConfirmer' className='text-[#9E9E9E] text-base md:text-lg mb-2 block'>Confirme a senha:</label>
                                        <TextField 
                                            required fullWidth id='passwordConfirmer' variant="outlined" 
                                            placeholder="Confirme sua nova senha" 
                                            type={showPasswordConfirmer ? 'text' : 'password'}
                                            value={confirmPassword} 
                                            onChange={(e) => setConfirmPassword(e.target.value)} 
                                            className="[&_input]:!text-white [&_.MuiOutlinedInput-root]:!rounded-2xl [&_.MuiOutlinedInput-notchedOutline]:!border-[1.95px] [&_.MuiOutlinedInput-notchedOutline]:!border-[#757575]"
                                            InputProps={{ endAdornment: <InputAdornment position="end"><IconButton onClick={togglePasswordConfirmer} edge="end" className="!text-[#9E9E9E]">{showPasswordConfirmer ? <Eye size={22} /> : <EyeOff size={22} />}</IconButton></InputAdornment> }}
                                        />
                                    </div>
                                </div>
                                <div className='flex-grow mt-8'></div>
                                <div className='flex items-center justify-between mt-8'>
                                    <Button onClick={() => setStep('code')} className='!text-white !font-normal hover:!underline !pl-4 !bg-transparent !normal-case'>Voltar</Button>
                                    <Button 
                                        type='submit' 
                                        variant="contained" 
                                        className='!px-12 !py-2 md:!py-3 !bg-[#690808] !text-white !rounded-[10px] hover:!bg-red-800'
                                        disabled={loading || !newPassword || newPassword !== confirmPassword} 
                                    >
                                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Confirmar'}
                                    </Button>
                                </div>
                            </Box>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
