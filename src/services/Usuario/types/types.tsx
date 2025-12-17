// Tipo de usuário no sistema
export type UserTipo =
    | 'ADMIN'
    | 'ALUNO'
    | 'PROFESSOR'
    | 'COORDENADOR'
    | 'ALUNO_PROFESSOR';

// Usuário listado no GET /usuarios
export interface UsuarioResumo {
    id: string;
    nome: string;
    tipo: UserTipo;
    fotoPerfil: string;
    fotoFaixa: string | null;
}

// Response do GET /usuarios
export interface FetchUsuariosResponse {
    sucesso: boolean;
    total: number;
    paginaAtual: number;
    totalPaginas: number;
    dados: UsuarioResumo[];
}

// Responsável
export interface ResponsavelInput {
    telefone: string;
}

// Payload base (POST e PUT)
export interface UsuarioPayload {
    nome: string;
    nome_social?: string | null;
    dataNascimento: string;
    cpf: string;
    tipo: UserTipo;
    endereco: string;
    genero: 'M' | 'F' | 'O';
    telefone: string;
    id_faixa: string;
    grau: number;
    responsaveis?: ResponsavelInput[];
    num_matricula?: string | null;
    turmaIds?: string[];
    aulas?: number | null;
}