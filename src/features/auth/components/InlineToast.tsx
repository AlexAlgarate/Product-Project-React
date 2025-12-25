import React, { useEffect, useState } from 'react';
import styles from '../authForm.module.css';

export type InlineToastType = 'success' | 'error';

interface InlineToastProps {
  readonly message: string;
  readonly type?: InlineToastType;
  readonly duration?: number;
  readonly onClose?: () => void;
}

export const InlineToast: React.FC<InlineToastProps> = ({
  message,
  type = 'success',
  duration = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose?.(), 300);
    }, duration);

    return (): void => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={[styles.toast, styles[`toast-${type}`], visible && styles.toastShow]
        .filter(Boolean)
        .join(' ')}
    >
      <span className={styles.toastIcon}>{type === 'success' ? '✅' : '❌'}</span>
      <span className={styles.toastMessage}>{message}</span>
    </div>
  );
};
