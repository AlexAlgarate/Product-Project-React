import React, { type ReactNode } from 'react';
import { Card } from '@shared/components/ui/Card/Card';

type AuthLayoutProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  children,
  footer,
}) => {
  return (
    <div className="max-w-120 my-4 sm:my-8 mx-auto py-0 px-4">
      <Card>
        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-[linear-gradient(135deg,#ffffff_0%,#a0a0a0_100%)] bg-clip-text text-transparent">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[0.9rem] sm:text-base text-text-muted m-0">{subtitle}</p>
          )}
        </div>

        <div className="space-y-4">{children}</div>

        {footer && <div className="mt-6">{footer}</div>}
      </Card>
    </div>
  );
};
