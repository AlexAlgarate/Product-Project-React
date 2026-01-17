import { useState, useCallback, useEffect } from 'react';
import type { Login, Register } from '../types/auth.types';
import { loginUser, registerUser } from '../api/authApi';
import { constants } from '@shared/utils/constants';
import { StorageTokenManager } from '../utils/storage';

export type UseAuthReturn = {
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  hasToken: boolean;

  login: (payload: Login) => Promise<string>;
  register: (payload: Register) => Promise<string>;
  clearMessages: () => void;
  logout: () => void;
  checkToken: () => boolean;
};

export function useAuth(): UseAuthReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [hasToken, setHasToken] = useState<boolean>(false);

  const { checkToken, setToken, clearToken } = StorageTokenManager();

  const clearMessages = useCallback((): void => {
    setError(null);
    setSuccessMessage(null);
  }, []);

  const login = useCallback(
    async (payload: Login): Promise<string> => {
      if (!payload.email.trim() || !payload.password.trim()) {
        const error = new Error('Por favor, completa todos los campos');
        setError(error.message);
        throw error;
      }

      setIsLoading(true);
      setError(null);
      setSuccessMessage(null);

      clearMessages();

      try {
        const token = await loginUser(payload);

        if (!token) {
          throw new Error('No se recibió token de autenticación');
        }

        setToken(token, payload.rememberMe);
        setHasToken(true);

        return token;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Error al iniciar sesión';
        setError(message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setToken, clearMessages],
  );

  const register = useCallback(
    async (payload: Register): Promise<string> => {
      setIsLoading(true);
      setError(null);
      setSuccessMessage(null);
      clearMessages();

      try {
        const response = await registerUser(payload);
        setSuccessMessage(response?.message || 'Usuario registrado correctamente');

        const token = await login({
          email: payload.email,
          password: payload.password,
          rememberMe: false,
        });

        return token;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Error al registrar usuario';
        setError(message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [login, clearMessages],
  );

  const logout = useCallback((): void => {
    clearToken();
    setHasToken(false);
  }, [clearToken]);

  useEffect(() => {
    const syncAuthState = (): void => {
      setHasToken(checkToken());
    };

    syncAuthState();
    window.addEventListener(constants.storage, syncAuthState);
    // Escuchar cambios de storage desde la misma pestaña
    window.addEventListener(constants.storageChange, syncAuthState);

    return (): void => {
      window.removeEventListener(constants.storage, syncAuthState);
      window.removeEventListener(constants.storageChange, syncAuthState);
    };
  }, [checkToken]);

  return {
    isLoading,
    hasToken,
    error,
    successMessage,
    login,
    register,
    logout,
    checkToken,
    clearMessages,
  };
}
