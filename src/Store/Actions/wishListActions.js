import Backend from '../../Backend/Backend';
import { setEbayItems } from './ebayItemsActions';

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
  return async (dispatch, getState) => {
    const { ebayItems } = getState();

    //check if these ebay cards are already in reducer
    if (ebayItems?.[platform]?.[game]?.[sortOrder]) return;

    try {
      dispatch(setEbaySectionLoading(platform, game, true));
      let items;

      if (sortOrder === 'Watched') {
        const { data: ebayItems } = await Backend.getGameWatchedCards(
          platform,
          game
        );
        items = ebayItems.map((ebayItem) => ({ itemId: [ebayItem.id] }));
      } else {
        const [res] = await Backend.getEbayItems(platform, game, sortOrder);
        const { item: ebayItems } = res;
        items = ebayItems;
      }

      dispatch(setEbayItems(items, platform, game, sortOrder));
      dispatch(setEbaySectionLoading(platform, game, false));
    } catch (err) {
      dispatch(setEbaySectionLoading(platform, game, false));
    }
  };
};

export { getEbayItems };
