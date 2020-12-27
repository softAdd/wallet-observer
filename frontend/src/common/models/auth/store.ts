import { createEffect, createEvent, createStore } from 'effector';
import { User } from 'common/types/auth';
import { LoginParams, RegisterParams } from 'common/api/auth';

export const $user = createStore<User | null>(null);
export const setUser = createEvent<User | null>();

export const requestLogoutFx = createEffect<void, void>();
export const requestWhoamiFx = createEffect<string, User>();
export const requestLoginFx = createEffect<LoginParams, User>();
export const requestRegisterFx = createEffect<RegisterParams, User>();

export const $loginError = createStore(false);
export const setLoginError = createEvent<boolean>();

export const $registerError = createStore(false);
export const setRegisterError = createEvent<boolean>();
