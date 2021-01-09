import { TProfileActions, TProfileReducer } from './types';
import { createReducer } from 'typesafe-actions';

import * as actions from './actions';

const initial: TProfileReducer = null;

export const profileReducer = createReducer<TProfileReducer, TProfileActions>(initial)
  .handleAction(actions.fillProfile, (_, { payload }): TProfileReducer => payload)
  .handleAction(actions.flushProfile, (): TProfileReducer => initial);
