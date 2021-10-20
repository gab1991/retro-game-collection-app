import { batch } from 'react-redux';
import { ebayApi, isAxiosError, profileApi } from 'Api';

import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { EEbaySortOrder } from 'Api/types';
import { IRootState, TThunk } from 'Store/types';

import { appConfig, TPlatformNames } from 'Configs/appConfig';
import { setEbaySectionLoading } from 'Routes/GameDetailed/reducer/actions';
import { showErrModal, showInfoModal } from 'Store/appStateReducer/actions';
import { IEbayCardItemData, TEbayCardPreviewRawData } from 'Typings/ebayData';

import {
  setContactSeller,
  setEbayItems,
  setEbayItemShippingCost,
  setEbayItemShippingLoading,
  setEbaySingleItemData,
  setIsWatchedEbayCard,
} from './actions';
import { selectAllEbayCardItems, selectEbayCardItemId } from './selectors';

const DEFAULT_SORT_ORDER = appConfig.EbayCards.defaultSortOrder;

export const getEbayItemsThunk = (platform: TPlatformNames, game: string, sortOrder = DEFAULT_SORT_ORDER): TThunk => {
  return async (dispatch, getStore) => {
    const store = getStore();
    const ebayItems = selectAllEbayCardItems(store);

    //check if these ebay cards are already in reducer
    if (ebayItems?.[platform]?.[game]?.[sortOrder]) {
      return;
    }
    let items: Array<TEbayCardPreviewRawData> = [];

    try {
      if (sortOrder === EEbaySortOrder.Watched) {
        const {
          data: { payload: ebayItems = [] },
        } = await profileApi.getGameWatchedCards(platform, game);
        items = ebayItems.map((ebayItem) => ({ itemId: [ebayItem.id] }));
      } else {
        const { data = null } = await ebayApi.getEbayItems(platform, game, sortOrder);
        if (data && data[0]) {
          const { item: ebayitems = [] } = data[0];
          items = ebayitems;
        }
      }
    } catch (err) {
      dispatch(showErrModal({ message: 'Cannot fetch ebay cards! Try again later' }));
    }

    batch(() => {
      dispatch(setEbaySectionLoading(false));
      dispatch(setEbayItems(items, platform, game, sortOrder));
    });
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
        data: { payload },
      } = await ebayApi.getShippingCosts(itemId);

      if (!payload) {
        throw new Error('no payload');
      }

      const { Value: value } = payload.ShippingCostSummary.ShippingServiceCost || {};
      const costinNumber = Number(value);

      if (costinNumber) {
        dispatch(setEbayItemShippingCost(game, platform, sortOrder, index, costinNumber));
      } else {
        dispatch(setEbayItemShippingCost(game, platform, sortOrder, index, null));
        dispatch(setContactSeller(game, platform, sortOrder, index, true));
      }
    } catch (error) {
      dispatch(setEbayItemShippingCost(game, platform, sortOrder, index, null));
      dispatch(setContactSeller(game, platform, sortOrder, index, true));
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
    const store = getStore();
    const itemId = selectEbayCardItemId(store, {
      game,
      index,
      platform,
      sortOrder,
    });

    if (!itemId) return;

    try {
      const {
        data: { payload },
      } = await profileApi.isWatchedEbayCard({
        ebayItemId: itemId,
        game,
        platform,
      });
      if (payload && payload.inList) {
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
      await profileApi.notWatchEbayCard({
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
      await profileApi.watchEbayCard({
        ebayItemId,
        game,
        platform,
      });
    } catch (err) {
      if (
        isAxiosError<{ additionals: { showModal: boolean }; err_message: string }>(err) &&
        err.response?.data?.additionals?.showModal
      ) {
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
    const {
      data: { payload },
    } = await ebayApi.getEbaySingleItem(itemId);

    if (!payload) {
      return null;
    }

    return {
      bidCount: payload.BidCount,
      convertedCurrentPrice: payload.ConvertedCurrentPrice,
      currency: payload.ConvertedCurrentPrice.CurrencyID,
      currentPrice: Number(payload.ConvertedCurrentPrice.Value.toFixed(2)),
      deliveryPrice: Number(payload.ShippingServiceCost ? payload.ShippingServiceCost.Value : '') || 0,
      endTime: payload.EndTime,
      itemId: itemId,
      itemUrl: payload.ViewItemURLForNaturalSearch,
      listingType: payload.ListingType,
      pictures: payload.PictureURL,
      shipping: payload.ShippingCostSummary,
      title: payload.Title,
    };
  } catch (err) {
    dispatch(showErrModal({ message: 'Something wrong happened.Try again later' }));
  }
  return null;
};
