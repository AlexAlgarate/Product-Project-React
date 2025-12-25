import { useState, useCallback } from 'react';
import type { ApiResponse, Register } from '@features/auth/types';
import { createUserApi } from '../api/RegisterApi';

export function useRegister(): {
  register: (payload: Register) => Promise<ApiResponse>;
  error: string | null;
  successMessage: string | null;
  clearMessages: () => void;
} {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const register = useCallback(async (payload: Register) => {
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await createUserApi(payload);
      setSuccessMessage(response?.message ?? 'Registro correcto');
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Error  desconocido');
      }
      throw error;
    }
  }, []);

  return {
    register,
    error,
    successMessage,
    clearMessages: (): void => {
      setError(null);
      setSuccessMessage(null);
    },
  };
}
