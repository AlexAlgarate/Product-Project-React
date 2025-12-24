import { useState, useCallback } from 'react';
import type { ApiResponse, Register } from '@features/auth/types';
import { createUserApi } from '../api/RegisterApi';

export function useRegister(): {
  register: (payload: Register) => Promise<ApiResponse>;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  clearMessages: () => void;
} {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const register = useCallback(async (payload: Register) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await createUserApi(payload);
      setSuccessMessage(response?.message ?? 'Registro correcto');
      return response;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error?.message ?? 'Error desconocido');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    register,
    isLoading,
    error,
    successMessage,
    clearMessages: (): void => {
      setError(null);
      setSuccessMessage(null);
    },
  };
}
