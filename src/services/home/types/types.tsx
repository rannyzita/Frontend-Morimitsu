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