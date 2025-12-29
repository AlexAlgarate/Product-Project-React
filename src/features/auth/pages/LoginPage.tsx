import React, { useState, useId } from 'react';
import { Link } from 'react-router';

import type { Login, ButtonState } from '../types';
import { useAuth } from '../hooks/useAuth';
import { AuthLayout } from '../components/AuthLayout';
import { InlineToast } from '../components/InlineToast';
import { Routes } from '@shared/utils/constants';
import { FormField } from '../components/FormField';
import { SubmitButton } from '../components/SubmitButton';

import styles from '../styles/authForm.module.css';

const initialState: Login = {
  email: '',
  password: '',
  rememberMe: false,
};

export const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<Login>(initialState);
  const [buttonState, setButtonState] = useState<ButtonState>('idle');

  const { login, error, clearMessages } = useAuth();
  const id = useId();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, type, value, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    clearMessages();
    setButtonState('loading');

    try {
      await login(formData);
      setButtonState('success');
      setFormData(initialState);

      // Redirigir después de login exitoso
      setTimeout(() => {
        window.location.href = Routes.products;
      }, 1000);
    } catch {
      setButtonState('error');
      setTimeout(() => setButtonState('idle'), 2000);
    }
  };

  const footer = (
    <div className={styles.authFooter}>
      <p>
        ¿No tienes una cuenta?{' '}
        <Link to="/register" className={styles.link}>
          Regístrate aquí
        </Link>
      </p>
    </div>
  );

  return (
    <AuthLayout title="Iniciar sesión" subtitle="Bienvenido de nuevo" footer={footer}>
      {error && <InlineToast message={error} type="error" visible={true} />}

      <form onSubmit={handleSubmit} noValidate>
        <FormField
          id={`${id}-email`}
          name="email"
          label="Email"
          type="email"
          placeholder="tu@email.com"
          required
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
        />

        <FormField
          id={`${id}-password`}
          name="password"
          label="Contraseña"
          type="password"
          placeholder="Introduce tu contraseña"
          required
          minLength={5}
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
        />

        <FormField
          id={`${id}-rememberMe`}
          name="rememberMe"
          label="Recuérdame"
          type="checkbox"
          checked={formData.rememberMe}
          onChange={handleChange}
        />

        <SubmitButton
          state={buttonState}
          idleText="Iniciar sesión"
          loadingText="Iniciando sesión..."
          successText="¡Bienvenido!"
        />
      </form>
    </AuthLayout>
  );
};

export { LoginPage as Component };
