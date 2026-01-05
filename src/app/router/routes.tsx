import { redirect, type RouteObject } from 'react-router';

import { App } from '../../App';
import { NotFoundPage } from '@shared/components/not-found-page/NotFoundPage';
import { constants, labelNavbarOptions, Routes } from '@shared/utils/constants';

const protectedRoute = (): void => {
  const token =
    localStorage.getItem(constants.tokenKey) ||
    sessionStorage.getItem(constants.tokenKey);
  if (!token) {
    throw redirect(Routes.login);
  }
};
type RouteType = RouteObject;

const login: RouteType = {
  path: Routes.login,
  lazy: () => import('@features/auth/pages/LoginPage'),
  id: labelNavbarOptions.login,
};

const register: RouteType = {
  path: Routes.register,
  lazy: () => import('@features/auth/pages/RegisterPage'),
};

const home: RouteType = {
  index: true,
  path: Routes.home,
  lazy: () => import('@features/home/pages/HomePage'),
  id: labelNavbarOptions.home,
};

const products: RouteType = {
  loader: protectedRoute,
  path: Routes.products,
  lazy: () => import('@features/products/pages/ProductsPage'),
  id: labelNavbarOptions.products,
};

const pageNotFound: RouteType = {
  path: '*',
  Component: () => <NotFoundPage />,
};

export const routes: RouteType[] = [
  {
    path: Routes.home,
    Component: App,
    children: [home, products, login, register, pageNotFound],
  },
];
