import React from 'react';

import type { ReactNode } from 'react';
import styles from './header.module.css';

type Props = {
  readonly title: string;

  readonly children: ReactNode;
};

export const Header: React.FC<Props> = ({ title, children }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        {children}
      </div>
    </header>
  );
};
