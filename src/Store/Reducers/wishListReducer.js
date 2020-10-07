import { createReducer, current } from '@reduxjs/toolkit';
import set from 'lodash/set';

const initial = {
  platforms: {},
};

// console.log(current(state));

const wishListReducer = createReducer(initial, (builder) => {
  builder
    .addCase('WISH_LIST_SET_EBAY_SECTION_LOADING', (state, { payload }) => {
      const { bool, game, platform } = payload;
      if (!game || !platform) return;

      set(state, ['platforms', platform, game, 'isEbayShowing'], bool);
    })
    .addCase('WISH_LIST_SET_EBAY_ITEMS_BY_SORT_ORDER', (state, { payload }) => {
      const { items, platform, game, sortOrder = 'relevance' } = payload;
      if (!game || !platform) return;

      set(state, ['platforms', platform, game, sortOrder], items);
    })
    .addDefaultCase((state, action) => {});
});

export default wishListReducer;
