import { TSignUpErrors } from './types';
import { createAction, createAsyncAction } from 'typesafe-actions';

export const signIn = createAction('auth/signIn', (username: string) => username)();

export const signUp = createAsyncAction('auth/signIn/request', 'auth/signIn/success', 'auth/signIn/failure')<
  void,
  string,
  TSignUpErrors
>();

export const logOut = createAction('auth/logOut')();
