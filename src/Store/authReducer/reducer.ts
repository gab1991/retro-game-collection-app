import { TAuthActions, TAuthReducer } from './types';
import { createReducer } from 'typesafe-actions';

import * as actions from './actions';

const initial: TAuthReducer = {
  token: null,
  username: null,
};

export const authReducer = createReducer<TAuthReducer, TAuthActions>(initial).handleAction(
  actions.signIn,
  (state, { payload }) => ({
    ...state,
    token: payload.token,
    username: payload.username,
  })
);
