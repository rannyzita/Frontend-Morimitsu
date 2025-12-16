import api from '../../../API/api';
import { type LoginResponse } from './types/types';

export async function loginService(identifier: string, password: string): Promise<LoginResponse> {
    const response = await api.post('/auth/login', { identifier, password });
    return response.data;
}
