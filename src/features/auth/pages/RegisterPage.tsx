import React, { useState, useId, useEffect } from 'react';
import { Link } from 'react-router';

import type { Register, ButtonState } from '../types';
import { InlineToast } from '../components/InlineToast';
import { useAuth } from '../hooks/useAuth';
import { AuthLayout } from '../components/AuthLayout';
import { FormField } from '../components/FormField';
import { SubmitButton } from '../components/SubmitButton';

import styles from '../styles/authForm.module.css';

const INITIAL_STATE: Register = {
  firstName: '',
  email: '',
  password: '',
  isOkConditions: false,
};

export const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<Register>(INITIAL_STATE);
  const [buttonState, setButtonState] = useState<ButtonState>('idle');

  const { register, error, successMessage, clearMessages } = useAuth();
  const id = useId();

  // Auto-clear success state
  useEffect(() => {
    if (buttonState !== 'success') return;

    const timer = setTimeout(() => {
      setButtonState('idle');
      clearMessages();
    }, 3000);

    return (): void => clearTimeout(timer);
  }, [buttonState, clearMessages]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    clearMessages();
    setButtonState('loading');

    try {
      await register(formData);
      setButtonState('success');
      setFormData(INITIAL_STATE);

      // Focus en el primer campo
      const firstInput = e.currentTarget.querySelector<HTMLInputElement>(
        'input[name="firstName"]'
      );
      firstInput?.focus();
    } catch {
      setButtonState('error');
      setTimeout(() => setButtonState('idle'), 2000);
    }
  };

  const footer = (
    <div className={styles.authFooter}>
      <p>
        ¿Ya tienes una cuenta?{' '}
        <Link to="/login" className={styles.link}>
          Inicia sesión
        </Link>
      </p>
    </div>
  );

  return (
    <AuthLayout
      title="Crear cuenta"
      subtitle="Únete a nuestra comunidad"
      footer={footer}
    >
      {successMessage && (
        <InlineToast
          message={successMessage}
          type="success"
          visible={buttonState === 'success'}
        />
      )}

      {error && <InlineToast message={error} type="error" visible={true} />}

      <form onSubmit={handleSubmit} noValidate>
        <FormField
          id={`${id}-firstName`}
          name="firstName"
          label="Nombre"
          type="text"
          placeholder="Tu nombre"
          required
          value={formData.firstName}
          onChange={handleChange}
        />

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
          placeholder="Mínimo 8 caracteres"
          required
          minLength={8}
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
        />

        <FormField
          id={`${id}-isOkConditions`}
          name="isOkConditions"
          label="Acepto los términos y condiciones"
          type="checkbox"
          required
          checked={formData.isOkConditions}
          onChange={handleChange}
        />

        <SubmitButton
          state={buttonState}
          idleText="Crear cuenta"
          loadingText="Creando cuenta..."
          successText="¡Cuenta creada!"
        />
      </form>
    </AuthLayout>
  );
};

export { RegisterPage as Component };
