import { constants } from '@shared/utils/constants';
import { useCallback } from 'react';

type StorageTokenManagerReturn = {
  checkToken: () => boolean;
  setToken: (token: string, rememberMe: boolean) => void;
  clearToken: () => void;
};

export const StorageTokenManager = (): StorageTokenManagerReturn => {
  const checkToken = useCallback((): boolean => {
    const token =
      localStorage.getItem(constants.tokenKey) ||
      sessionStorage.getItem(constants.tokenKey);
    return !!token;
  }, []);

  const setToken = useCallback((token: string, rememberMe: boolean): void => {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(constants.tokenKey, token);

    window.dispatchEvent(new Event(constants.storageChange));
  }, []);

  const clearToken = useCallback((): void => {
    localStorage.removeItem(constants.tokenKey);
    sessionStorage.removeItem(constants.tokenKey);

    window.dispatchEvent(new Event(constants.storage));
    window.dispatchEvent(new Event(constants.storageChange));
  }, []);
  return {
    checkToken,
    setToken,
    clearToken,
  };
};
