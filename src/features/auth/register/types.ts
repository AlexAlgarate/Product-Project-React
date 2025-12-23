export type Register = {
  firstName: string;
  email: string;
  password: string;
  isOkConditions: boolean;
};

export type ApiResponse<T = unknown> = {
  data?: T;
  message?: string;
  [k: string]: unknown;
};
