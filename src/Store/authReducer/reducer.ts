import { TAuthActions, TAuthReducer } from './types';
import { createReducer } from 'typesafe-actions';

import * as actions from './actions';

const initial: TAuthReducer = {
  isLoading: false,
  signupErrors: null,
  username: null,
};

export const authReducer = createReducer<TAuthReducer, TAuthActions>(initial)
  .handleAction(
    [actions.signIn, actions.signUp.success],
    (state, { payload }): TAuthReducer => ({
      ...state,
      isLoading: false,
      username: payload,
    })
  )
  .handleAction(actions.signUp.failure, (state, { payload }) => ({ ...state, isLoading: false, signupErrors: payload }))
  .handleAction(actions.signUp.request, (state) => ({ ...state, isLoading: true }))
  .handleAction(actions.logOut, (): TAuthReducer => initial);
