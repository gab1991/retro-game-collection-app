import { createAction } from 'typesafe-actions';

export const signIn = createAction('auth/signIn', (username: string) => username)();

export const logOut = createAction('auth/logOut')();
