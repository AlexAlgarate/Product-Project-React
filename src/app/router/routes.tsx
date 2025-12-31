import { redirect, type RouteObject } from 'react-router';
import { Card } from '@shared/components/card/Card';
import { App } from '../../App';
import { constants, labelNavbarOptions } from '@shared/utils/constants';

const protectedRoute = (): void => {
  const token =
    localStorage.getItem(constants.tokenKey) ||
    sessionStorage.getItem(constants.tokenKey);
  if (!token) {
    throw redirect('/');
  }
};
type RouteType = RouteObject;

const login: RouteType = {
  path: '/login',
  lazy: () => import('@features/auth/pages/LoginPage'),
  id: labelNavbarOptions.login,
};

const register: RouteType = {
  path: '/register',
  lazy: () => import('@features/auth/pages/RegisterPage'),
};

const home: RouteType = {
  index: true,
  path: '',
  lazy: () => import('@features/home/pages/HomePage'),
  id: labelNavbarOptions.home,
};

const products: RouteType = {
  loader: protectedRoute,
  path: '/products',
  lazy: () => import('@features/products/pages/ProductsPage'),
  id: labelNavbarOptions.products,
};

const pageNotFound: RouteType = {
  path: '*',
  Component: () => (
    <Card style={{ margin: '2rem', textAlign: 'center' }}>
      <h2>
        <span style={{ color: '#ef7023', fontSize: '1.85rem' }}>404</span> - Página no
        encontrada
      </h2>
      <p style={{ fontStyle: 'italic', fontSize: '.95rem' }}>
        La página que buscas no existe.
      </p>
    </Card>
  ),
};

export const routes: RouteType[] = [
  {
    path: '/',
    Component: App,
    children: [home, products, login, register, pageNotFound],
  },
];
