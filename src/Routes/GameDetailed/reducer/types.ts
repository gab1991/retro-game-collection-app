import { ActionType } from 'typesafe-actions';
import { DeepReadonly } from 'utility-types';

import { IRawgGameDetails } from 'Typings/RawgData';

import * as gameDetailedActions from './actions';

export type TGameDetailedActions = ActionType<typeof gameDetailedActions>;

export type TGameDetailedReducer = DeepReadonly<{
  descriptionHtml: string | null;
  gameDetails: IRawgGameDetails | null;
  isOwned: boolean;
  isWished: boolean;
  screenshots: Array<string>;
  showOwnedNotifier: boolean;
  showWishListWarn: boolean;
  showWishNotifier: boolean;
  uploadableElms: TUploadableEmls;
}>;

export type TUploadableEmls = {
  [elm in TToggleableEmls]: IUploadableElmemnt;
};

export interface IUploadableElmemnt {
  isLoading?: boolean;
  show: boolean;
  url?: string;
}

export enum EVideoType {
  'gameplay' = 'gameplay',
  'soundtrack' = 'soundtrack',
}

export type TToggleableEmls = 'soundtrackVideo' | 'gameplayVideo' | 'ebaySection';

export const isToggleableElms = (str: string): str is TToggleableEmls => {
  const allowedValues = ['soundtrackVideo', 'gameplayVideo', 'ebaySection'];
  return allowedValues.includes(str);
};
