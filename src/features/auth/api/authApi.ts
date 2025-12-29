import type { ApiResponse, Login, Register } from '../types';
import { constants } from '@shared/utils/constants';

const BASE_URL = import.meta.env.VITE_AUTH_URL || 'http://localhost:8000';

export const loginUser = async (payload: Login): Promise<string> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: constants.header,
    body: JSON.stringify({
      username: payload.email,
      password: payload.password,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error iniciando sesión: ${response.status} -- ${response.statusText}`);
  }

  const data = await response.json();

  return data.accessToken;
};

export const registerUser = async (payload: Register): Promise<ApiResponse> => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: constants.header,
    body: JSON.stringify({
      username: payload.email,
      password: payload.password,
      firstName: payload.firstName,
      isOkConditions: payload.isOkConditions,
    }),
  });

  if (!response.ok) {
    throw new Error(`${response.status} -- ${response.statusText}`);
  }
  const data = await response.json();

  return data;
};
