import { createAction } from 'typesafe-actions';

import { TPlatformNames } from 'Configs/appConfig';
import { IEbayCardItemData, TEbayCard } from 'Typings/EbayData';

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
  (platform: TPlatformNames, game: string, index: number, itemData: IEbayCardItemData, sortOrder: string) => ({
    game,
    index,
    itemData,
    platform,
    sortOrder,
  })
)();

export const calculateTotalPrice = createAction(
  'ebayItems/calculateTotalPrice',
  (platform: TPlatformNames, game: string, index: number, sortOrder: string) => ({ game, index, platform, sortOrder })
)();

export const setIsWatchedEbayCard = createAction(
  'ebayItems/setIsWatchedEbayCard',
  (platform: TPlatformNames, game: string, sortOrder: string, index: number, bool: boolean) => ({
    bool,
    game,
    index,
    platform,
    sortOrder,
  })
)();

export const setEbayItemShippingLoading = createAction(
  'ebayItems/setEbayItemShippingLoading',
  (game: string, platform: TPlatformNames, sortOrder: string, index: number, bool: boolean) => ({
    bool,
    game,
    index,
    platform,
    sortOrder,
  })
)();

export const setEbayItemShippingCost = createAction(
  'ebayItems/setEbayItemShippingCost',
  (game: string, platform: TPlatformNames, sortOrder: string, index: number, value: number | null) => ({
    game,
    index,
    platform,
    sortOrder,
    value,
  })
)();

export const setContactSeller = createAction(
  'ebayItems/setContactSeller',
  (game: string, platform: TPlatformNames, sortOrder: string, index: number, bool: boolean) => ({
    bool,
    game,
    index,
    platform,
    sortOrder,
  })
)();
