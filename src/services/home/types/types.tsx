// -------------------------------------------------
// Types de Aniversariante do mes atual
export interface Aniversariante {
    nome: string;
    aniversario: string;
    turma: string;
    fotoPerfil?: string;
    isToday: boolean;
}

export interface AniversariantesMesAtualResponse {
    mesAtual: number;
    count: number;
    aniversariantes: Aniversariante[];
}
// -------------------------------------------------
// Types de Aptos a Graduação
export interface ProximaFaixa {
    cor: string;
}

export interface AptoGraduacao {
    nome: string;
    turma: string;
    status: 'PRONTO' | 'EM_ANDAMENTO' | string;
    proximaFaixa: ProximaFaixa;
    aulasPresente: number;
    minimoAulas: number;
}