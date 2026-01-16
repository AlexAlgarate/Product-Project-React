import React from 'react';
import { cn } from '@shared/utils/cn';

export type ButtonVariant = 'primary' | 'danger' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...rest }, ref) => {
    const base = `
      appearance-none leading-normal
      inline-flex items-center
      justify-center rounded-lg
      font-medium transition-colors
      border-0 cursor-pointer
      focus:outline-none focus-visible:ring-2
      focus-visible:ring-offset-2 
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const variantClasses: Record<ButtonVariant, string> = {
      primary:
        'bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500',
      danger: 'bg-red-600/50 text-white hover:bg-red-700 focus-visible:ring-red-500',
      secondary: 'bg-gray-800 text-white hover:bg-gray-700 focus-visible:ring-gray-500',
      ghost: 'bg-transparent text-white/95 hover:bg-white/10 focus-visible:ring-white',
    };

    const sizeClasses: Record<ButtonSize, string> = {
      sm: 'px-2 py-1 text-sm',
      md: 'px-3 py-2 text-sm',
      lg: 'px-4 py-2 text-base',
    };

    const classes = cn(base, variantClasses[variant], sizeClasses[size], className);

    return (
      <button ref={ref} className={classes} {...rest}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
