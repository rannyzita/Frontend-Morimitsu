import api from '../../../API/api';

export async function requestPasswordReset(email: string, token?: string) {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  const response = await api.post('/auth/request-reset', { identifier: email }, config);
  return response.data;
}

export async function resendResetCode(email: string, token?: string) {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  const response = await api.post('/auth/request-reset', { identifier: email }, config);
  return response.data;
}

export async function verifyResetCode(codigoRecuperacao: string) {
  const response = await api.post('/auth/verify-reset-code', { codigoRecuperacao });
  return response.data;
}

export async function resetPassword(
  codigoRecuperacao: string,
  newPassword: string,
  confirmPassword: string,
  token?: string
) {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  const response = await api.post(
      '/auth/reset-password',
    { codigoRecuperacao, newPassword, confirmPassword },
    config
  );
  return response.data;
}
