import type { RouteObject } from 'react-router';
import type { MenuOption } from '@shared/components/navbar/Navbar';
import { routes } from '@app/router/routes';

/**
 * Extracts menu options from configured routes
 */
export const getMenuOptionsFromRoutes = (): MenuOption[] =>
  (routes[0].children as RouteObject[])
    .filter((route) => 'id' in route)
    .map((route) => ({
      path: route.path as string,
      label: route.id as string,
    }));

/**
 * Returns all menu options for the application
 * Includes options extracted from routes + additional options
 */
export const getMenuOptions = (): MenuOption[] => {
  const routeOptions = getMenuOptionsFromRoutes();

  // Opciones adicionales que no están en routes.tsx (next features?)
  const additionalOptions: MenuOption[] = [{ path: '/about', label: 'Acerca de' }];
  return [...routeOptions, ...additionalOptions];
};
