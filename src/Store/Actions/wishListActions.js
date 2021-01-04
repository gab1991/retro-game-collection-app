import { getEbayItems as getEbayItemsCore } from 'Store/ebayItemsReducer/thunks';

const WISH_LIST_SET_EBAY_SECTION_LOADING = 'WISH_LIST_SET_EBAY_SECTION_LOADING';

const setEbaySectionLoading = (platform, game, bool) => {
  return {
    payload: {
      bool,
      game,
      platform,
    },
    type: WISH_LIST_SET_EBAY_SECTION_LOADING,
  };
};

const getEbayItems = (platform, game, sortOrder) => {
  return async (dispatch) => {
    dispatch(setEbaySectionLoading(platform, game, true));
    dispatch(getEbayItemsCore(platform, game, sortOrder));
    dispatch(setEbaySectionLoading(platform, game, false));
  };
};

export { getEbayItems };
export { WISH_LIST_SET_EBAY_SECTION_LOADING };
