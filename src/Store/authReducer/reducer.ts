import { TAuthActions, TAuthReducer } from './types';
import { createReducer } from 'typesafe-actions';

import * as actions from './actions';

const initial: TAuthReducer = {
  isLoading: false,
  signInErrors: null,
  signUpErrors: null,
  username: null,
};

export const authReducer = createReducer<TAuthReducer, TAuthActions>(initial)
  .handleAction(
    [actions.signIn.success, actions.signUp.success],
    (state, { payload }): TAuthReducer => ({
      ...state,
      isLoading: false,
      username: payload,
    })
  )
  .handleAction(actions.signUp.failure, (state, { payload }) => ({ ...state, isLoading: false, signUpErrors: payload }))
  .handleAction(actions.signIn.failure, (state, { payload }) => ({ ...state, isLoading: false, signInErrors: payload }))
  .handleAction([actions.signUp.request, actions.signIn.request], (state) => ({ ...state, isLoading: true }))
  .handleAction(actions.logOut, (): TAuthReducer => initial);
