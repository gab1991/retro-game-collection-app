import { ActionType } from 'typesafe-actions';
import { DeepReadonly } from 'utility-types';

import { TPlatformNames } from 'Configs/appConfig';

import * as profileActions from './actions';

export type TProfileActions = ActionType<typeof profileActions>;
export type TProfileReducer = DeepReadonly<IProfile> | null;

export interface IProfile {
  createdDate: string;
  email: string;
  owned_list: { platforms: Array<IProfilePlatform> };
  password: string;
  username: string;
  wish_list: { platforms: Array<IProfilePlatform> };
}

interface IProfilePlatform {
  games: Array<IProfileGame>;
  name: TPlatformNames;
}

export interface IProfileGame {
  date: string;
  isShowEbay: boolean;
  name: string;
  slug: string;
  watchedEbayOffers: Array<IProfileWatchEbayCard>;
}

interface IProfileWatchEbayCard {
  date: string;
  id: string;
}
