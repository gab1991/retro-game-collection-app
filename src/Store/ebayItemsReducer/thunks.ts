import { Backend } from 'Backend';

import { TThunk } from 'Store/types';

import { appConfig, TPlatformNames } from 'Configs/appConfig';
import { showErrModal } from 'Store/appStateReducer/actions';

import { setEbayItems, setEbaySingleItemData } from './actions';

const DEFAULT_SORT_ORDER = appConfig.EbayCards.defaultSortOrder;

export const getEbayItems = (platform: TPlatformNames, game: string, sortOrder = DEFAULT_SORT_ORDER): TThunk => {
  return async (dispatch, getState) => {
    const { ebayItems } = getState();

    //check if these ebay cards are already in reducer
    if (ebayItems?.[platform]?.[game]?.[sortOrder]) return;
    let items = [];

    const errHandler = () => {
      dispatch(showErrModal({ message: 'Cannot fetch ebay cards! Try again later' }));
    };

    if (sortOrder === 'Watched') {
      const { data: ebayItems = { ebayItems: [] } } = await Backend.getGameWatchedCards(platform, game, errHandler);

      items = ebayItems.map((ebayItem) => ({ itemId: [ebayItem.id] }));
    } else {
      const { data = null } = await Backend.getEbayItems(platform, game, sortOrder, errHandler);

      if (data && data[0]) {
        const { item: ebayitems = [] } = data[0];
        items = ebayitems;
      }
    }

    if (items.length) {
      dispatch(setEbayItems(items, platform, game, sortOrder));
    }
  };
};

export const getEbaySingleItemByIndex = (
  platform: TPlatformNames,
  game: string,
  index: number,
  sortOrder = DEFAULT_SORT_ORDER
): TThunk => {
  return async (dispatch, getState) => {
    const itemId = getCardItemId(getState(), {
      game,
      index,
      platform,
      sortOrder,
    });

    const itemData = await getEbaySingleItem(itemId, dispatch);

    if (!itemData) return;

    dispatch(setEbaySingleItemData(platform, game, index, itemData, sortOrder));
  };
};

const getEbaySingleItem = async (itemId, dispatch) => {
  const { data: { Item: item } = { Item: null } } = await Backend.getEbaySingleItem(itemId, () => {
    dispatch(showErrModal({ message: 'Something wrong happened.Try again later' }));
  });

  if (!item) return null;

  return {
    bidCount: item?.BidCount,
    convertedCurrentPrice: item?.ConvertedCurrentPrice,
    currency: item?.ConvertedCurrentPrice.CurrencyID,
    currentPrice: Number(item?.ConvertedCurrentPrice.Value).toFixed(2),
    deliveryPrice: item?.ShippingServiceCost ? item?.ShippingServiceCost.Value : '',
    endTime: item?.EndTime,
    itemId: itemId,
    itemUrl: item?.ViewItemURLForNaturalSearch,
    listingType: item?.ListingType,
    pictures: item?.PictureURL,
    shipping: item?.ShippingCostSummary,
    title: item?.Title,
  };
};

const getCardItemId = (store, { platform, game, sortOrder, index }) => {
  if (!store || !platform || !game || !sortOrder) return null;
  const { ebayItems } = store;
  const { itemId: itemIdArr = { itemId: null } } = ebayItems?.[platform]?.[game]?.[sortOrder]?.[index];
  if (!itemIdArr || !itemIdArr[0]) return null;
  return itemIdArr[0];
};
