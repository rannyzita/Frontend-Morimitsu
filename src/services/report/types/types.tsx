export interface RelatorioMetricas {
    totalAlunos: number;
    totalProfessores: number;
    totalCoordenadores: number;
    totalTurmas: number;
    totalUsuarios: number;
    totalAulas: number;
}

export interface RelatorioRankingGeral {
    alunoId: string;
    nome: string;
    totalAulas: number;
}
