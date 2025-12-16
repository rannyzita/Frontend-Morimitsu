import api from '../../../API/api';
import type { AniversariantesMesAtualResponse, AptoGraduacao } from './types/types';

export async function fetchAniversariantesMesAtual(token?: string): Promise<AniversariantesMesAtualResponse> {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await api.get<AniversariantesMesAtualResponse>(`/aniversariantes/mes-atual`, config);
    return response.data;
} 

export async function fetchAptosGraduacao(token?: string): Promise<AptoGraduacao[]> {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } }: {};

    const response = await api.get<AptoGraduacao[]>('/graduacao/home/aptos', config);

    return response.data;
}