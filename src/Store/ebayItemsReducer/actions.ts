import { createAction } from 'typesafe-actions';

import { TPlatformNames } from 'Configs/appConfig';
import { TEbayCard, TEbayCardItemData } from 'Typings/EbayData';

export const setEbayItems = createAction(
  'ebayItems/setEbayItems',
  (items: Array<TEbayCard>, platform: TPlatformNames, game: string, sortOrder: string) => ({
    game,
    items,
    platform,
    sortOrder,
  })
)();

export const setEbaySingleItemData = createAction(
  'ebayItems/setEbaySingleItemData',
  (platform: TPlatformNames, game: string, index: number, itemData: TEbayCardItemData, sortOrder: string) => ({
    game,
    index,
    itemData,
    platform,
    sortOrder,
  })
)();
