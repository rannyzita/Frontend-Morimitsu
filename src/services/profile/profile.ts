import api from '../../../API/api'; 

export interface UserProfileUpdate {
    nome: string;
    dataNascimento: string;
    cpf: string;
    genero: 'F' | 'M' | 'O';
    email: string;
    endereco: string;
    telefone: string;
    password?: string;
    imagem_perfil_url?: string;
    nome_social?: string;
    tipo?: string; 
}


export interface UserProfileResponse extends UserProfileUpdate {
    id: string;
}


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