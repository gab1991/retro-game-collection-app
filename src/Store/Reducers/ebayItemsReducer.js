import { createReducer, current } from '@reduxjs/toolkit';
import set from 'lodash/set';
import {
  SET_EBAY_ITEMS,
  SET_EBAY_SINGLE_ITEM_DATA,
  SET_IS_WATCHED_EBAY_CARD,
  SET_EBAY_ITEM_SHIPPING_COST,
  SET_EBAY_ITEM_SHIPPING_COST_LOADING,
  SET_EBAY_ITEM_SHIPPING_CONTACT_SELLER,
  CALCULATE_TOTAL_PRICE,
  DEFAULT_SORT_ORDER,
} from '../Actions/ebayItemsActions';

const ebayItemsReducer = createReducer({}, (builder) => {
  builder
    .addCase(SET_EBAY_ITEMS, (state, { payload }) => {
      const { items = [], platform, game, sortOrder = DEFAULT_SORT_ORDER } = payload;

      if (!game || !platform) return;

      set(state, [platform, game, sortOrder], items);
    })
    .addCase(SET_EBAY_SINGLE_ITEM_DATA, (state, { payload }) => {
      const { platform, game, index, itemData, sortOrder = DEFAULT_SORT_ORDER } = payload;
      if (!game || !platform || (!index && index !== 0)) return;

      const isAuction = itemData?.listingType !== 'FixedPriceItem' ? true : false;
      const shippingCost = itemData?.deliveryPrice || null;

      state[platform][game][sortOrder][index] = {
        ...state[platform][game][sortOrder][index],
        isAuction,
        shippingCost,
        itemData,
      };
    })
    .addCase(SET_IS_WATCHED_EBAY_CARD, (state, { payload }) => {
      const { platform, game, sortOrder = DEFAULT_SORT_ORDER, index, bool } = payload;
      if (!game || !platform || (!index && index !== 0)) return;
      state[platform][game][sortOrder][index].isWatched = bool;
    })
    .addCase(SET_EBAY_ITEM_SHIPPING_COST_LOADING, (state, { payload }) => {
      const { platform, game, sortOrder = DEFAULT_SORT_ORDER, index, bool } = payload;
      if (!game || !platform || (!index && index !== 0)) return;

      state[platform][game][sortOrder][index].isLoadingShippingCosts = bool;
    })
    .addCase(SET_EBAY_ITEM_SHIPPING_COST, (state, { payload }) => {
      const { platform, game, sortOrder = DEFAULT_SORT_ORDER, index, value } = payload;
      if (!game || !platform || (!index && index !== 0)) return;

      state[platform][game][sortOrder][index].shippingCost = value ? value.toFixed(2) : null;
    })
    .addCase(CALCULATE_TOTAL_PRICE, (state, { payload }) => {
      const { platform, game, sortOrder = DEFAULT_SORT_ORDER, index } = payload;
      if (!game || !platform || (!index && index !== 0)) return;
      const {
        shippingCost,
        itemData: { currentPrice },
      } = state[platform][game][sortOrder][index];
      const totalPrice = (Number(shippingCost) + Number(currentPrice)).toFixed(2);

      state[platform][game][sortOrder][index].totalPrice = totalPrice;
    })
    .addCase(SET_EBAY_ITEM_SHIPPING_CONTACT_SELLER, (state, { payload }) => {
      const { platform, game, sortOrder = DEFAULT_SORT_ORDER, index, bool } = payload;
      if (!game || !platform || (!index && index !== 0)) return;
      state[platform][game][sortOrder][index].contactSeller = bool;
    })

    .addDefaultCase((state, action) => {});
});

export default ebayItemsReducer;
