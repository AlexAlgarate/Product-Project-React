import { constants } from '@shared/utils/constants';
import type { Register, ApiResponse } from '@features/auth/types';

const API_BASE = import.meta.env.VITE_AUTH_URL || 'http://localhost:8000';

export async function createUserApi(payload: Register): Promise<ApiResponse> {
  const URL = `${API_BASE}/auth/register`;

  const response = await fetch(URL, {
    method: 'POST',
    headers: constants.header,
    body: JSON.stringify({
      username: payload.email,
      password: payload.password,
      firstName: payload.firstName,
      isOkConditions: payload.isOkConditions,
    }),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let body: any;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (!response.ok) {
    const msg = body?.message || response.statusText || `Error ${response.status}`;
    throw new Error(msg);
  }

  return body as ApiResponse;
}
