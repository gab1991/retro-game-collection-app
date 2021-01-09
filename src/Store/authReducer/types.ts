import { ActionType } from 'typesafe-actions';
import { DeepReadonly } from 'utility-types';

import * as authActions from './actions';

export type TAuthActions = ActionType<typeof authActions>;
export type TAuthReducer = DeepReadonly<{ token: string | null; username: string | null }>;
