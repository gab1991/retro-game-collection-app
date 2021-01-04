import { IRootState } from 'Store/types';

import { TPlatformNames } from 'Configs/appConfig';

interface ISelEbatCardItemId {
  game: string;
  index: number;
  platform: TPlatformNames;
  sortOrder: string;
}

export const selectEbayCardItemId = (store: IRootState, { platform, game, sortOrder, index }: ISelEbatCardItemId) => {
  if (!store || !platform || !game || !sortOrder) return null;
  const { ebayItems } = store;
  const { itemId: itemIdArr = { itemId: null } } = ebayItems?.[platform]?.[game]?.[sortOrder]?.[index];
  if (!itemIdArr || !itemIdArr[0]) return null;
  return itemIdArr[0];
};
