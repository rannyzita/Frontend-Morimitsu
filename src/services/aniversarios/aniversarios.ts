import api from '../../../API/api';
import type { AniversariantesResponse } from './types/types';

/**
 * Busca a lista de aniversariantes do ano atual organizada por meses.
 * @param token Token de autenticação Bearer
 */
export async function fetchAniversariantesAnoAtual(
    token?: string | null
): Promise<AniversariantesResponse> {
    const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

    const response = await api.get<AniversariantesResponse>(
        '/aniversariantes/ano-atual', 
        config
    );
    
    return response.data;
}