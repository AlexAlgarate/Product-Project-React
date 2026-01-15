import React, { useCallback, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useAuthToken } from '@features/auth/hooks/useAuthToken';

import { labelNavbarOptions, Routes } from '@shared/utils/constants';
import { ConfirmModal } from '@shared/components/modal-confirm/ModalConfirm';

import styles from './navbar.module.css';

export type MenuOption = {
  path: string;
  label: string;
};

type NavBarProps = {
  readonly options: MenuOption[];
};

export const Navbar: React.FC<NavBarProps> = ({ options }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const { hasToken, logout } = useAuthToken();
  const navigate = useNavigate();

  const handleConfirmLogout = useCallback(() => {
    logout();
    navigate(Routes.home);
  }, [logout, navigate]);

  return (
    <nav className="flex">
      {showLogoutConfirm && (
        <ConfirmModal
          message="¿Estás seguro de que deseas cerrar sesión?"
          onCancel={() => setShowLogoutConfirm(false)}
          onConfirm={() => {
            setShowLogoutConfirm(false);
            handleConfirmLogout();
          }}
        />
      )}
      <ul className="flex gap-2 m-0 p-0 list-none">
        {options.map((item) => {
          // Si hay token y es el enlace de "Iniciar sesión", reemplazarlo con "Cerrar Sesión"
          if (item.label === labelNavbarOptions.login && hasToken) {
            return (
              <li key={item.label} className={styles.item}>
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className={`${styles.link} ${styles.logoutButton}`}
                >
                  Cerrar Sesión
                </button>
              </li>
            );
          }

          // Si no hay token, mostrar todos los items normalmente
          return (
            <li key={item.label} className={styles.item}>
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
