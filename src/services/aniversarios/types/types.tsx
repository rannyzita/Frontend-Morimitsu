export interface Aniversariante {
    nome: string;
    aniversario: string;
    turma: string;
    fotoPerfil: string;
}

export interface AniversariantesResponse {
    ano: number;
    meses: {
        [key: string]: Aniversariante[]; 
    };
}