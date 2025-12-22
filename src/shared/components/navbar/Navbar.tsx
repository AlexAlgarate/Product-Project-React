import React from 'react';
import { NavLink } from 'react-router';
import styles from './navbar.module.css';

export type MenuOption = {
  path: string;
  label: string;
};

type Props = {
  readonly options: MenuOption[];
};

export const Navbar: React.FC<Props> = ({ options }) => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {options.map((item) => (
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
        ))}
      </ul>
    </nav>
  );
};
