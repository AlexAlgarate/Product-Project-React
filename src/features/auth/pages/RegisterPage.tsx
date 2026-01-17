import React, { useState, useId, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

import type { Register, ButtonState } from '../types/auth.types';
import { InlineToast } from '../../../shared/components/feedback/InlineToast';
import { useAuth } from '../hooks/useAuth';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../../../shared/components/ui/Input/Input';
import { SubmitButton } from '../components/SubmitButton';

import { redirectTimeout, Routes } from '@shared/utils/constants';
import { FooterAuth } from '../components/FooterAuth';

const INITIAL_STATE: Register = {
  firstName: '',
  email: '',
  password: '',
  isOkConditions: false,
};

export const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<Register>(INITIAL_STATE);
  const [buttonState, setButtonState] = useState<ButtonState>('idle');
  const firstInputRef = useRef<HTMLInputElement>(null);

  const { register, error, successMessage, clearMessages } = useAuth();
  const id = useId();

  const navigate = useNavigate();
  const redirectTimeoutRef = useRef<number | null>(null);

  // Auto-clear success state
  useEffect(() => {
    if (buttonState !== 'success') return;

    const timer = setTimeout(() => {
      setButtonState('idle');
      clearMessages();
    }, 3000);

    return (): void => clearTimeout(timer);
  }, [buttonState, clearMessages]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, type, value, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  useEffect(() => {
    return (): void => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    clearMessages();
    setButtonState('loading');

    try {
      await register(formData);

      setButtonState('success');
      setFormData(INITIAL_STATE);
      firstInputRef.current?.focus();

      redirectTimeoutRef.current = window.setTimeout(() => {
        navigate(Routes.products);
      }, redirectTimeout);
    } catch (error) {
      console.error('Error en catch:', error);
      setButtonState('error');
      setTimeout(() => setButtonState('idle'), 2000);
    }
  };

  return (
    <AuthLayout
      title="Crear cuenta"
      subtitle="Únete a nuestra comunidad"
      footer={
        <FooterAuth
          text="¿Ya tienes una cuenta? "
          hrefLink="/login"
          textLink="Inicia sesión"
        />
      }
    >
      {successMessage && (
        <InlineToast
          message={successMessage}
          type="success"
          visible={buttonState === 'success'}
        />
      )}

      {error && <InlineToast message={error} type="error" visible={true} />}

      <form onSubmit={handleSubmit}>
        <Input
          id={`${id}-firstName`}
          ref={firstInputRef}
          name="firstName"
          label="Nombre"
          type="text"
          placeholder="Tu nombre"
          required
          value={formData.firstName}
          onChange={handleChange}
        />

        <Input
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

        <Input
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

        <Input
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
