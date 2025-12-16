export interface UserProfileUpdate {
    nome: string;
    dataNascimento: string;
    cpf: string;
    genero: 'F' | 'M' | 'O';
    email: string;
    endereco: string;
    telefone: string;
    password?: string;
    imagem_perfil_url?: string;
    nome_social?: string;
    tipo?: string; 
}

export interface UserProfileResponse extends UserProfileUpdate {
    id: string;
}