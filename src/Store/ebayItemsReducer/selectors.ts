import { TEbayItemsColletion } from './types';
import { EEbaySortOrder } from 'Api/types';
import { IRootState } from 'Store/types';
import { DeepReadonly } from 'utility-types';

import { TPlatformNames } from 'Configs/appConfig';
import { TEbayCard } from 'Typings/ebayData';

interface ISelEbatCardItemId {
  game: string;
  index: number;
  platform: TPlatformNames;
  sortOrder: EEbaySortOrder;
}

export const selectAllEbayCardItems = (store: IRootState): DeepReadonly<TEbayItemsColletion> => store.ebayItems.items;

export const selectEbayCardItemId = (
  store: IRootState,
  { platform, game, sortOrder, index }: ISelEbatCardItemId
): number | null => {
  if (!store || !platform || !game || !sortOrder) return null;
  const { items } = store.ebayItems;

  const ebyaCard = items?.[platform]?.[game]?.[sortOrder]?.[index];

  if (!ebyaCard || !ebyaCard.itemId || !ebyaCard.itemId[0]) {
    return null;
  }
  return Number(ebyaCard.itemId[0]);
};

export const selectEbayCardItems = (
  store: IRootState,
  { platform, game, sortOrder }: Omit<ISelEbatCardItemId, 'index'>
): DeepReadonly<Array<TEbayCard>> | null => {
  if (!store || !platform || !game || !sortOrder) return null;
  const { items } = store.ebayItems;
  const ebayCardItems = items?.[platform]?.[game]?.[sortOrder];
  return ebayCardItems || null;
};

export const selectEbayCard = (
  store: IRootState,
  { platform, game, sortOrder, index }: ISelEbatCardItemId
): null | DeepReadonly<TEbayCard> => {
  if (!store || !platform || !game || !sortOrder) return null;
  const { items } = store.ebayItems;
  return items?.[platform]?.[game]?.[sortOrder]?.[index] || null;
};
