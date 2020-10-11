import { createReducer, current } from '@reduxjs/toolkit';
import set from 'lodash/set';
import { WISH_LIST_SET_EBAY_SECTION_LOADING } from '../Actions/wishListActions';

// console.log(current(state));

const wishListReducer = createReducer({}, (builder) => {
  builder
    .addCase(WISH_LIST_SET_EBAY_SECTION_LOADING, (state, { payload }) => {
      const { bool, game, platform } = payload;
      if (!game || !platform) return;
      set(state, [platform, game, 'isEbayLoading'], bool);
    })
    .addDefaultCase((state, action) => {});
});

export default wishListReducer;
