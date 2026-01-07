import React from 'react';
import type { ReactNode } from 'react';

type Props = {
  readonly children: ReactNode;
  readonly title?: string;
  readonly style?: React.CSSProperties;
};

export const Card: React.FC<Props> = ({ children, title, style }) => {
  return (
    <div
      style={style}
      className="p-4 border border-solid border-gray-card rounded-lg shadow-xl"
    >
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
};
