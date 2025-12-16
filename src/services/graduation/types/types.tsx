export interface FaixaAtual {
    imagem: string;
}

export interface AlunoAptoGraduacao {
    alunoId: string;
    nome: string;
    imagemPerfil: string;
    faixaAtual: FaixaAtual;
    turma: string;
}