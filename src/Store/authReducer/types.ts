import { ESignInInputs, ESignUpInputs } from 'Components/AuthModal/types';
import { ActionType } from 'typesafe-actions';
import { DeepReadonly } from 'utility-types';

import * as authActions from './actions';

export type TAuthActions = ActionType<typeof authActions>;

export type TAuthModalErrors = { err: string; field: ESignUpInputs | ESignInInputs };

export type TAuthReducer = DeepReadonly<{
  isLoading: boolean;
  signInErrors: null | TAuthModalErrors;
  signUpErrors: null | TAuthModalErrors;
  username: string | null;
}>;
