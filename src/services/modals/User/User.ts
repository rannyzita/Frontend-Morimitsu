import api from '../../../../API/api';
import type { UsuarioDetalhadoResponse } from './types/types';

export async function fetchObterUsuarioDetalhado(id: string, token?: string):Promise<UsuarioDetalhadoResponse> {

    const response = await api.get(`/usuarios/${id}`, {headers: {Authorization: token ? `Bearer ${token}` : undefined,},});

    return response.data;
}

export async function fetchHistoricoGraduacao(id: string, token?: string)