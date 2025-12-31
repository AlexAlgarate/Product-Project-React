import { useState, useEffect, useCallback } from 'react';
import { constants } from '@shared/utils/constants';

export type UseAuthTokenReturn = {
  hasToken: boolean;
  logout: () => void;
  checkToken: () => boolean;
};

export const useAuthToken = (): UseAuthTokenReturn => {
  const [hasToken, setHasToken] = useState<boolean>(false);

  const checkToken = useCallback((): boolean => {
    const token =
      localStorage.getItem(constants.tokenKey) ||
      sessionStorage.getItem(constants.tokenKey);
    return !!token;
  }, []);

  const logout = useCallback((): void => {
    localStorage.removeItem(constants.tokenKey);
    sessionStorage.removeItem(constants.tokenKey);
    setHasToken(false);
    // evento entre pestañas
    window.dispatchEvent(new Event(constants.storage));
  }, []);

  useEffect(() => {
    // Escuchar cambios en el storage
    const handleStorageChange = (): void => {
      setHasToken(checkToken());
    };

    // ¿Hay token?
    handleStorageChange();

    // Escuchar cambios en el storage desde otras pestañas
    window.addEventListener(constants.storage, handleStorageChange);
    // Escuchar cambios de storage desde la misma pestaña
    window.addEventListener(constants.storageChange, handleStorageChange);

    return (): void => {
      window.removeEventListener(constants.storage, handleStorageChange);
      window.removeEventListener(constants.storageChange, handleStorageChange);
    };
  }, [checkToken]);

  return {
    hasToken,
    logout,
    checkToken,
  };
};
