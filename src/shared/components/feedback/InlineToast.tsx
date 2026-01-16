import React, { useEffect } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

import { cn } from '@shared/utils/cn';

export type InlineToastType = 'success' | 'error';

interface InlineToastProps {
  readonly message: string;
  readonly type?: InlineToastType;
  readonly visible: boolean;
  readonly onClose?: () => void;
  readonly duration?: number;
}

export const InlineToast: React.FC<InlineToastProps> = ({
  message,
  type = 'success',
  visible,
  onClose,
  duration = 2000,
}) => {
  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);

      return (): void => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  if (!visible) return null;

  const isError = type === 'error';

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex items-center gap-3 py-3.5 px-4 mb-5 rounded-lg',
        'border transition-all duration-300 ease-in-out',
        'opacity-100 translate-y-0',
        isError
          ? 'bg-red-500/10 border-red-500/20 border-l-4 border-l-red-500!'
          : 'bg-emerald-500/10 border-emerald-500/20 border-l-4 border-l-emerald-500!'
      )}
    >
      {isError ? (
        <XCircle className="w-5 h-5 text-red-500 shrink-0" aria-hidden="true" />
      ) : (
        <CheckCircle2
          className="w-5 h-5 text-emerald-500 shrink-0"
          aria-hidden="true"
        />
      )}
      <span className="text-[0.95rem] text-gray-200 flex-1">{message}</span>
    </div>
  );
};
