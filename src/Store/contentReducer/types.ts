import { ActionType } from 'typesafe-actions';
import { DeepReadonly } from 'utility-types';

import { TPlatformNames } from 'Configs/appConfig';

import * as contentActions from './actions';

export type TContentActions = ActionType<typeof contentActions>;

export type TContentReducer = DeepReadonly<{ boxArts: TBoxArts }>;

export type TBoxArts = {
  [P in TPlatformNames]?: TGameBoxArUrl;
};
type TGameBoxArUrl = {
  [game: string]: string;
};
