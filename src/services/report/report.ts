import api from '../../../API/api';
import type { RelatorioMetricas } from './types';

export async function fetchRelatorioMetricas(token?: string | null): Promise<RelatorioMetricas> {
    const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

    const response = await api.get('/relatorios/metricas', config);
    return response.data;
}
