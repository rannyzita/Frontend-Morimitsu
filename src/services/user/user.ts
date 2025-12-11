import api from '../../../API/api';
import type { UsuarioPerfil } from './types';

export async function updateUsuarioPerfil(
    id: number,
    data: Partial<UsuarioPerfil>,
    token?: string
) {
    const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

    const response = await api.patch(`/usuarios/perfil/${id}`, data, config);
    return response.data;
}
