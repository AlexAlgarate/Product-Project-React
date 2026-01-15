import React from 'react';
import { NavLink } from 'react-router';

import styles from './header.module.css';
import { Navbar } from '../navbar/Navbar';
import { getMenuOptions } from '@shared/utils/menuOptions';
import { Routes } from '@shared/utils/constants';

type HeaderProps = {
  readonly title: string;
};

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const menuOptions = getMenuOptions();
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <NavLink to={Routes.products}>{title}</NavLink>
        </h1>
        <Navbar options={menuOptions} />
      </div>
    </header>
  );
};
