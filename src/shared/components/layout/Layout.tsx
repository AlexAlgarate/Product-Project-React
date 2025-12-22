import React, { type ReactNode } from 'react';
import { Navbar, type MenuOption } from '@shared/components/navbar/Navbar';
import { Header } from '@shared/components/header/Header';
import { Footer } from '@shared/components/footer/Footer';
import styles from './layout.module.css';

type Props = {
  readonly children: ReactNode;
  readonly appTitle: string;
  readonly menuOptions: MenuOption[];
};

export const Layout: React.FC<Props> = ({ appTitle, menuOptions, children }) => {
  return (
    <div className={styles.layout}>
      <Header title={appTitle}>
        <Navbar options={menuOptions} />
      </Header>

      <main className={styles.main}>{children}</main>

      <Footer />
    </div>
  );
};
