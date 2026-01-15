import { cn } from '@shared/utils/cn';
import React from 'react';
import type { ReactNode } from 'react';

type CardProps = {
  readonly children: ReactNode;
  readonly title?: string;
  readonly className?: string;
};

export const Card: React.FC<CardProps> = ({ children, title, className }) => {
  const base = `
  bg-gray-card-bg
    border border-gray-card-border
    rounded-xl
    p-5
    shadow-sm
    transition-all
    duration-200
    ease-in-out
    hover:shadow-md
    hover:border-gray-500
  `;

  const classes = cn(base, className);

  return (
    <div className={classes}>
      {title && <h3 className="mb-3 text-lg font-semibold tracking-tight">{title}</h3>}
      {children}
    </div>
  );
};
