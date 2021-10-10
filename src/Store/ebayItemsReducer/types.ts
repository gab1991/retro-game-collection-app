import { EEbaySortOrder } from 'Api/types';
import { ActionType } from 'typesafe-actions';
import { DeepReadonly } from 'utility-types';

import { TPlatformNames } from 'Configs/appConfig';
import { TEbayCard } from 'Typings/ebayData';

import * as ebayItemsActions from './actions';

export type TEbayItemsActions = ActionType<typeof ebayItemsActions>;

export type TEbayItemsReducer = DeepReadonly<
  {
    [platform in TPlatformNames]?: TGameToSortOrder;
  }
>;

type TGameToSortOrder = { [game: string]: TSortOrderToItems };
type TSortOrderToItems = { [sortOrder in EEbaySortOrder]: Array<TEbayCard> };
