import React, { useCallback, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';

import { labelNavbarOptions, Routes } from '@shared/utils/constants';
import { ConfirmModal } from '@shared/components/modal-confirm/ModalConfirm';
import { useAuth } from '@features/auth/hooks/useAuth';

import { cn } from '@shared/utils/cn';
import { Button } from '../ui';

export type MenuOption = {
  path: string;
  label: string;
};

type NavBarProps = {
  readonly options: MenuOption[];
};

export const Navbar: React.FC<NavBarProps> = ({ options }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const { hasToken, logout } = useAuth();
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
              <li key={item.label} className="flex items-center">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => setShowLogoutConfirm(true)}
                >
                  Cerrar Sesión
                </Button>
              </li>
            );
          }

          // Si no hay token, mostrar todos los items normalmente
          return (
            <li key={item.label} className="flex items-center">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'px-4 py-2 rounded-lg text-base font-medium',
                    'text-[#a0a0a0]',
                    'transition-all duration-300 ease-in-out',
                    'hover:text-white hover:bg-white/5',
                    isActive &&
                      'text-white bg-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.1)]'
                  )
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
