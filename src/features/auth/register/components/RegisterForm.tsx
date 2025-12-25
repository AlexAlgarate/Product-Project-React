import React, { useId, useState } from 'react';
import styles from '../../authForm.module.css';
import type { ButtonState, Register } from '@features/auth/types';
import { useRegister } from '../hooks/useRegister';
import { InlineToast } from '@features/auth/components/InlineToast';

export const RegisterForm: React.FC = () => {
  const id = useId();
  const [buttonState, setButtonState] = useState<ButtonState>('idle');

  const { register, error, successMessage, clearMessages } = useRegister();

  const ids = {
    firstName: `${id}-firstName`,
    email: `${id}-email`,
    password: `${id}-password`,
    isOkConditions: `${id}-isOkConditions`,
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    clearMessages();

    setButtonState('loading');

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload: Register = {
      firstName: (formData.get('firstName') as string) || '',
      email: (formData.get('email') as string) || '',
      password: (formData.get('password') as string) || '',
      isOkConditions:
        formData.get('isOkConditions') === 'on' ||
        formData.get('isOkConditions') === 'true',
    };

    try {
      await register(payload);

      form.reset();
      setButtonState('success');

      const firstInput = form.querySelector<HTMLInputElement>(
        'input[name="firstName"]'
      );
      firstInput?.focus();

      setTimeout(() => {
        setButtonState('idle');
      }, 3000);
    } catch {
      setButtonState('idle');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Registro de usuarios</h2>

      {successMessage && (
        <InlineToast message={successMessage} type="success" onClose={clearMessages} />
      )}

      {error && <InlineToast message={error} type="error" onClose={clearMessages} />}

      <form onSubmit={handleSubmit}>
        <div className="group-control">
          <label htmlFor={ids.firstName} className={styles.label}>
            Nombre
          </label>
          <input
            type="text"
            placeholder="Dime tu nombre"
            required
            name="firstName"
            id={ids.firstName}
            className={styles.input}
          />
        </div>

        <div className="group-control">
          <label htmlFor={ids.email} className={styles.label}>
            Email
          </label>
          <input
            type="email"
            placeholder="Dime tu email"
            required
            name="email"
            id={ids.email}
            className={styles.input}
            autoComplete="email"
          />
        </div>

        <div className="group-control">
          <label htmlFor={ids.password} className={styles.label}>
            Contraseña
          </label>
          <input
            type="password"
            placeholder="Dime tu password"
            required
            minLength={8}
            name="password"
            id={ids.password}
            className={styles.input}
            autoComplete="new-password"
          />
        </div>

        <div className="group-control-line">
          <input
            type="checkbox"
            id={ids.isOkConditions}
            name="isOkConditions"
            required
          />
          <label htmlFor={ids.isOkConditions}>Acepto las condiciones</label>
        </div>

        <div>
          <button
            type="submit"
            disabled={buttonState === 'loading'}
            className={[
              styles.button,
              buttonState === 'loading' && styles.buttonLoading,
              buttonState === 'success' && styles.buttonSuccess,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {buttonState === 'idle' && 'Crear usuario'}
            {buttonState === 'loading' && 'Creando usuario…'}
            {buttonState === 'success' && 'Usuario creado'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
