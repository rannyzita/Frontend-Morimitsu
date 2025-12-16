export interface LoginResponse {
    token: string;
    user: {
        id: string;
        nome: string;
        email: string;
        nome_social: string;
        cpf?: string;
        tipo: 'COORDENADOR' | 'PROFESSOR';
        imagem_perfil_url?: string;
    };
}