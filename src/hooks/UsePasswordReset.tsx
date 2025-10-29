import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    requestPasswordReset,
    resendResetCode,
    verifyResetCode,
    resetPassword
} from '../services/resetPassword/resetPassword';

type Step = 'email' | 'code' | 'reset';

export function usePasswordReset() {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [step, setStep] = useState<Step>('email');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState<string[]>(Array(5).fill(''));
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [codeSent, setCodeSent] = useState(false);

    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [loadingResend, setLoadingResend] = useState(false);

    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
        const nextEmptyIndex = code.findIndex((digit) => digit === '');
        if (nextEmptyIndex !== -1 && step === 'code') {
            inputRefs.current[nextEmptyIndex]?.focus();
        }
    }, [code, step]);

    useEffect(() => {
        setError(null);
        setSuccessMessage(null);
    }, [step]);

    const handleSendEmail = async () => {
        if (!email) {
            setError('Por favor, digite seu e-mail.');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            await requestPasswordReset(email, token as any);
            setSuccessMessage('Código enviado! Verifique seu e-mail!');
            setCodeSent(true); 
        } catch (err: any) {
            console.error('Erro ao solicitar código:', err);
            setError(err.response?.data?.message || 'E-mail não encontrado ou erro no servidor.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        setLoadingResend(true);
        setError(null);
        setSuccessMessage(null);

        try {
            await resendResetCode(email, token as any);
            setSuccessMessage('Novo código enviado com sucesso!');
        } catch (err: any) {
            console.error('Erro ao reenviar código:', err);
            setError(err.response?.data?.message || 'Erro ao reenviar. Tente novamente.');
        } finally {
            setLoadingResend(false);
        }
    };

    const handleCodeChange = (index: number, value: string) => {
        const digit = value.slice(-1);
        if (/^[0-9]*$/.test(digit)) {
            const updated = [...code];
            updated[index] = digit;
            setCode(updated);
            if (digit && index < 4) inputRefs.current[index + 1]?.focus();
        }
    };

    const handleVerifyCode = async () => {
        const fullCode = code.join('');
        if (fullCode.length !== 5) {
            setError('O código deve conter 5 dígitos.');
            return;
        }

        setLoading(true);
        try {
            const data = await verifyResetCode(fullCode);
            if (data?.message === 'Código válido') setStep('reset');
            else setError('Código inválido ou expirado.');
        } catch (err: any) {
            console.error('Erro ao verificar código:', err);
            setError(err.response?.data?.message || 'Código inválido ou erro de conexão.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            setError('As novas senhas não coincidem.');
            return;
        }
        if (newPassword.length < 8) {
            setError('A nova senha deve ter no mínimo 8 caracteres.');
            return;
        }

        setLoading(true);
        try {
            await resetPassword(code.join(''), newPassword, confirmPassword, token as any);
            setSuccessMessage('Senha atualizada com sucesso! Redirecionando...');
            setTimeout(() => navigate('/login'), 3000);
        } catch (err: any) {
            console.error('Erro ao resetar senha:', err);
            setError(err.response?.data?.message || 'Erro ao alterar a senha.');
        } finally {
            setLoading(false);
        }
    };

    return {
        step,
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
        setStep,
        inputRefs,
        codeSent,
        setCodeSent
    };
}
