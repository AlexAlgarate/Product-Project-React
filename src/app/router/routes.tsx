import { redirect, type RouteObject } from 'react-router';

import { App } from '../../App';
import { NotFoundPage } from '@shared/components/not-found-page/NotFoundPage';
import { constants, labelNavbarOptions, Routes } from '@shared/utils/constants';

const protectedRoute: RouteObject['loader'] = () => {
  const token =
    localStorage.getItem(constants.tokenKey) ??
    sessionStorage.getItem(constants.tokenKey);

  if (!token) {
    throw redirect(Routes.login);
  }

  return null;
};

const home: RouteObject = {
  index: true,
  lazy: () => import('@features/home/pages/HomePage'),
  id: labelNavbarOptions.home,
};

const login: RouteObject = {
  path: Routes.login,
  lazy: () => import('@features/auth/pages/LoginPage'),
  id: labelNavbarOptions.login,
};

const register: RouteObject = {
  path: Routes.register,
  lazy: () => import('@features/auth/pages/RegisterPage'),
};

const products: RouteObject = {
  loader: protectedRoute,
  path: Routes.products,
  lazy: () => import('@features/products/pages/ProductsPage'),
  id: labelNavbarOptions.products,
};

const pageNotFound: RouteObject = {
  path: '*',
  Component:  NotFoundPage ,
};

export const routes: RouteObject[] = [
  {
    path: Routes.home,
    Component: App,
    children: [home, products, login, register, pageNotFound],
  },
];
