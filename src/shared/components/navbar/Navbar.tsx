import React, { useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useAuthToken } from '@features/auth/hooks/useAuthToken';

import { labelNavbarOptions } from '@shared/utils/constants';

import styles from './navbar.module.css';

export type MenuOption = {
  path: string;
  label: string;
};

type Props = {
  readonly options: MenuOption[];
};

export const Navbar: React.FC<Props> = ({ options }) => {
  const { hasToken, logout } = useAuthToken();
  const navigate = useNavigate();

  const handleLogout = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      logout();
      navigate('/');
    },
    [logout, navigate]
  );

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {options.map((item) => {
          // Si hay token y es el enlace de "Iniciar sesión", reemplazarlo con "Cerrar Sesión"
          if (item.label === labelNavbarOptions.login && hasToken) {
            return (
              <li key={item.path} className={styles.item}>
                <button
                  onClick={handleLogout}
                  className={`${styles.link} ${styles.logoutButton}`}
                >
                  Cerrar Sesión
                </button>
              </li>
            );
          }

          // Si no hay token, mostrar todos los items normalmente
          return (
            <li key={item.path} className={styles.item}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                {item.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
