import { constants } from './constants';

export const getToken = (): string | null => {
  return (
    localStorage.getItem(constants.tokenKey) ??
    sessionStorage.getItem(constants.tokenKey)
  );
};
