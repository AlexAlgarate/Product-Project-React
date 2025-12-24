import type { ApiResponse, Login } from '@features/auth/types';
import { constants } from '@shared/utils/constants';

const API_BASE = import.meta.env.VITE_AUTH_URL || 'http://localhost:8000';

export async function loginUserApi(payload: Login): Promise<string> {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: constants.header,
    body: JSON.stringify({
      username: payload.email,
      password: payload.password,
    }),
  });

  let body: ApiResponse;
  try {
    body = await response.json();
  } catch {
    body = {};
  }

  if (!response.ok) {
    throw new Error(body?.message ?? response.statusText);
  }

  if (!body.accessToken) {
    throw new Error('Token no recibido');
  }

  return body.accessToken;
}

export async function getMeApi(token: string): Promise<void> {
  const response = await fetch(`${API_BASE}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('No se pudo obtener el usuario');
  }

  return response.json();
}
