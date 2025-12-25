import { redirect, type RouteObject } from 'react-router';
import { Card } from '@shared/components/card/Card';
import { App } from '../../App';
import { constants } from '@shared/utils/constants';

const protectedRoute = (): void => {
  const token = localStorage.getItem(constants.tokenKey);
  if (!token) {
    throw redirect('/');
  }
};

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        path: '',
        lazy: () => import('@features/home/pages/HomePage'),
        id: 'Inicio',
      },
      {
        path: '/home',
        loader: (): void => {
          throw redirect('/');
        },
        id: 'Home',
      },
      {
        path: '/login',
        lazy: () => import('@features/auth/pages/LoginPage'),
        id: 'Iniciar sesión',
      },
      {
        path: '/register',
        lazy: () => import('@features/auth/pages/RegisterPage'),
        id: 'Registro',
      },
      {
        // Ruta legacy - redirige a login
        path: '/forms',
        loader: (): void => {
          throw redirect('/login');
        },
        id: 'Forms',
      },
      {
        loader: protectedRoute,
        path: '/products',
        lazy: () => import('@features/products/pages/ProductsPage'),
        id: 'Products',
      },
      {
        path: '*',
        Component: () => (
          <Card style={{ margin: '2rem', textAlign: 'center' }}>
            <h2>
              <span style={{ color: '#ef7023', fontSize: '1.85rem' }}>404</span> -
              Página no encontrada
            </h2>
            <p style={{ fontStyle: 'italic', fontSize: '.95rem' }}>
              La página que buscas no existe.
            </p>
          </Card>
        ),
      },
    ],
  },
];
