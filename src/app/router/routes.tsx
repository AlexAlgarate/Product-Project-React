import { redirect, type RouteObject } from 'react-router';
import { Card } from '@shared/components/card/Card';
import { App } from '../../App';

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
        path: '/forms',
        lazy: () => import('@features/auth/FormsAuthPage'),
        id: 'Formularios',
      },
      {
        path: '*',
        Component: () => <Card>Página no encontrada</Card>,
      },
    ],
  },
];
