import { produce } from 'immer';

import { TEbayItemsActions, TEbayItemsReducer } from './types';
import { createReducer } from 'typesafe-actions';

import set from 'lodash/set';

import * as actions from './actions';

const initial: TEbayItemsReducer = {};

export const ebayItemsReducer = createReducer<TEbayItemsReducer, TEbayItemsActions>(initial)
  .handleAction(
    actions.setEbayItems,
    (state, { payload }): TEbayItemsReducer => {
      return produce(state, (draft) => {
        const { items = [], platform, game, sortOrder } = payload;
        if (!game || !platform) return;
        set(draft, [platform, game, sortOrder], items);
      });
    }
  )
  .handleAction(
    actions.setEbaySingleItemData,
    (state, { payload }): TEbayItemsReducer => {
      return produce(state, (draft) => {
        const { platform, game, index, itemData, sortOrder } = payload;

        if (!game || !platform || (!index && index !== 0)) return;

        const isAuction = itemData?.listingType !== 'FixedPriceItem' ? true : false;
        const shippingCost = itemData?.deliveryPrice || null;
        const ebayCardContent = draft?.[platform]?.[game]?.[sortOrder]?.[index];

        set(draft, [platform, game, sortOrder, index], { ...ebayCardContent, isAuction, itemData, shippingCost });
      });
    }
  )
  .handleAction(
    actions.setIsWatchedEbayCard,
    (state, { payload }): TEbayItemsReducer => {
      return produce(state, (draft) => {
        const { platform, game, sortOrder, index, bool } = payload;
        if (!game || !platform || (!index && index !== 0)) return;

        set(draft, [platform, game, sortOrder, index, 'isWatched'], bool);
      });
    }
  )
  .handleAction(
    actions.setEbayItemShippingLoading,
    (state, { payload }): TEbayItemsReducer => {
      return produce(state, (draft) => {
        const { platform, game, sortOrder, index, bool } = payload;
        if (!game || !platform || (!index && index !== 0)) return;

        set(draft, [platform, game, sortOrder, index, 'isLoadingShippingCosts'], bool);
      });
    }
  )
  .handleAction(
    actions.setEbayItemShippingCost,
    (state, { payload }): TEbayItemsReducer => {
      return produce(state, (draft) => {
        const { platform, game, sortOrder, index, value } = payload;

        if (!game || !platform || (!index && index !== 0)) return;

        set(draft, [platform, game, sortOrder, index, 'shippingCost'], value);
      });
    }
  )
  .handleAction(
    actions.calculateTotalPrice,
    (state, { payload }): TEbayItemsReducer => {
      return produce(state, (draft) => {
        const { platform, game, sortOrder, index } = payload;

        if (!game || !platform || (!index && index !== 0)) return;

        const ebayCard = draft[platform]?.[game][sortOrder][index];

        if (!ebayCard.itemData.currentPrice) {
          return;
        }

        const {
          shippingCost,
          itemData: { currentPrice },
        } = ebayCard;

        const totalPrice = Number(((Number(shippingCost) || 0) + Number(currentPrice)).toFixed(2));

        set(draft, [platform, game, sortOrder, index, 'totalPrice'], totalPrice);
      });
    }
  )
  .handleAction(
    actions.setContactSeller,
    (state, { payload }): TEbayItemsReducer => {
      return produce(state, (draft) => {
        const { platform, game, sortOrder, index, bool } = payload;
        if (!game || !platform || (!index && index !== 0)) return;

        set(draft, [platform, game, sortOrder, index, 'contactSeller'], bool);
      });
    }
  );
