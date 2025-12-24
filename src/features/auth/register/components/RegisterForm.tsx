import React, { useId } from 'react';
import styles from '../../authForm.module.css'
import type { Register } from '@features/auth/types';
import { useRegister } from '../hooks/useRegister';

export const RegisterForm: React.FC = () => {
  const id = useId();
  const { register, isLoading, error, successMessage, clearMessages } = useRegister();

  const ids = {
    firstName: `${id}-firstName`,
    email: `${id}-email`,
    password: `${id}-password`,
    isOkConditions: `${id}-isOkConditions`,
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    clearMessages();

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
      // reset the form so fields are cleared after success
      form.reset();
      // optionally focus the first input
      const firstInput = form.querySelector<HTMLInputElement>(
        'input[name="firstName"]'
      );
      firstInput?.focus();
    } catch {
      // el hook ya coloca el error; aquí no necesitamos hacer nada adicional
    }
  };

  return (
    <div className={styles.container}>
      <h2>Registro de usuarios</h2>

      {successMessage && (
        <div role="status" aria-live="polite" className={styles.success}>
          {successMessage}
        </div>
      )}

      {error && (
        <div role="alert" aria-live="assertive" className={styles.error}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
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
            autoComplete="given-name"
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
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
