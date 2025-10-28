import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { loginService } from '../services/login/login';

export function useLogin() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (email: string, password: string) => {
        setError(null);
        setLoading(true);

    try {
        const { token, user } = await loginService(email, password);

        if (token && user?.id && user.tipo_usuario) {
            const userObject = {
                id: user.id,
                name: user.nome || 'Usuário',
                email: user.email,
                cpf: user.cpf || '',
                role: user.tipo_usuario,
            };

            login(token, userObject);
            navigate('/home');
        } else {
            throw new Error('Dados de autenticação incompletos recebidos da API.');
        }
        } catch (err: any) {
            console.error('Erro no login:', err);
            setError(err.response?.data?.message || 'Identificador ou senha inválidos. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return { handleLogin, loading, error };
}
