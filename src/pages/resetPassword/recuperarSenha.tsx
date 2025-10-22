import type { FC } from 'react';
import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// Componentes do MUI
import { Box, TextField, Button, Link, InputAdornment, IconButton } from '@mui/material';

// Ícones do Lucide
import { Mail, Eye, EyeOff } from 'lucide-react';

type CodeInputProps = {
    value: string;
    index: number;
    onChange: (index: number, value: string) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const RecuperarSenha: FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<'email' | 'code' | 'reset'>('email');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState<string[]>(Array(5).fill(''));

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

    const handleResendCode = () => {
        setLoadingResend(true);
        setTimeout(() => {
            setLoadingResend(false);
        }, 2000);
    };

    const handleCodeChange = (index: number, value: string) => {
        const digit = value.slice(-1);
        if (/^[0-9]*$/.test(digit)) {
            const updatedCode = [...code];
            updatedCode[index] = digit;
            setCode(updatedCode);
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

    const handleContinueSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 'email') {
            setStep('code');
        } else if (step === 'code') {
            setStep('reset');
        } else if (step === 'reset') {
            navigate('/login');
        }
    };

    const handleSendEmailClick = () => {
        console.log('Enviando e-mail para:', email);
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

                        {/* ETAPA 1: PEDIR O E-MAIL */}
                        {step === 'email' && (
                            <Box component="form" onSubmit={handleContinueSubmit} className='flex-grow flex flex-col'>
                                {/* AQUI: mb-10 (igual ao Login) */}
                                <div className='mb-6 self-center'>
                                    <h1 className='text-white text-3xl sm:text-5xl font-normal tracking-wide sm:whitespace-nowrap border-b-2 border-[#690808] pb-2'>RECUPERAR SENHA</h1>
                                </div>
                                <div className='space-y-6'>
                                    <p className='text-center text-white leading-relaxed text-[13px] md:text-base'>
                                        Para iniciar a recuperação, digite seu e-mail de cadastro para que possamos enviar o código de 5 dígitos. Lembre-se de verificar sua caixa de spam caso não receba a mensagem em alguns minutos.
                                    </p>
                                    <div>
                                        <label htmlFor='email' className='text-[#9E9E9E] text-base md:text-lg mb-2 block'>E-mail:</label>
                                        <TextField required fullWidth id='email' variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)}
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
                                    <Button onClick={handleSendEmailClick} variant="contained" className='!w-full !py-2 md:!py-3 !bg-[#690808] !text-white !rounded-[10px] hover:!bg-red-800 !text-base md:!text-lg !normal-case'>
                                        Enviar E-mail
                                    </Button>
                                </div>
                                <div className='flex-grow mt-8'></div>
                                <div className='flex items-center justify-between mt-12'>
                                    <Link component={RouterLink} to='/login' className='!text-white !font-normal hover:!underline !pl-4'>Voltar</Link>
                                    <Button type='submit' variant="contained" className='!px-12 !py-2 md:!py-3 !bg-[#690808] !text-white !rounded-[10px] hover:!bg-red-800'>Continuar</Button>
                                </div>
                            </Box>
                        )}

                        {/* ETAPA 2: INSERIR O CÓDIGO */}
                        {step === 'code' && (
                            <Box component="form" onSubmit={handleContinueSubmit} className='flex-grow flex flex-col'>
                                {/* AQUI: mb-10 (igual ao Login) */}
                                <div className='mb-10 self-center'>
                                    <h1 className='text-white text-2xl md:text-5xl font-normal tracking-wide whitespace-nowrap border-b-2 border-[#690808] pb-2'>CÓDIGO DE RECUPERAÇÃO</h1>
                                </div>
                                <div className='space-y-6'>
                                    <p className='text-center text-white leading-relaxed text-[13px] md:text-base'>
                                        Agora, insira o código que enviamos para o seu e-mail exem***@gmail.com. Caso não tenha chegado, você pode reenviar o código abaixo.
                                    </p>
                                    <div className='flex justify-between space-x-2 my-8'>
                                        {code.map((digit, index) => (
                                            <CodeInput key={index} index={index} value={digit} onChange={handleCodeChange} ref={(el) => { inputRefs.current[index] = el; }} onKeyDown={(e) => handleKeyDown(e, index)} />
                                        ))}
                                    </div>
                                    <Button onClick={handleResendCode} disabled={loadingResend} variant="contained" className='!w-full !py-2 md:!py-3 !bg-[#690808] !text-white !rounded-[10px] hover:!bg-red-800 !text-base md:!text-lg !normal-case disabled:!bg-red-900/50'>
                                        {loadingResend ? 'Enviando...' : 'Reenviar Código'}
                                    </Button>
                                </div>
                                <div className='flex-grow mt-18'></div>
                                <div className='flex items-center justify-between mt-8'>
                                    <Button onClick={() => setStep('email')} className='!text-white !font-normal hover:!underline !pl-4 !bg-transparent !normal-case'>Voltar</Button>
                                    <Button type='submit' variant="contained" className='!px-12 !py-2 md:!py-3 !bg-[#690808] !text-white !rounded-[10px] hover:!bg-red-800'>Continuar</Button>
                                </div>
                            </Box>
                        )}

                        {/* ETAPA 3: NOVA SENHA */}
                        {step === 'reset' && (
                            <Box component="form" onSubmit={handleContinueSubmit} className='flex-grow flex flex-col'>
                                {/* AQUI: mb-10 (igual ao Login) */}
                                <div className='mb-10 self-center'>
                                    <h1 className='text-white text-4xl md:text-5xl font-normal tracking-wide whitespace-nowrap border-b-2 border-[#690808] pb-2'>ATUALIZAR SENHA</h1>
                                </div>
                                <div className='space-y-6'>
                                    <p className='text-[#757575] leading-relaxed text-[13px] md:text-base'>
                                        Sua nova senha precisa ter:<br />
                                        • No mínimo 8 caracteres<br />
                                        • Pelo menos uma letra maiúscula (A-Z)<br />
                                        • Pelo menos um número (0-9)
                                    </p>
                                    <div>
                                        <label htmlFor='password' className='text-[#757575] text-base md:text-lg mb-2 block'>Insira a nova senha:</label>
                                        <TextField required fullWidth id='password' variant="outlined" placeholder="Digite sua nova senha" type={showPassword ? 'text' : 'password'}
                                            className="[&_input]:!text-[#757575] [&_.MuiOutlinedInput-root]:!rounded-2xl [&_.MuiOutlinedInput-notchedOutline]:!border-[1.95px] [&_.MuiOutlinedInput-notchedOutline]:!border-[#757575]"
                                            InputProps={{ endAdornment: <InputAdornment position="end"><IconButton onClick={togglePassword} edge="end" className="!text-[#757575]">{showPassword ? <Eye size={22} /> : <EyeOff size={22} />}</IconButton></InputAdornment> }}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='passwordConfirmer' className='text-[#757575] text-base md:text-lg mb-2 block'>Confirme a senha:</label>
                                        <TextField required fullWidth id='passwordConfirmer' variant="outlined" placeholder="Confirme sua nova senha" type={showPasswordConfirmer ? 'text' : 'password'}
                                            className="[&_input]:!text-[#757575] [&_.MuiOutlinedInput-root]:!rounded-2xl [&_.MuiOutlinedInput-notchedOutline]:!border-[1.95px] [&_.MuiOutlinedInput-notchedOutline]:!border-[#757575]"
                                            InputProps={{ endAdornment: <InputAdornment position="end"><IconButton onClick={togglePasswordConfirmer} edge="end" className="!text-[#757575]">{showPasswordConfirmer ? <Eye size={22} /> : <EyeOff size={22} />}</IconButton></InputAdornment> }}
                                        />
                                    </div>
                                </div>
                                <div className='flex-grow mt-8'></div>
                                <div className='flex items-center justify-between mt-8'>
                                    <Button onClick={() => setStep('code')} className='!text-white !font-normal hover:!underline !pl-4 !bg-transparent !normal-case'>Voltar</Button>
                                    <Button type='submit' variant="contained" className='!px-12 !py-2 md:!py-3 !bg-[#690808] !text-white !rounded-[10px] hover:!bg-red-800'>Confirmar</Button>
                                </div>
                            </Box>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};