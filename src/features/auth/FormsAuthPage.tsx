import React from 'react';
import { RegisterForm } from './register/components/RegisterForm';
import { LoginForm } from './login/LoginPage';

export const FormsPage: React.FC = () => {
  return (
    <section>
      <RegisterForm />
      <LoginForm />
    </section>
  );
};

export { FormsPage as Component };
