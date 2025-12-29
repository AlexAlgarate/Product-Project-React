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
export const getMenuOptions = (
  additionalOptions: MenuOption[] | null = null
): MenuOption[] => {
  const routeOptions = getMenuOptionsFromRoutes();

  // Opciones adicionales que no están en routes.tsx (next features?)
  if (additionalOptions) {
    return [...routeOptions, ...additionalOptions];
  }
  return [...routeOptions];
};
