import type { Login } from '@features/auth/types';
import { useState, useCallback } from 'react';
import { loginUserApi } from '../api/LoginApi';
import { constants } from '@shared/utils/constants';

export function useLogin(): {
  login: (payload: Login) => Promise<string>;

  error: string | null;

  clearMessages: () => void;
} {
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (payload: Login) => {
    setError(null);

    try {
      const token = await loginUserApi(payload);

      localStorage.setItem(constants.tokenKey, token);

      return token;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error?.message ?? 'Error al iniciar sesión');
      throw error;
    }
  }, []);

  return {
    login,
    error,
    clearMessages: (): void => {
      setError(null);
    },
  };
}
