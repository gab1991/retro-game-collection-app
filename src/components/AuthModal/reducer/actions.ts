import { ISignUpData } from 'Backend/types';
import { createAction, createAsyncAction } from 'typesafe-actions';

export const setIsSending = createAction('authModal/setIsSending', (value: boolean) => value)();

export const postSignUp = createAsyncAction(
  'authModal/postSignUp/request',
  'authModal/postSignUp/success',
  'authModal/postSignUp/failure'
)<void, ISignUpData, Error>();
