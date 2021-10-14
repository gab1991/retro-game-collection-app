import { TSignUpErrors } from './types';
import { TSelector } from 'Store/types';

export const selectLoggedUser: TSelector<string | null> = (state) => state.auth.username;

export const selectIsAuthLoading: TSelector<boolean> = (state) => state.auth.isLoading;

export const selectSignUpErrs: TSelector<TSignUpErrors | null> = (state) => state.auth.signupErrors;
