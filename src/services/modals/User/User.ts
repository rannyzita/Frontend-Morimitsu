import api from '../../../../API/api';
import type { UsuarioDetalhadoResponse } from './types/typesUserDetails';
import type { HistoricoGraduacao } from './types/typesHistoricGraduation';

export async function fetchObterUsuarioDetalhado(id: string, token?: string):Promise<UsuarioDetalhadoResponse> {

    const response = await api.get(`/usuarios/${id}`, {headers: {Authorization: token ? `Bearer ${token}` : undefined,},});

    return response.data;
}

export async function fetchHistoricoGraduacao(alunoId: string, token?: string): Promise<HistoricoGraduacao[]> {

    const response = await api.get<HistoricoGraduacao[]>(`/graduacao/historico/${alunoId}`,{headers:{Authorization: token ? `Bearer ${token}` : undefined,},});

    return response.data;
}