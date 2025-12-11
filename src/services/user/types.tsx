export interface UsuarioPerfil {
    nome: string;
    nome_social: string | null;
    dataNascimento: string;
    cpf: string;
    genero: string;
    email: string;
    endereco: string;
    telefone: string;
    password: string;
    imagem_perfil_url: string | null;
    tipo: 'ALUNO' | 'PROFESSOR' | 'COORDENADOR';
}
