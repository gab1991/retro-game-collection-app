import { getEbayItems as getEbayItemsCore } from './ebayItemsActions';

const WISH_LIST_SET_EBAY_SECTION_LOADING = 'WISH_LIST_SET_EBAY_SECTION_LOADING';

const setEbaySectionLoading = (platform, game, bool) => {
  return {
    type: WISH_LIST_SET_EBAY_SECTION_LOADING,
    payload: {
      platform,
      game,
      bool,
    },
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
