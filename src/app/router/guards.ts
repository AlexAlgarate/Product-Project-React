import { constants, Routes } from '@shared/utils/constants';
import { redirect, type RouteObject } from 'react-router';

const hasAuthToken = (): boolean =>
  Boolean(
    localStorage.getItem(constants.tokenKey) ??
      sessionStorage.getItem(constants.tokenKey)
  );

export const redirectLogin = (): void => {
  if (!hasAuthToken()) {
    throw redirect(Routes.login);
  }
};

export const protectedLoader: RouteObject['loader'] = () => {
  redirectLogin();
  return null;
};

export const rootIndexLoader: RouteObject['loader'] = () => {
  redirectLogin();
  throw redirect(Routes.products);
};
