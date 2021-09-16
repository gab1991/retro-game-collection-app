import { TAuthActions, TAuthReducer } from './types';
import { createReducer } from 'typesafe-actions';

import * as actions from './actions';

const initial: TAuthReducer = {
  username: null,
};

export const authReducer = createReducer<TAuthReducer, TAuthActions>(initial)
  .handleAction(
    actions.signIn,
    (state, { payload }): TAuthReducer => ({
      ...state,
      username: payload,
    })
  )
  .handleAction(actions.logOut, (): TAuthReducer => initial);
