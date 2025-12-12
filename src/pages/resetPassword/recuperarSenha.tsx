import { useState, useEffect, forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { usePasswordReset } from '../../hooks/UsePasswordReset';
import { StepEmail } from './StepEmail';
import { StepCode } from './StepCode';
import { StepReset } from './StepReset';

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
            type='text'
            inputMode='numeric'
            maxLength={1}
            className='w-12 h-12 md:w-14 md:h-14 text-center text-black text-xl md:text-2xl rounded-lg bg-white border border-[#757575] focus:outline-none'
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

    useEffect(() => {
        setStep('reset');
    }, []);
    
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
                <div className='flex-1 flex justify-center items-center h-full md:mb-0'>
                    <img src='/MorimitsuLogo.jpeg' alt='Logo Morimitsu Jiu Jitsu' className='w-[120px] h-[120px] md:w-[550px] md:h-[550px] object-contain' />
                </div>

                {/* Formulário */}
                <div className='flex-1 flex justify-center items-center w-full min-h-[600px] p-8 md:p-12'>
                    <div className='w-full max-w-sm h-full flex flex-col'>
                        {/* ETAPA 1: PEDIR O E-MAIL */}
                        {step === 'email' && (
                            <StepEmail
                                email={email}
                                setEmail={setEmail}
                                loading={loading}
                                error={error}
                                successMessage={successMessage}
                                emailError={emailError}
                                showFirstStepMessage={showFirstStepMessage}
                                handleSubmitEmail={handleSubmitEmail}
                                handleContinueCode={handleContinueCode}
                            />
                        )}

                        {/* ETAPA 2: INSERIR O CÓDIGO */}
                        {step === 'code' && (
                            <StepCode
                                email={email}
                                code={code}
                                error={error}
                                successMessage={successMessage}
                                loading={loading}
                                loadingResend={loadingResend}
                                emailError={emailError}
                                showFirstStepMessage={showFirstStepMessage}
                                inputRefs={inputRefs}
                                handleKeyDown={handleKeyDown}
                                handleResendCode={handleResendCode}
                                handleVerifyCode={handleVerifyCode}
                                setStep={setStep as any}
                                handleCodeChange={handleCodeChange}
                            />
                        )}

                        {/* ETAPA 3: NOVA SENHA */}
                        {step === 'reset' && (
                            <StepReset
                                newPassword={newPassword}
                                setNewPassword={setNewPassword}
                                confirmPassword={confirmPassword}
                                setConfirmPassword={setConfirmPassword}
                                loading={loading}
                                setStep={setStep as any}
                                handleResetPassword={handleResetPassword}
                                showPassword={showPassword}
                                togglePassword={togglePassword}
                                showPasswordConfirmer={showPasswordConfirmer}
                                togglePasswordConfirmer={togglePasswordConfirmer}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
