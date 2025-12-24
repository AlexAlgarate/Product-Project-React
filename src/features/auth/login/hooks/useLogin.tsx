import type { Login } from '@features/auth/types';
import { useState, useCallback } from 'react';
import { loginUserApi } from '../api/LoginApi';
import { constants } from '@shared/utils/constants';

export function useLogin(): {
  login: (payload: Login) => Promise<string>;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  clearMessages: () => void;
} {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const login = useCallback(async (payload: Login) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const token = await loginUserApi(payload);

      localStorage.setItem(constants.tokenKey, token);

      setSuccessMessage('Login correcto');
      return token;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error?.message ?? 'Error al iniciar sesión');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    login,
    isLoading,
    error,
    successMessage,
    clearMessages: (): void => {
      setError(null);
      setSuccessMessage(null);
    },
  };
}
