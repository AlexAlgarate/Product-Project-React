import type { RouteObject } from 'react-router';
import type { MenuOption } from '@shared/components/navigation/Navbar';
import { routes } from '@app/router/routes';

export const extractMenuOptions = (routes: RouteObject[]): MenuOption[] => {
  return routes.flatMap((route) => {
    const current: MenuOption[] =
      route.id && route.path
        ? [
            {
              path: route.path,
              label: route.id,
            },
          ]
        : [];

    const children = route.children ? extractMenuOptions(route.children) : [];
    return [...current, ...children];
  });
};

export const getMenuOptions = (): MenuOption[] => {
  const rootRoutes = routes[0].children ?? [];
  return extractMenuOptions(rootRoutes);
};
