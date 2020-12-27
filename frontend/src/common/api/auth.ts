import staticAxios from 'axios';
import { User } from 'common/types/auth';

export type LoginParams = {
  name: string;
  password: string;
};

export const postLogin = (params: LoginParams) =>
  staticAxios.post<User>('/jwt-auth/login', params);

export const postLogout = (refreshToken: string) =>
  staticAxios.post<void>('/jwt-auth/logout', { refreshToken });

export type RegisterParams = {
  name: string;
  password: string;
  email: string;
};

export const postRegister = (params: RegisterParams) =>
  staticAxios.post<User>('/jwt-auth/register', params);

export const postWhoami = (refreshToken: string) =>
  staticAxios.post<User>('/jwt-auth/whoami', { refreshToken });
