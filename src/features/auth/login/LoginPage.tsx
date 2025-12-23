import React from 'react';
import { useId, useState } from 'react';
import styles from '../register/registerForm.module.css';

interface Login {
  email: string;
  password: string;
  rememberMe: boolean;
}

const login: Login = {
  email: '',
  password: '',
  rememberMe: false,
};

export const LoginForm: React.FC = () => {
  const [userData, setUserData] = useState<Login>(login);

  const usernameId = useId();
  const passwordId = useId();
  const rememberMeId = useId();

  const getUserData = async (): Promise<void> => {
    const token = localStorage.getItem('products-token');

    try {
      const URL = 'http://localhost:8000';
      const response = await fetch(`${URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error();
      }

      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async (user: Login): Promise<unknown> => {
    const URL = 'http://localhost:8000/auth/login';
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user.email,
        password: user.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`${response.status} -- ${response.statusText}`);
    }

    return data.accessToken;
  };

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();
    const token = await loginUser(userData);
    localStorage.setItem('products-token', token as string);
    setTimeout(() => {
      window.location.href = '/products';
    }, 1000);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (
    event
  ) => {
    const { value, name, type } = event.target;
    const checked = type === 'checkbox' ? event.target.checked : '';
    setUserData({
      ...userData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className={styles.container}>
      <h2>Inicio sesión de usuarios</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label className={styles.groupControl} htmlFor={usernameId}>
            <span className={styles.label}>Username</span>
            <input
              type="email"
              name="email"
              id={usernameId}
              placeholder="Dime tu email"
              aria-label="email"
              required
              value={userData.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label className={styles.groupControl} htmlFor={passwordId}>
            <span className={styles.label}>Password</span>
            <input
              type="password"
              name="password"
              id={passwordId}
              placeholder="Dime tu password"
              aria-label="password"
              required
              minLength={5}
              value={userData.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor={rememberMeId}>
            <input
              type="checkbox"
              name="rememberMe"
              id={rememberMeId}
              aria-label="rememberMe"
              checked={userData.rememberMe}
              onChange={handleChange}
            />
            <span style={{ marginLeft: '0.5rem' }}>Recuérdame</span>
          </label>
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
};
