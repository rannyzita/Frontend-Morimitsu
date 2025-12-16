import api from '../../../API/api';
import type { RelatorioMetricas, RelatorioRankingGeral } from './types/types';

export async function fetchRelatorioMetricas(token?: string | null): Promise<RelatorioMetricas> {   const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

    const response = await api.get('/relatorios/metricas', config);
    return response.data;
}

export async function fetchRelatorioRankingGeral (token?: string | null):Promise<RelatorioRankingGeral[]> {const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

    const response = await api.get('/relatorios/ranking-geral', config);
    return response.data
}

