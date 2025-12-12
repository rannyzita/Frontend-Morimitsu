import { Box, Button, CircularProgress } from '@mui/material';
import { forwardRef, type InputHTMLAttributes } from 'react';
import { AlertMessage } from '../../components/FeedbackPassword/Feedback';

type StepCodeProps = {
    email: string;
    code: string[];
    error: string | null;
    successMessage: string | null;
    loading: boolean;
    loadingResend: boolean;
    emailError: boolean;
    showFirstStepMessage: boolean;
    inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
    handleResendCode: () => void;
    handleVerifyCode: () => void;
    setStep: (step: 'email' | 'code' | 'new-password') => void;
    handleCodeChange: (index: number, value: string) => void;
};

type CodeInputProps = InputHTMLAttributes<HTMLInputElement> & {
    index: number;
    value: string;
    onChange: (index: number, value: string) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
};

const CodeInput = forwardRef<HTMLInputElement, CodeInputProps>(
    ({ index, value, onChange, onKeyDown }, ref) => (
        <input
            ref={ref}
            type='text'
            inputMode='numeric'
            maxLength={1}
            className='w-12 h-14 md:w-14 md:h-16 text-center text-black text-xl md:text-2xl rounded-lg bg-white border border-[#757575] focus:outline-none'
            value={value}
            onChange={(e) => onChange(index, e.target.value)}
            onKeyDown={(e) => onKeyDown(e, index)}
        />
    )
);
CodeInput.displayName = 'CodeInput';

const maskEmail = (email: string) => {
    if (!email) return '';
    const [username, domain] = email.split('@');
    const masked = username.length <= 3 ? username[0] + '***' : username.slice(0, 3) + '***';
    return `${masked}@${domain}`;
};

export function StepCode({
    email,
    code,
    error,
    successMessage,
    loading,
    loadingResend,
    emailError,
    showFirstStepMessage,
    inputRefs,
    handleKeyDown,
    handleResendCode,
    handleVerifyCode,
    setStep,
    handleCodeChange,
}: StepCodeProps) {
    return (
        <Box
            component='form'
            onSubmit={(e) => {
                e.preventDefault();
                handleVerifyCode();
            }}
            className='flex-grow flex flex-col justify-between relative pb-4'
        >
            <div className='my-6 self-center'>
                <h1 className='text-white text-[22px] md:text-3xl lg:text-5xl font-normal tracking-wide whitespace-nowrap border-b-2 border-[#690808] pb-2 text-center'>
                    CÓDIGO DE RECUPERAÇÃO
                </h1>
            </div>

            <div className='space-y-6 flex-grow min-h-[390px] md:min-h-[420px]'>

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
                            ref={(el) => (inputRefs.current[index] = el)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    ))}
                </div>

                <Button
                    onClick={handleResendCode}
                    disabled={loadingResend}
                    variant='contained'
                    className='
                        !w-full !py-[12px] md:!py-[12px]
                        !bg-[#690808] !text-white
                        !rounded-[16px]
                        hover:!bg-red-800
                        disabled:!bg-red-900/50 
                        !text-[14px] md:!text-lg
                        !normal-case
                        relative flex justify-center items-center
                    '
                >
                    {loadingResend ? (
                        <CircularProgress size={24} color='inherit' />
                    ) : (
                        'Reenviar Código'
                    )}
                </Button>

                <div className='flex !justify-end min-h-[63px]'> 
                    <div className='max-w-[500px] w-fit'> 
                        {(error || successMessage || emailError || showFirstStepMessage) && ( 
                            <AlertMessage 
                                error={ error || (emailError ? 'Insira um e-mail!' : null) || (showFirstStepMessage ? 'Envie o código primeiro!' : null) } 
                                successMessage={successMessage} 
                            /> 
                        )} 
                    </div> 
                </div>
            </div>

            <div className='flex items-center justify-between'>
                <Button
                    onClick={() => setStep('email')}
                    className='
                        !text-white !font-normal
                        hover:!underline 
                        !bg-transparent 
                        !normal-case
                    '
                >
                    Voltar
                </Button>

                <Button
                    type='submit'
                    variant='contained'
                    className='
                        !px-12 !py-2 md:!py-3 
                        !bg-[#690808] !text-white 
                        !rounded-[10px] 
                        hover:!bg-red-800 
                        !normal-case 
                        relative flex justify-center items-center
                    '
                    disabled={loading || code.join('').length !== 5}
                >
                    <span className={loading ? 'invisible' : ''}>Continuar</span>
                    {loading && <CircularProgress size={24} color='inherit' className='absolute' />}
                </Button>
            </div>
        </Box>
    );
}