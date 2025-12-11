// services/aniversariantes/aniversariantes.ts
import api from '../../../API/api';

export interface AniversarianteApi {
    id: string;
    nome: string;
    dataNascimento: string;
    mes: number;
    dia: number;
    idade: number;
    proximoAniversario: string;
    isToday: boolean;
}

export interface MonthAniversariantesResponse {
    mes: number;
    count: number;
    aniversariantes: AniversarianteApi[];
}

export async function fetchMonthAniversariantes(token?: string): Promise<MonthAniversariantesResponse> {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await api.get<MonthAniversariantesResponse>('/aniversariantes', config);
    return response.data;
}
