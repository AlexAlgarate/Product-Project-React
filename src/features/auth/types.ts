export type Register = {
  firstName: string;
  email: string;
  password: string;
  isOkConditions: boolean;
};

export type Login = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type ApiResponse<T = unknown> = {
  data?: T;
  message?: string;
  accessToken?: string;
  [k: string]: unknown;
};

export type ButtonState = 'idle' | 'loading' | 'success';
