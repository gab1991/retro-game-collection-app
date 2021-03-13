import { ActionType } from 'typesafe-actions';
import { DeepReadonly } from 'utility-types';

import * as authModalActions from './actions';

export type TAuthModalActions = ActionType<typeof authModalActions>;
export type TAuthModalReducer = DeepReadonly<{ isSending: boolean }>;
