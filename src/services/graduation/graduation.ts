import api from '../../../API/api'; 
import type { AlunoAptoGraduacao } from './types/types';

export async function fetchAptosGraduacaoTela(token: string): Promise<AlunoAptoGraduacao[]> {
    const response = await api.get<AlunoAptoGraduacao[]>('/graduacao/aptos/tela',{headers: {Authorization: `Bearer ${token}`,},});

    return response.data;
}