import api from '../../../API/api';

// Solicita o envio do código de recuperação
export async function requestPasswordReset(email: string, token?: string) {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  const response = await api.post('/auth/request-reset', { identifier: email }, config);
  return response.data;
}

// Reenvia o código de recuperação
export async function resendResetCode(email: string, token?: string) {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  const response = await api.post('/auth/request/reset', { identifier: email }, config);
  return response.data;
}

// Verifica o código de recuperação
export async function verifyResetCode(codigoRecuperacao: string) {
  const response = await api.post('/auth/verify-reset-code', { codigoRecuperacao });
  return response.data;
}

// Redefine a senha com o código válido
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
