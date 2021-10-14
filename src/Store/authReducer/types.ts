import { ESignUpInputs } from 'Components/AuthModal/types';
import { ActionType } from 'typesafe-actions';
import { DeepReadonly } from 'utility-types';

import * as authActions from './actions';

export type TAuthActions = ActionType<typeof authActions>;

export type TSignUpErrors = { err: string; field: ESignUpInputs };

export type TAuthReducer = DeepReadonly<{
  isLoading: boolean;
  signupErrors: null | TSignUpErrors;
  username: string | null;
}>;
