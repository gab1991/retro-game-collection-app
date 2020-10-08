import { createReducer, current } from '@reduxjs/toolkit';
import set from 'lodash/set';

// console.log(current(state));

const wishListReducer = createReducer({}, (builder) => {
  builder
    .addCase('WISH_LIST_SET_EBAY_SECTION_LOADING', (state, { payload }) => {
      const { bool, game, platform } = payload;
      if (!game || !platform) return;
      set(state, [platform, game, 'isEbayLoading'], bool);
    })
    .addCase('WISH_LIST_SET_EBAY_ITEMS_BY_SORT_ORDER', (state, { payload }) => {
      const { items, platform, game, sortOrder = 'relevance' } = payload;

      if (!game || !platform) return;

      set(state, [platform, game, sortOrder], items);
    })
    .addDefaultCase((state, action) => {});
});

export default wishListReducer;
