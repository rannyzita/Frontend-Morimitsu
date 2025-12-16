import api from '../../../API/api';
import type { AniversariantesMesAtualResponse } from './types/types';

export async function fetchAniversariantesMesAtual(token?: string): Promise<AniversariantesMesAtualResponse> {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await api.get<AniversariantesMesAtualResponse>(`/aniversariantes/mes-atual`, config);
    return response.data;
} 