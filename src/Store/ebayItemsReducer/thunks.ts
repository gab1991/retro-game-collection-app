import { batch } from 'react-redux';
import { api, isAxiosError } from 'Api';

import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { EEbaySortOrder } from 'Api/types';
import { IRootState, TThunk } from 'Store/types';

import { appConfig, TPlatformNames } from 'Configs/appConfig';
import { showErrModal, showInfoModal } from 'Store/appStateReducer/actions';
import { IEbayCardItemData, TEbayCardPreviewRawData } from 'Typings/EbayData';

import {
  setContactSeller,
  setEbayItems,
  setEbayItemShippingCost,
  setEbayItemShippingLoading,
  setEbaySingleItemData,
  setIsWatchedEbayCard,
} from './actions';
import { selectEbayCardItemId, selectEbayCardItemsReducer } from './selectors';

const DEFAULT_SORT_ORDER = appConfig.EbayCards.defaultSortOrder;

export const getEbayItemsThunk = (platform: TPlatformNames, game: string, sortOrder = DEFAULT_SORT_ORDER): TThunk => {
  return async (dispatch, getStore) => {
    const store = getStore();
    const ebayItems = selectEbayCardItemsReducer(store);

    //check if these ebay cards are already in reducer
    if (ebayItems?.[platform]?.[game]?.[sortOrder]) return;
    let items: Array<TEbayCardPreviewRawData> = [];

    try {
      if (sortOrder === EEbaySortOrder.Watched) {
        const { data: ebayItems = [] } = await api.getGameWatchedCards(platform, game);
        items = ebayItems.map((ebayItem) => ({ itemId: [ebayItem.id] }));
      } else {
        const { data = null } = await api.getEbayItems(platform, game, sortOrder);

        if (data && data[0]) {
          const { item: ebayitems = [] } = data[0];
          items = ebayitems;
        }
      }
    } catch (err) {
      dispatch(showErrModal({ message: 'Cannot fetch ebay cards! Try again later' }));
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
  return async (dispatch, getStore) => {
    const itemId = selectEbayCardItemId(getStore(), {
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

    try {
      const {
        data: { ShippingCostSummary },
      } = await api.getShippingCosts(itemId);

      const { Value: value } = ShippingCostSummary?.ShippingServiceCost || {};
      const costinNumber = Number(value);

      if (costinNumber) {
        dispatch(setEbayItemShippingCost(game, platform, sortOrder, index, costinNumber));
      } else {
        dispatch(setEbayItemShippingCost(game, platform, sortOrder, index, null));
        dispatch(setContactSeller(game, platform, sortOrder, index, true));
      }
    } catch (error) {
    } finally {
      dispatch(setEbayItemShippingLoading(game, platform, sortOrder, index, false));
    }
  };
};

export const checkIfCardIsWatched = (
  game: string,
  platform: TPlatformNames,
  index: number,
  sortOrder = DEFAULT_SORT_ORDER
): TThunk => {
  return async (dispatch, getStore) => {
    const itemId = selectEbayCardItemId(getStore(), {
      game,
      index,
      platform,
      sortOrder,
    });

    if (!itemId) return;

    try {
      const { data: { success } = { success: null } } = await api.isWatchedEbayCard({
        ebayItemId: itemId,
        game,
        platform,
      });
      if (success) {
        dispatch(setIsWatchedEbayCard(game, platform, sortOrder, index, true));
      }
    } catch (error) {
      dispatch(setIsWatchedEbayCard(game, platform, sortOrder, index, false));
    }
  };
};

export const notWatchEbayCard = (
  game: string,
  platform: TPlatformNames,
  ebayItemId: number,
  index: number,
  sortOrder = DEFAULT_SORT_ORDER
): TThunk => {
  return async (dispatch) => {
    dispatch(setIsWatchedEbayCard(game, platform, sortOrder, index, false));

    try {
      await api.notWatchEbayCard({
        ebayItemId,
        game,
        platform,
      });
    } catch (error) {
      batch(() => {
        dispatch(setIsWatchedEbayCard(game, platform, sortOrder, index, true));
        dispatch(
          showErrModal({
            message: appConfig.defaultApiErr,
          })
        );
      });
    }
  };
};

export const watchEbayCard = (
  game: string,
  platform: TPlatformNames,
  ebayItemId: number,
  index: number,
  sortOrder = DEFAULT_SORT_ORDER
): TThunk => {
  return async (dispatch) => {
    dispatch(setIsWatchedEbayCard(game, platform, sortOrder, index, true));

    try {
      await api.watchEbayCard({
        ebayItemId,
        game,
        platform,
      });
    } catch (err) {
      if (isAxiosError<{ err_message: string; show_modal: boolean }>(err) && err.response?.data.show_modal) {
        dispatch(
          showInfoModal({
            btnTxtContent: 'got it',
            message: 'Add game to your WishList at first',
          })
        );
      } else {
        dispatch(
          showErrModal({
            message: 'Something wrong happened.Try again later',
          })
        );
      }
      dispatch(setIsWatchedEbayCard(game, platform, sortOrder, index, false));
    }
  };
};

const getEbaySingleItem = async (
  itemId: number,
  dispatch: ThunkDispatch<IRootState, unknown, Action<string>>
): Promise<IEbayCardItemData | null> => {
  try {
    const { data: { Item: item } = { Item: null } } = await api.getEbaySingleItem(itemId);

    if (!item) {
      return null;
    }

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
  } catch (err) {
    dispatch(showErrModal({ message: 'Something wrong happened.Try again later' }));
  }
  return null;
};
