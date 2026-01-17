import React, { useState, useId, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';

import type { Login, ButtonState } from '../types/auth.types';
import { useAuth } from '../hooks/useAuth';
import { AuthLayout } from '../components/AuthLayout';
import { InlineToast } from '../../../shared/components/feedback/InlineToast';
import { Routes } from '@shared/utils/constants';
import { Input } from '../../../shared/components/ui/Input/Input';
import { SubmitButton } from '../components/SubmitButton';
import { FooterAuth } from '../components/FooterAuth';

const initialState: Login = {
  email: '',
  password: '',
  rememberMe: false,
};

export const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<Login>(initialState);
  const [buttonState, setButtonState] = useState<ButtonState>('idle');
  const [showToast, setShowToast] = useState(false);

  const { login, error, clearMessages } = useAuth();

  const id = useId();
  const navigate = useNavigate();
  const redirectTimeoutRef = useRef<number | null>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const { name, type, value, checked } = event.target;

      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    },
    [],
  );

  useEffect(() => {
    return (): void => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      clearMessages();
      setButtonState('loading');
      setShowToast(false);

      try {
        await login(formData);

        setButtonState('success');
        setFormData(initialState);

        redirectTimeoutRef.current = window.setTimeout(() => {
          navigate(Routes.products);
        }, 1000);
      } catch {
        setButtonState('error');
        setShowToast(true);
        redirectTimeoutRef.current = window.setTimeout(() => {
          setButtonState('idle');
        }, 1500);
      }
    },
    [clearMessages, login, formData, navigate],
  );

  const handleToastClose = useCallback(() => {
    setShowToast(false);
    clearMessages();
  }, [clearMessages]);

  return (
    <AuthLayout
      title="Iniciar sesión"
      subtitle="Bienvenido de nuevo"
      footer={
        <FooterAuth
          text="¿No tienes una cuenta? "
          hrefLink="/register"
          textLink="Regístrate aquí"
        />
      }
    >
      {error && (
        <InlineToast
          message={error}
          type="error"
          visible={showToast}
          duration={1500}
          onClose={handleToastClose}
        />
      )}

      <form onSubmit={handleSubmit} noValidate>
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
          placeholder="Introduce tu contraseña"
          required
          minLength={5}
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
        />

        <Input
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
