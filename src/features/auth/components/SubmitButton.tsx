// src/features/auth/components/SubmitButton.tsx

import React from 'react';
import type { ButtonState } from '../types/types';
import styles from '../styles/authForm.module.css';

type SubmitButtonProps = {
  state: ButtonState;
  idleText?: string;
  loadingText?: string;
  successText?: string;
  errorText?: string;
};

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  state,
  idleText = 'Enviar',
  loadingText = 'Enviando...',
  successText = 'Éxito',
  errorText = 'Error',
}) => {
  const isDisabled = state === 'loading' || state === 'success';

  const buttonClasses = [
    styles.button,
    state === 'loading' && styles.buttonLoading,
    state === 'success' && styles.buttonSuccess,
    state === 'error' && styles.buttonError,
  ]
    .filter(Boolean)
    .join(' ');

  const buttonText = {
    idle: idleText,
    loading: loadingText,
    success: successText,
    error: errorText,
  }[state];

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={buttonClasses}
      aria-busy={state === 'loading'}
    >
      {state === 'loading' && <span className={styles.spinner} aria-hidden="true" />}
      {buttonText}
    </button>
  );
};
