import { EEbaySortOrder } from 'Backend/types';
import { IRootState } from 'Store/types';
import { DeepReadonly } from 'utility-types';

import { TPlatformNames } from 'Configs/appConfig';
import { TEbayCard } from 'Typings/EbayData';

interface ISelEbatCardItemId {
  game: string;
  index: number;
  platform: TPlatformNames;
  sortOrder: EEbaySortOrder;
}

export const selectEbayCardItemId = (
  store: IRootState,
  { platform, game, sortOrder, index }: ISelEbatCardItemId
): number | null => {
  if (!store || !platform || !game || !sortOrder) return null;
  const { ebayItems } = store;
  //@ts-ignore fix it later
  const { itemId: itemIdArr = { itemId: null } } = ebayItems?.[platform]?.[game]?.[sortOrder]?.[index];
  if (!itemIdArr || !itemIdArr[0]) return null;
  return itemIdArr[0];
};

export const selectEbayCardItems = (
  store: IRootState,
  { platform, game, sortOrder }: Omit<ISelEbatCardItemId, 'index'>
): DeepReadonly<Array<TEbayCard>> => {
  if (!store || !platform || !game || !sortOrder) return [];
  const { ebayItems } = store;
  const ebayCardItems = ebayItems?.[platform]?.[game]?.[sortOrder];
  return ebayCardItems || [];
};

export const selectEbayCard = (
  store: IRootState,
  { platform, game, sortOrder, index }: ISelEbatCardItemId
): null | DeepReadonly<TEbayCard> => {
  if (!store || !platform || !game || !sortOrder) null;
  const { ebayItems } = store;
  return ebayItems?.[platform]?.[game]?.[sortOrder]?.[index] || null;
};
