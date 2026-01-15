import React, { type ReactNode } from 'react';
import { Header } from '@shared/components/header/Header';
import { Footer } from '@shared/components/footer/Footer';
import styles from './layout.module.css';

type Props = {
  readonly children: ReactNode;
  readonly appTitle: string;
};

export const Layout: React.FC<Props> = ({ appTitle, children }) => {
  return (
    <div className={styles.layout}>
      <Header title={appTitle}></Header>

      <main className={styles.main}>{children}</main>

      <Footer />
    </div>
  );
};

// <main className="flex flex-1 w-full max-w-5xl my-0 mx-auto py-12 px-6 text-[#e0e0e0] box-border">
//   {children}
// </main>
