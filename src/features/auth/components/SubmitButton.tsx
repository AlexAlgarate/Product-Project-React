// src/features/auth/components/SubmitButton.tsx

import React from 'react';
import type { ButtonState } from '../types/auth.types';

type SubmitButtonProps = {
  state: ButtonState;
  idleText?: string;
  loadingText?: string;
  successText?: string;
  errorText?: string;
};

const buttonVariants: Record<ButtonState, string> = {
  idle: 'bg-gradient-to-br from-indigo-600 to-indigo-700 hover:shadow-md hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0',
  loading:
    'bg-gradient-to-br from-indigo-600 to-indigo-700 opacity-70 cursor-not-allowed',
  success: 'bg-gradient-to-br from-emerald-600 to-emerald-700',
  error: 'bg-gradient-to-br from-red-500 to-red-600',
};

const buttonText: Record<ButtonState, string> = {
  idle: 'Enviar',
  loading: 'Enviando...',
  success: 'Éxito',
  error: 'Error',
};

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  state,
  idleText,
  loadingText,
  successText,
  errorText,
}) => {
  const isDisabled = state === 'loading' || state === 'success';

  const text = {
    idle: idleText || buttonText.idle,
    loading: loadingText || buttonText.loading,
    success: successText || buttonText.success,
    error: errorText || buttonText.error,
  }[state];

  return (
    <button
      type="submit"
      disabled={isDisabled}
      aria-busy={state === 'loading'}
      className={`
        w-full px-6 py-3 mt-6
        rounded-lg border-none
        text-base font-semibold text-white
        flex items-center justify-center gap-2
        transition-all duration-300 ease-in-out
        ${buttonVariants[state]}
        disabled:pointer-events-none
      `}
    >
      {state === 'loading' && (
        <span
          className="w-4 h-4 border-2  border-white-shadow border-t-white rounded-[50%] animate-spin "
          aria-hidden="true"
        />
      )}
      {text}
    </button>
  );
};
