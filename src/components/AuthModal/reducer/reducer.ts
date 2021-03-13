import { TAuthModalActions, TAuthModalReducer } from './types';
import { createReducer } from 'typesafe-actions';

import * as actions from './actions';

const initial: TAuthModalReducer = {
  isSending: false,
};

export const authModalReducer = createReducer<TAuthModalReducer, TAuthModalActions>(initial)
  .handleAction(actions.setIsSending, (state, { payload }) => {
    console.log(payload);
    return { ...state, isSending: payload };
  })
  .handleAction(actions.postSignUp.request, (state) => {
    return { ...state, isSending: true };
  })
  .handleAction([actions.postSignUp.failure, actions.postSignUp.success], (state) => {
    return { ...state, isSending: false };
  });
