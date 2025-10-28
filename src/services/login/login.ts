import api from '../../../API/api';

interface LoginResponse {
    token: string;
    user: {
        id: number;
        nome: string;
        email: string;
        cpf?: string;
        tipo_usuario: 'COORDENADOR' | 'PROFESSOR';
    };
}

export async function loginService(identifier: string, password: string): Promise<LoginResponse> {
    const response = await api.post('/auth/login', { identifier, password });
    return response.data;
}
