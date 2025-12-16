import api from '../../../API/api';

export async function requestPasswordReset(email: string) {
  const response = await api.post('/auth/request-reset', { identifier: email });
  return response.data;
}

export async function resendResetCode(email: string) {
  const response = await api.post('/auth/request-reset', { identifier: email });
  return response.data;
}

export async function verifyResetCode(code: string) {
  const response = await api.post('/auth/verify-reset-code', { code });
  return response.data;
}

export async function resetPassword(code: string, newPassword: string, confirmPassword: string,) {
  const response = await api.post('/auth/reset-password', { code, newPassword, confirmPassword });
  return response.data;
}
