import { TAuthModalErrors } from './types';
import { createAction, createAsyncAction } from 'typesafe-actions';

export const signIn = createAsyncAction('auth/signIn/request', 'auth/signIn/success', 'auth/signIn/failure')<
  void,
  string,
  TAuthModalErrors
>();

export const signUp = createAsyncAction('auth/signUp/request', 'auth/signUp/success', 'auth/signUp/failure')<
  void,
  string,
  TAuthModalErrors
>();

export const logOut = createAction('auth/logOut')();
