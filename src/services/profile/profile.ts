import api from '../../../API/api'; 
import type { UserProfileResponse, UserProfileUpdate } from './types/types';

// 3. Função PATCH: Atualizar Perfil
/**
 * Envia as mudanças do perfil para o servidor usando PATCH.
 * @param id O ID do usuário a ser atualizado.
 * @param data O objeto com os dados que serão modificados.
 * @param token O token de autenticação (opcional).
 */
export async function updateUserProfile(id: string, data: Partial<UserProfileUpdate>, token?: string): Promise<UserProfileResponse> {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await api.patch<UserProfileResponse>(`/usuarios/perfil/${id}`, data, config);
    return response.data;
}