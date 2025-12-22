import React, { useId } from 'react';
import styles from './registerForm.module.css';

export type Register = {
  firstName: string;
  email: string;
  password: string;
};

type UserIDs = {
  [K in keyof Register]: string;
};

export const RegisterForm: React.FC = () => {
  const registerIds: UserIDs = {
    firstName: useId(),
    email: useId(),
    password: useId(),
  };

  const createUser = async (user: UserIDs): Promise<UserIDs> => {
    const URL = 'http://localhost:8000/auth/register';
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user.email,
        password: user.password,
        firstName: user.firstName,
      }),
    });

    if (!response.ok) {
      throw new Error(`${response.status} -- ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();

    const form = ev.currentTarget;

    const formData = new FormData(form);
    const result: Record<string, string | boolean> = {
      isOkConditions: false,
    };
    for (const [key, value] of formData) {
      if (value === 'on' || !value) {
        result[key] = value === 'on';
      } else {
        result[key] = value as string;
      }
    }
    console.log(result);
    createUser(result as UserIDs);
  };

  return (
    <div className={styles.container}>
      <h2>Registro de usuarios</h2>
      <form onSubmit={handleSubmit}>
        <div className="group-control">
          <input
            type="text"
            placeholder="Dime tu nombre"
            required
            name="firstName"
            id={registerIds.firstName}
          />
        </div>

        <div className="group-control">
          <input
            type="email"
            placeholder="Dime tu email"
            required
            name="email"
            id={registerIds.email}
          />
        </div>

        <div className="group-control">
          <input
            type="password"
            placeholder="Dime tu password"
            required
            name="password"
            id={registerIds.password}
          />
        </div>

        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
};

export { RegisterForm as Component };
