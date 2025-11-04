import { useState, useEffect, forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { Link as RouterLink} from 'react-router-dom';
import { Box, Button, TextField, Link, CircularProgress, InputAdornment, IconButton } from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';
import { usePasswordReset } from '../../hooks/UsePasswordReset';
import { AlertMessage } from '../../components/FeedbackPassword/Feedback';

type CodeInputProps = InputHTMLAttributes<HTMLInputElement> & {
    index: number;
    value: string;
    onChange: (index: number, value: string) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
};

const CodeInput = forwardRef<HTMLInputElement, CodeInputProps>(({ index, value, onChange, onKeyDown }, ref) => {
    return (
        <input
            ref={ref}
            type="text"
            inputMode="numeric"
            maxLength={1}
            className="w-12 h-12 md:w-14 md:h-14 text-center text-black text-xl md:text-2xl rounded-lg bg-white border border-[#757575] focus:outline-none"
            value={value}
            onChange={(e) => onChange(index, e.target.value)}
            onKeyDown={(e) => onKeyDown(e, index)}
        />
    );
});
CodeInput.displayName = 'CodeInput';

const maskEmail = (email: string): string => {
    if (!email) return ''; 
    
    const parts = email.split('@');
    if (parts.length !== 2) return email; 

    const [username, domain] = parts;

    let maskedUsername;
    if (username.length <= 3) {
        maskedUsername = username.charAt(0) + '***';
    } else {
        maskedUsername = username.substring(0, 3) + '***';
    }
    
    return `${maskedUsername}@${domain}`;
};

export default function PasswordResetPage() {
    const {
        step,
        setStep,
        email,
        setEmail,
        code,
        handleCodeChange,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        error,
        successMessage,
        loading,
        loadingResend,
        handleSendEmail,
        handleResendCode,
        handleVerifyCode,
        handleResetPassword,
        codeSent,
        inputRefs,
    } = usePasswordReset();

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmer, setShowPasswordConfirmer] = useState(false);
    const [showFirstStepMessage, setShowFirstStepMessage] = useState(false);

    const [emailError, setEmailError] = useState(false);

    useEffect(() => {
        if (showFirstStepMessage && email) {
            setShowFirstStepMessage(false);
        }
        if (emailError && email) {
            setEmailError(false);
        }
    }, [email]);
    
    const togglePassword = () => setShowPassword(!showPassword);
    const togglePasswordConfirmer = () => setShowPasswordConfirmer(!showPasswordConfirmer);

    const handleSubmitEmail = () => {
        if (!email) {
            setEmailError(true); 
        } else {
            setEmailError(false); 
            handleSendEmail();  
        }
    };

    const handleContinueCode = () => {
        if (!codeSent) {
            setShowFirstStepMessage(true);
            return;
        }
    
        setStep('code');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className='flex justify-center items-start md:items-center min-h-screen text-gray-400 pt-16 md:pt-0'>
            <div className='flex flex-col md:flex-row w-full max-w-7xl h-auto md:h-[600px] items-center justify-center'>

                {/* Imagem */}
                <div className='flex-1 flex justify-center items-center h-full mb-8 md:mb-0'>
                    <img src='/MorimitsuLogo.jpeg' alt='Logo Morimitsu Jiu Jitsu' className='w-[120px] h-[120px] md:w-[550px] md:h-[550px] object-contain' />
                </div>

                {/* Formulário */}
                <div className='flex-1 flex justify-center items-center w-full min-h-[600px] p-8 md:p-12'>
                    <div className='w-full max-w-sm h-full flex flex-col'>
                        {/* ETAPA 1: PEDIR O E-MAIL */}
                        {step === 'email' && (
                            <Box component='form' onSubmit={(e) => e.preventDefault()} className='flex-grow flex flex-col justify-between relative pb-4'>
                                <div className='mb-6 self-center'>
                                    <h1 className='text-white text-[22px] md:text-3xl lg:text-5xl font-normal tracking-wide sm:whitespace-nowrap border-b-2 border-[#690808] pb-2'>
                                        RECUPERAR SENHA
                                    </h1>
                                </div>

                                <div className='space-y-6'>
                                    <p className='text-center text-white leading-relaxed text-[13px] md:text-base'>
                                        Para iniciar a recuperação, digite seu e-mail de cadastro para que possamos enviar o código de 5 dígitos.
                                        Lembre-se de verificar sua caixa de spam caso não receba a mensagem em alguns minutos.
                                    </p>

                                    <div className='my-8'>
                                        <label htmlFor='email' className='text-[#9E9E9E] text-base text-[14px] md:text-lg mb-2 block'>E-mail:</label>
                                        <TextField
                                            required
                                            fullWidth
                                            id='email'
                                            variant='outlined'
                                            type='text'
                                            placeholder='Digite seu e-mail'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            InputProps={{
                                                sx: {
                                                        height: { xs: 42, md: 56 }, // altura responsiva
                                                        fontSize: { xs: '0.80rem', md: '1rem' }, // texto responsivo
                                                    '& input': {
                                                        padding: { xs: '8px 10px', md: '14px 16px' },
                                                    },
                                                },
                                            }}
                                            inputProps={{
                                                style: {
                                                    fontSize: 'inherit',
                                                },
                                            }}
                                            sx={{
                                                '& .MuiInputBase-input::placeholder': {
                                                    fontSize: '0.78rem', // placeholder mobile
                                                    '@media (min-width:768px)': {
                                                        fontSize: '1rem',
                                                    },
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active': {
                                                        transition: 'background-color 5000s ease-in-out 0s',
                                                        boxShadow: '0 0 0 30px #000000 inset !important',
                                                        WebkitTextFillColor: '#FFFFFF !important', // texto branco
                                                    },
                                                },
                                            }}
                                            className='[&_input]:!text-white [&_.MuiOutlinedInput-root]:!rounded-2xl [&_.MuiOutlinedInput-notchedOutline]:!border-[1.95px] [&_.MuiOutlinedInput-notchedOutline]:!border-[#757575]'
                                        />
                                    </div>

                                    <div className='relative flex flex-col items-center w-full'>
                                        <Button
                                            onClick={handleSubmitEmail}
                                            type='button'
                                            variant='contained'
                                            className='!w-full !py-[12px] md:!py-[12px] !bg-[#690808] !text-white 
                                                    !rounded-[16px] hover:!bg-red-800 !text-[14px]
                                                    md:!text-lg !normal-case relative flex justify-center items-center'
                                            disabled={loading}
                                            sx={{ minHeight: '40px' }}
                                        >
                                            <span className={loading ? 'invisible' : ''}>
                                                Enviar Código
                                            </span>

                                            {/* Spinner sobreposto sem alterar tamanho */}
                                            {loading && (
                                                <CircularProgress 
                                                    size={22} 
                                                    color='inherit' 
                                                    className='absolute'
                                                />
                                            )}
                                        </Button>

                                        {(error || successMessage || emailError || showFirstStepMessage) && (
                                            <div className='absolute top-full !right-0 mt-2 flex justify-end'>
                                                <div className='max-w-[500px] w-fit'>
                                                    <AlertMessage 
                                                        error={
                                                            error || 
                                                            (emailError ? 'Insira um e-mail!' : null) ||
                                                            (showFirstStepMessage ? 'Envie o código primeiro!' : null)
                                                        }
                                                        successMessage={successMessage} 
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className='flex items-center justify-between mt-32'>
                                    <Button 
                                        component={RouterLink}  
                                        to='/login' 
                                        className='!text-white !font-normal hover:!underline !pl-4 !bg-transparent !normal-case'
                                    >
                                        Voltar
                                    </Button>
                                    
                                    <Button
                                        onClick={handleContinueCode}
                                        type='button'
                                        variant='contained'
                                        className='!px-12 !py-2 md:!py-3 !bg-[#690808] !text-white !rounded-[10px] hover:!bg-red-800 !normal-case'
                                        disabled={loading}
                                    >
                                        Continuar
                                    </Button>
                                </div>
                            </Box>
                        )}

                        {/* ETAPA 2: INSERIR O CÓDIGO */}
                        {step === 'code' && (
                            <Box
                                component='form'
                                onSubmit={(e) => { e.preventDefault(); handleVerifyCode(); }}
                                className='flex-grow flex flex-col justify-between relative pb-4'
                            >
                                <div className='mb-6 self-center'>
                                    <h1 className='text-white text-[20px] md:text-3xl lg:text-5xl font-normal tracking-wide sm:whitespace-nowrap border-b-2 border-[#690808] pb-2'>
                                        CÓDIGO DE RECUPERAÇÃO
                                    </h1>
                                </div>

                                <div className='space-y-6'>
                                    <p className='text-center text-white leading-relaxed text-[13px] md:text-base'>
                                        Agora, insira o código que enviamos para o seu e-mail {maskEmail(email)}. Caso não tenha chegado, você pode reenviar o código abaixo.
                                    </p>

                                    <div className='flex justify-between space-x-2 my-8'>
                                        {code.map((digit, index) => (
                                            <CodeInput
                                                key={index}
                                                index={index}
                                                value={digit}
                                                onChange={handleCodeChange as any}
                                                ref={(el) => { inputRefs.current[index] = el; }}
                                                onKeyDown={(e) => handleKeyDown(e, index)}
                                            />
                                        ))}
                                    </div>

                                    <Button
                                        onClick={handleResendCode}
                                        disabled={loadingResend}
                                        variant='contained'
                                        className='!w-full !py-2 md:!py-3 !bg-[#690808] !text-white !rounded-[10px] hover:!bg-red-800 !text-base md:!text-lg !normal-case disabled:!bg-red-900/50'
                                    >
                                        {loadingResend ? <CircularProgress size={24} color='inherit' /> : 'Reenviar Código'}
                                    </Button>

                                    {/* Container fixo para mensagem de erro/sucesso */}
                                    <div className='mt-2 flex justify-end min-h-[63px]'>
                                        <div className='max-w-[500px] w-fit'>
                                            {(error || successMessage || emailError || showFirstStepMessage) && (
                                                <AlertMessage 
                                                    error={
                                                        error || 
                                                        (emailError ? 'Insira um e-mail!' : null) ||
                                                        (showFirstStepMessage ? 'Envie o código primeiro!' : null)
                                                    }
                                                    successMessage={successMessage} 
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className='flex items-center justify-between mt-28'>
                                    <Button
                                        onClick={() => setStep('email')}
                                        className='!text-white !font-normal hover:!underline !pl-4 !bg-transparent !normal-case'
                                    >
                                        Voltar
                                    </Button>

                                    <Button
                                        type='submit'
                                        variant='contained'
                                        className='!px-12 !py-2 md:!py-3 !bg-[#690808] !text-white !rounded-[10px] hover:!bg-red-800 !normal-case relative flex justify-center items-center'
                                        disabled={loading || code.join('').length !== 5}
                                    >
                                        <span className={loading ? 'invisible' : ''}>Continuar</span>
                                        {loading && <CircularProgress size={24} color='inherit' className='absolute' />}
                                    </Button>
                                </div>
                            </Box>
                        )}

                        {/* ETAPA 3: NOVA SENHA */}
                        {step === 'reset' && (
                            <Box component='form' onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }} className='flex-grow flex flex-col justify-between relative pb-4'>
                                <div className='mb-6 self-center'>
                                    <h1 className='text-white text-[22px] sm:text-5xl font-normal tracking-wide whitespace-nowrap border-b-2 border-[#690808] pb-2'>
                                        ATUALIZAR SENHA
                                    </h1>
                                </div>

                                <div className='space-y-6'>

                                <p className='text-white leading-relaxed text-[13px] md:text-base'>
                                    Sua nova senha precisa ter:<br />
                                    • No mínimo 8 caracteres<br />
                                    • Pelo menos uma letra maiúscula (A-Z)<br />
                                    • Pelo menos um número (0-9)
                                </p>

                                <div>
                                    <label htmlFor='password' className='text-[#9E9E9E] text-base text-[14px] md:text-lg mb-2 block'>Insira a nova senha:</label>
                                    <TextField
                                        required
                                        fullWidth
                                        id='password'
                                        variant='outlined'
                                        placeholder='Digite sua nova senha'
                                        type={showPassword ? 'text' : 'password'}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        InputProps={{
                                            sx: {
                                                height: { xs: 42, md: 56 }, // altura responsiva
                                                fontSize: { xs: '0.80rem', md: '1rem' }, // texto responsivo
                                                '& input': {
                                                    padding: { xs: '8px 10px', md: '14px 16px' },
                                                },
                                            },
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton onClick={togglePassword} edge='end' className='!text-[#9E9E9E]'>
                                                        {showPassword ? (
                                                            <Eye className='w-5 h-5 sm:w-6 sm:h-6' /> // 20px mobile, 24px desktop
                                                        ) : (
                                                            <EyeOff className='w-5 h-5 sm:w-6 sm:h-6' />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        inputProps={{
                                            style: {
                                                fontSize: 'inherit',
                                            },
                                        }}
                                        sx={{
                                            '& .MuiInputBase-input::placeholder': {
                                                fontSize: '0.78rem', // placeholder mobile
                                                '@media (min-width:768px)': {
                                                    fontSize: '1rem',
                                                },
                                            },
                                            '& .MuiOutlinedInput-root': {
                                                '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active': {
                                                    transition: 'background-color 5000s ease-in-out 0s',
                                                    boxShadow: '0 0 0 30px #000000 inset !important',
                                                    WebkitTextFillColor: '#FFFFFF !important', // texto branco
                                                },
                                            },
                                        }}
                                        className='[&_input]:!text-white [&_.MuiOutlinedInput-root]:!rounded-2xl [&_.MuiOutlinedInput-notchedOutline]:!border-[1.95px] [&_.MuiOutlinedInput-notchedOutline]:!border-[#757575]'
                                    />
                                </div>

                                    <div>
                                        <label htmlFor='passwordConfirmer' className='text-[#9E9E9E] text-base  text-[14px] md:text-lg mb-2 block'>Confirme a senha:</label>
                                        <TextField
                                            required
                                            fullWidth
                                            id='passwordConfirmer'
                                            variant='outlined'
                                            placeholder='Confirme sua nova senha'
                                            type={showPasswordConfirmer ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            InputProps={{
                                                sx: {
                                                    height: { xs: 42, md: 56 }, // altura responsiva
                                                    fontSize: { xs: '0.80rem', md: '1rem' }, // texto responsivo
                                                    '& input': {
                                                        padding: { xs: '8px 10px', md: '14px 16px' },
                                                    },
                                                },
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        <IconButton onClick={togglePasswordConfirmer} edge='end' className='!text-[#9E9E9E]'>
                                                            {showPassword ? (
                                                                <Eye className='w-5 h-5 sm:w-6 sm:h-6' /> // 20px mobile, 24px desktop
                                                            ) : (
                                                                <EyeOff className='w-5 h-5 sm:w-6 sm:h-6' />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            inputProps={{
                                                style: {
                                                    fontSize: 'inherit',
                                                },
                                            }}
                                            sx={{
                                                '& .MuiInputBase-input::placeholder': {
                                                    fontSize: '0.78rem', // placeholder mobile
                                                    '@media (min-width:768px)': {
                                                        fontSize: '1rem',
                                                    },
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active': {
                                                        transition: 'background-color 5000s ease-in-out 0s',
                                                        boxShadow: '0 0 0 30px #000000 inset !important',
                                                        WebkitTextFillColor: '#FFFFFF !important', // texto branco
                                                    },
                                                },
                                            }}
                                            className='[&_input]:!text-white [&_.MuiOutlinedInput-root]:!rounded-2xl [&_.MuiOutlinedInput-notchedOutline]:!border-[1.95px] [&_.MuiOutlinedInput-notchedOutline]:!border-[#757575]'
                                        />
                                    </div>
                                </div>

                                <div className='flex items-center justify-between mt-32'>
                                    <Button onClick={() => setStep('code')} className='!text-white !font-normal hover:!underline !pl-4 !bg-transparent !normal-case'>Voltar</Button>

                                    <Button
                                        type='submit'
                                        variant='contained'
                                        className='!px-12 !py-2 md:!py-3 !bg-[#690808] !text-white !rounded-[10px] hover:!bg-red-800 !normal-case relative flex justify-center items-center'
                                        disabled={loading || !newPassword || newPassword !== confirmPassword}
                                    >
                                        <span className={loading ? 'invisible' : ''}>Confirmar</span>

                                        {loading && <CircularProgress size={24} color='inherit' className='absolute' />}
                                    </Button>
                                </div>
                            </Box>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
