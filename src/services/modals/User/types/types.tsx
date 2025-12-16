export interface UsuarioDetalhadoResponse {
    sucesso: boolean;
    usuario: UsuarioDetalhado;
}

export interface UsuarioDetalhado {
    id: string;
    nome: string;
    nome_social: string | null;
    cpf: string | null;
    dataNascimento: string | null;
    telefone: string | null;
    endereco: string | null;
    genero: 'M' | 'F' | 'O' | null;
    imagem_perfil_url: string | null;
    email: string | null;
    tipo: 'ALUNO' | 'PROFESSOR' | 'COORDENADOR';
    ativo: boolean;
    ultimo_login: string | null;

    id_faixa: string | null;
    grau: number | null;
    num_matricula: string | null;
    aulas: number | null;

    criado_em: string;
    atualizado_em: string;

    responsaveis: Responsavel[];
    turma_matriculas: TurmaMatricula[];
    faixa: Faixa | null;
}

/* ===================== */
/* RELACIONAMENTOS */
/* ===================== */

export interface Responsavel {
    id: string;
    nome: string | null;
    telefone: string | null;
    grau_parentesco: string | null;
    email: string | null;
    alunoId: string;
}

export interface TurmaMatricula {
    id_aluno: string;
    id_turma: string;
    frequencia_acumulada: number | null;
    ativo: boolean;
    turma: Turma;
}

export interface Turma {
    id: string;
    nome_turma: string;
    data_criacao: string;
    faixa_etaria_min: number;
    faixa_etaria_max: number;
    total_aulas: number | null;
    id_professor: string | null;
    id_coordenador: string | null;
    ativo: boolean;
    imagem_turma_url: string;
}

export interface Faixa {
    id: string;
    corFaixa: string;
    ordem: number;
    imagem_faixa_url: string;
}
