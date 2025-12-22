import React from 'react';
import { RegisterForm } from './RegisterPage';
import { LoginForm } from './LoginPage';

export const FormsPage: React.FC = () => {
  return (
    <section>
      <RegisterForm />
      <LoginForm />
    </section>
  );
};

export { FormsPage as Component };
