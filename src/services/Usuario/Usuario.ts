import api from '../../../API/api';

import type { FetchUsuariosResponse, UsuarioPayload } from './types/types';

export async function fetchUsuarios(
    token?: string | null
): Promise<FetchUsuariosResponse> {
    const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

    const response = await api.get<FetchUsuariosResponse>('/usuarios', config);
    return response.data;
}

export async function createUsuario(
    data: UsuarioPayload,
    token?: string | null
): Promise<void> {
    const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

    await api.post('/auth/register', data, config);
}

export async function updateUsuario(
    id: string,
    data: Partial<UsuarioPayload>,
    token?: string | null
): Promise<void> {
    const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

    await api.put(`/usuarios/${id}`, data, config);
}

export async function deleteUsuario(
    id: string,
    token?: string | null
): Promise<void> {
    const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

    await api.delete(`/usuarios/${id}`, config);
}