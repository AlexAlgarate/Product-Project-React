import { useState, useCallback } from 'react';
import type { Login, Register } from '../types';
import { loginUser, registerUser } from '../api/authApi';
import { constants } from '@shared/utils/constants';

export type UseAuthReturn = {
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  login: (payload: Login) => Promise<string>;
  register: (payload: Register) => Promise<void>;
  clearMessages: () => void;
};

export function useAuth(): UseAuthReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccessMessage(null);
  }, []);

  const login = useCallback(async (payload: Login): Promise<string> => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const token = await loginUser(payload);
      localStorage.setItem(constants.tokenKey, token);
      return token;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (payload: Register): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await registerUser(payload);
      setSuccessMessage(response?.message || 'Usuario registrado correctamente');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al registrar usuario';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    successMessage,
    login,
    register,
    clearMessages,
  };
}
