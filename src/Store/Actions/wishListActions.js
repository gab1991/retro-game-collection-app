import Backend from '../../Backend/Backend';
import {
  setEbayItems,
  getEbayItems as getEbayItemsCore,
} from './ebayItemsActions';

const setEbaySectionLoading = (platform, game, bool) => {
  return {
    type: 'WISH_LIST_SET_EBAY_SECTION_LOADING',
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
