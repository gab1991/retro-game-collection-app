import { Backend } from 'Backend';

import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { IRootState, TThunk } from 'Store/types';

import { appConfig, TPlatformNames } from 'Configs/appConfig';
import { showErrModal } from 'Store/appStateReducer/actions';
import { IEbayCardItemData } from 'Typings/EbayData';

import {
  setContactSeller,
  setEbayItems,
  setEbayItemShippingCost,
  setEbayItemShippingLoading,
  setEbaySingleItemData,
} from './actions';
import { selectEbayCardItemId } from './selectors';

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
    const itemId = selectEbayCardItemId(getState(), {
      game,
      index,
      platform,
      sortOrder,
    });

    if (itemId === null) {
      return;
    }

    const itemData = await getEbaySingleItem(itemId, dispatch);

    if (!itemData) return;

    dispatch(setEbaySingleItemData(platform, game, index, itemData, sortOrder));
  };
};

export const getShippingCosts = (
  game: string,
  platform: TPlatformNames,
  itemId: number,
  index: number,
  sortOrder = DEFAULT_SORT_ORDER
): TThunk => {
  return async (dispatch) => {
    dispatch(setEbayItemShippingLoading(game, platform, sortOrder, index, true));

    const { ShippingCostSummary } = await Backend.getShippingCosts(itemId, () => {
      dispatch(setEbayItemShippingLoading(game, platform, sortOrder, index, false));
    });
    const { Value: value } = ShippingCostSummary?.ShippingServiceCost || {};
    const costinNumber = Number(value);

    dispatch(setEbayItemShippingLoading(game, platform, sortOrder, index, false));

    if (costinNumber) {
      dispatch(setEbayItemShippingCost(game, platform, sortOrder, index, costinNumber));
    } else {
      dispatch(setEbayItemShippingCost(game, platform, sortOrder, index, null));
      dispatch(setContactSeller(game, platform, sortOrder, index, true));
    }
  };
};

const getEbaySingleItem = async (
  itemId: number,
  dispatch: ThunkDispatch<IRootState, unknown, Action<string>>
): Promise<IEbayCardItemData | null> => {
  const { data: { Item: item } = { Item: null } } = await Backend.getEbaySingleItem(itemId, () => {
    dispatch(showErrModal({ message: 'Something wrong happened.Try again later' }));
  });

  if (!item) return null;

  return {
    bidCount: item?.BidCount,
    convertedCurrentPrice: item?.ConvertedCurrentPrice,
    currency: item?.ConvertedCurrentPrice.CurrencyID,
    currentPrice: Number(item?.ConvertedCurrentPrice.Value.toFixed(2)),
    deliveryPrice: Number(item?.ShippingServiceCost ? item?.ShippingServiceCost.Value : '') || 0,
    endTime: item?.EndTime,
    itemId: itemId,
    itemUrl: item?.ViewItemURLForNaturalSearch,
    listingType: item?.ListingType,
    pictures: item?.PictureURL,
    shipping: item?.ShippingCostSummary,
    title: item?.Title,
  };
};
