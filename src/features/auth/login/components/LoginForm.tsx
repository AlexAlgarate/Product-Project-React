import React, { useId, useState } from 'react';

import { useLogin } from '../hooks/useLogin';
import type { ButtonState, Login } from '@features/auth/types';
import { Routes } from '@shared/utils/constants';
import styles from '../../authForm.module.css';

const INITIAL_STATE: Login = {
  email: '',
  password: '',
  rememberMe: false,
};

export const LoginForm: React.FC = () => {
  const [userData, setUserData] = useState<Login>(INITIAL_STATE);
  const [buttonState, setButtonState] = useState<ButtonState>('idle');

  const { login, error, clearMessages } = useLogin();

  const id = useId();
  const ids = {
    email: `${id}-email`,
    password: `${id}-password`,
    rememberMe: `${id}-rememberMe`,
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, type, value, checked } = event.target;
    setUserData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    clearMessages();
    setButtonState('loading');

    try {
      await login(userData);

      setButtonState('success');
      setUserData(INITIAL_STATE);

      setTimeout(() => {
        window.location.href = Routes.products;
      }, 1000);
    } catch {
      //
    }
  };

  return (
    <div className={styles.container}>
      <h2>Inicio sesión de usuarios</h2>

      {error && (
        <div role="alert" aria-live="assertive" className={styles.error}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="group-control">
          <label htmlFor={ids.email} className={styles.label}>
            Email
          </label>
          <input
            type="email"
            name="email"
            id={ids.email}
            placeholder="Dime tu email"
            required
            value={userData.email}
            onChange={handleChange}
            autoComplete="email"
            className={styles.input}
          />
        </div>

        <div className="group-control">
          <label htmlFor={ids.password} className={styles.label}>
            Password
          </label>
          <input
            type="password"
            name="password"
            id={ids.password}
            placeholder="Dime tu password"
            required
            minLength={5}
            value={userData.password}
            onChange={handleChange}
            autoComplete="current-password"
            className={styles.input}
          />
        </div>

        <div className="group-control-line">
          <input
            type="checkbox"
            name="rememberMe"
            id={ids.rememberMe}
            checked={userData.rememberMe}
            onChange={handleChange}
          />
          <label htmlFor={ids.rememberMe}>Recuérdame</label>
        </div>

        <div>
          <button
            type="submit"
            disabled={buttonState === 'loading' || buttonState === 'success'}
            className={[
              styles.button,
              buttonState === 'success' && styles.buttonSuccess,
              buttonState === 'loading' && styles.buttonLoading,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {
              {
                idle: 'Enviar',
                loading: 'Enviando',
                success: 'Has iniciado sesión',
              }[buttonState]
            }
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
