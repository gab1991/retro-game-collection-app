import { EEbaySortOrder } from 'Api';

import { createAction } from 'typesafe-actions';

import { TPlatformNames } from 'Configs/appConfig';
import { IEbayCardItemData, TEbayCardPreviewRawData } from 'Typings/ebayData';

const commonEbayActionPayloadCreator = (
  game: string,
  platform: TPlatformNames,
  sortOrder: EEbaySortOrder,
  index: number,
  bool: boolean
) => ({
  bool,
  game,
  index,
  platform,
  sortOrder,
});

export const setEbayItems = createAction(
  'ebayItems/setEbayItems',
  (items: Array<TEbayCardPreviewRawData>, platform: TPlatformNames, game: string, sortOrder: EEbaySortOrder) => ({
    game,
    items,
    platform,
    sortOrder,
  })
)();

export const setEbaySingleItemData = createAction(
  'ebayItems/setEbaySingleItemData',
  (platform: TPlatformNames, game: string, index: number, itemData: IEbayCardItemData, sortOrder: EEbaySortOrder) => ({
    game,
    index,
    itemData,
    platform,
    sortOrder,
  })
)();

export const calculateTotalPrice = createAction(
  'ebayItems/calculateTotalPrice',
  (platform: TPlatformNames, game: string, index: number, sortOrder: EEbaySortOrder) => ({
    game,
    index,
    platform,
    sortOrder,
  })
)();

export const setIsWatchedEbayCard = createAction('ebayItems/setIsWatchedEbayCard', commonEbayActionPayloadCreator)();

export const setEbayItemShippingLoading = createAction(
  'ebayItems/setEbayItemShippingLoading',
  commonEbayActionPayloadCreator
)();

export const setEbayItemShippingCost = createAction(
  'ebayItems/setEbayItemShippingCost',
  (game: string, platform: TPlatformNames, sortOrder: EEbaySortOrder, index: number, value: number | null) => ({
    game,
    index,
    platform,
    sortOrder,
    value,
  })
)();

export const setContactSeller = createAction('ebayItems/setContactSeller', commonEbayActionPayloadCreator)();

export const removeWatchedCard = createAction(
  'ebayItems/removeWatchedCard',
  (game: string, platform: TPlatformNames, ebayItemId: number) => ({
    ebayItemId,
    game,
    platform,
  })
)();
