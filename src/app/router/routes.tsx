import { redirect, type RouteObject } from 'react-router';

import { App } from '../../App';
import { NotFoundPage } from '@shared/components/not-found-page/NotFoundPage';
import { constants, labelNavbarOptions, Routes } from '@shared/utils/constants';

const hasAuthToken = (): boolean =>
  Boolean(
    localStorage.getItem(constants.tokenKey) ??
      sessionStorage.getItem(constants.tokenKey)
  );

const redirectLogin = (): void => {
  if (!hasAuthToken()) {
    throw redirect(Routes.login);
  }
};
const protectedLoader: RouteObject['loader'] = () => {
  redirectLogin();
  return null;
};

const rootIndexLoader: RouteObject['loader'] = () => {
  redirectLogin();
  throw redirect(Routes.products);
};

const createLazyRoute = (
  path: string,
  importFn: () => Promise<{ Component: React.ComponentType }>,
  id?: string
): RouteObject => ({
  path,
  lazy: importFn,
  ...(id && { id }),
});

const authRoutes: RouteObject[] = [
  createLazyRoute(
    Routes.login,
    () => import('@features/auth/pages/LoginPage'),
    labelNavbarOptions.login
  ),
  createLazyRoute(Routes.register, () => import('@features/auth/pages/RegisterPage')),
];

const productRoutes: RouteObject[] = [
  createLazyRoute(
    Routes.products,
    () => import('@features/products/pages/ProductsPage'),
    labelNavbarOptions.products
  ),
  createLazyRoute(
    Routes.productDetail,
    () => import('@features/products/pages/ProductsPage')
  ),
  createLazyRoute(
    Routes.newProduct,
    () => import('@features/products/pages/CreateProductPage')
  ),
];

const protectedRoutes: RouteObject = {
  loader: protectedLoader,
  children: productRoutes,
};

const pageNotFound: RouteObject = {
  path: '*',
  Component: NotFoundPage,
};

export const routes: RouteObject[] = [
  {
    path: Routes.home,
    Component: App,
    children: [
      { index: true, loader: rootIndexLoader },

      protectedRoutes,
      ...authRoutes,
      pageNotFound,
    ],
  },
];
