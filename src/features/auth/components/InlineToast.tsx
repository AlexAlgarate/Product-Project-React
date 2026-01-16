import React from 'react';

import { cn } from '@shared/utils/cn';

export type InlineToastType = 'success' | 'error';

interface InlineToastProps {
  readonly message: string;
  readonly type?: InlineToastType;
  readonly visible: boolean;
}

export const InlineToast: React.FC<InlineToastProps> = ({
  message,
  type = 'success',
  visible,
}) => {
  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex items-center gap-3 py-3.5 px-4.5 mb-5 rounded-lg bg-bg-dark border border-white/10 opacity-0 -translate-y-2 transition-all duration-300 ease-in-out ]',
        'opacity-100 translate-y-0',
        'border-l-4 border-l-success bg-success-bg',
        'border-l-4 border-l-error bg-error-focus',
        'text-xl shrink-0',
        'text-[.95rem] text-text-light flex-1'
      )}
    >
      <span className="text-xl shrink-0">{type === 'success' ? '✅' : '❌'}</span>
      <span className="text-[.95rem] text-text-light flex-1">{message}</span>
    </div>
  );
};
