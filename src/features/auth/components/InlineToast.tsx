import React from 'react';
import styles from '../authForm.module.css';

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
      className={[styles.toast, styles[`toast-${type}`], styles.toastShow]
        .filter(Boolean)
        .join(' ')}
    >
      <span className={styles.toastIcon}>{type === 'success' ? '✅' : '❌'}</span>
      <span className={styles.toastMessage}>{message}</span>
    </div>
  );
};
