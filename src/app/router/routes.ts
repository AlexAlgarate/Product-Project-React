import { type RouteObject } from 'react-router';

import { App } from '../../App';
import { NotFoundPage } from '@shared/components/not-found-page/NotFoundPage';
import { labelNavbarOptions, Routes } from '@shared/utils/constants';
import { protectedLoader, rootIndexLoader } from './guards';

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
    () => import('@features/products/pages/CreateProductPage'),
    'Crear nuevo producto'
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
