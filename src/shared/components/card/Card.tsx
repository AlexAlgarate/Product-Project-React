import React from 'react';
import type { ReactNode } from 'react';
import styles from './card.module.css'

type Props = {
  readonly children: ReactNode;
  readonly title?: string;
};

export const Card: React.FC<Props> = ({ children, title }) => {
  return (
    <div className={styles.card}>
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
};
