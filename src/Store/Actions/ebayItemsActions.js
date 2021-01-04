import { Backend } from 'Backend';

import { appConfig } from '../../Configs/appConfig';
import { showErrModal, showInfoModal } from '../appStateReducer/actions';

const DEFAULT_SORT_ORDER = appConfig.EbayCards.defaultSortOrder;

const SET_EBAY_ITEMS = 'SET_EBAY_ITEMS';
const SET_EBAY_SINGLE_ITEM_DATA = 'SET_EBAY_SINGLE_ITEM_DATA';
const SET_IS_WATCHED_EBAY_CARD = 'SET_IS_WATCHED_EBAY_CARD';
const SET_EBAY_ITEM_SHIPPING_COST = 'SET_EBAY_ITEM_SHIPPING_COST';
const SET_EBAY_ITEM_SHIPPING_COST_LOADING = 'SET_EBAY_ITEM_SHIPPING_COST_LOADING';
const SET_EBAY_ITEM_SHIPPING_CONTACT_SELLER = 'SET_EBAY_ITEM_SHIPPING_CONTACT_SELLER';
const CALCULATE_TOTAL_PRICE = 'CALCULATE_TOTAL_PRICE';

// const getCardItemId = (store, { platform, game, sortOrder, index }) => {
//   if (!store || !platform || !game || !sortOrder) return null;
//   const { ebayItems } = store;
//   const { itemId: itemIdArr = { itemId: null } } = ebayItems?.[platform]?.[game]?.[sortOrder]?.[index];
//   if (!itemIdArr || !itemIdArr[0]) return null;
//   return itemIdArr[0];
// };

// const setEbayItems = (items, platform, game, sortOrder) => {
//   return {
//     payload: { game, items, platform, sortOrder },
//     type: SET_EBAY_ITEMS,
//   };
// };

// const setEbaySingleItemData = (platform, game, index, itemData, sortOrder) => {
//   return {
//     payload: { game, index, itemData, platform, sortOrder },
//     type: SET_EBAY_SINGLE_ITEM_DATA,
//   };
// };

// const getEbaySingleItemByIndex = (platform, game, index, sortOrder = DEFAULT_SORT_ORDER) => {
//   return async (dispatch, getState) => {
//     const itemId = getCardItemId(getState(), {
//       game,
//       index,
//       platform,
//       sortOrder,
//     });

//     const itemData = await getEbaySingleItem(itemId, dispatch);

//     if (!itemData) return;

//     dispatch(setEbaySingleItemData(platform, game, index, itemData, sortOrder));
//   };
// };

// const getEbaySingleItem = async (itemId, dispatch) => {
//   const { data: { Item: item } = { Item: null } } = await Backend.getEbaySingleItem(itemId, () => {
//     dispatch(showErrModal({ message: 'Something wrong happened.Try again later' }));
//   });

//   if (!item) return null;

//   return {
//     bidCount: item?.BidCount,
//     convertedCurrentPrice: item?.ConvertedCurrentPrice,
//     currency: item?.ConvertedCurrentPrice.CurrencyID,
//     currentPrice: Number(item?.ConvertedCurrentPrice.Value).toFixed(2),
//     deliveryPrice: item?.ShippingServiceCost ? item?.ShippingServiceCost.Value : '',
//     endTime: item?.EndTime,
//     itemId: itemId,
//     itemUrl: item?.ViewItemURLForNaturalSearch,
//     listingType: item?.ListingType,
//     pictures: item?.PictureURL,
//     shipping: item?.ShippingCostSummary,
//     title: item?.Title,
//   };
// };

// const setIsWatchedEbayCard = (platform, game, sortOrder, index, bool) => {
//   return {
//     payload: { bool, game, index, platform, sortOrder },
//     type: SET_IS_WATCHED_EBAY_CARD,
//   };
// };

const checkIfCardIsWatched = (gameName, platform, index, sortOrder = DEFAULT_SORT_ORDER) => {
  return async (dispatch, getState) => {
    const itemId = getCardItemId(getState(), {
      game: gameName,
      index,
      platform,
      sortOrder,
    });
    const { data: { success } = { success: null } } = await Backend.isWatchedEbayCard(
      {
        ebayItemId: itemId,
        gameName,
        platform,
      },
      () => {
        dispatch(setIsWatchedEbayCard(platform, gameName, sortOrder, index, false));
      }
    );

    if (success) {
      dispatch(setIsWatchedEbayCard(platform, gameName, sortOrder, index, true));
    } else {
      dispatch(setIsWatchedEbayCard(platform, gameName, sortOrder, index, false));
    }
  };
};

const watchEbayCard = (gameName, platform, ebayItemId, index, sortOrder = DEFAULT_SORT_ORDER) => {
  return async (dispatch) => {
    dispatch(setIsWatchedEbayCard(platform, gameName, sortOrder, index, true));

    const errorCallback = (err) => {
      if (err?.response?.data?.show_modal) {
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
      dispatch(setIsWatchedEbayCard(platform, gameName, sortOrder, index, false));
    };

    const { status } = await Backend.watchEbayCard(
      {
        ebayItemId,
        gameName,
        platform,
      },
      errorCallback
    );

    if (status !== 200) {
      dispatch(setIsWatchedEbayCard(platform, gameName, sortOrder, index, false));
    }
  };
};

const notWatchEbayCard = (gameName, platform, ebayItemId, index, sortOrder = DEFAULT_SORT_ORDER) => {
  return async (dispatch) => {
    dispatch(setIsWatchedEbayCard(platform, gameName, sortOrder, index, false));

    const errHandler = () => {
      dispatch(setIsWatchedEbayCard(platform, gameName, sortOrder, index, true));
      dispatch(
        showErrModal({
          message: 'Something wrong happened.Try again later',
        })
      );
    };

    await Backend.notWatchEbayCard(
      {
        ebayItemId,
        gameName,
        platform,
      },
      errHandler
    );
  };
};

// const setEbayItemShippingCost = (game, platform, sortOrder, index, value) => {
//   return {
//     payload: {
//       game,
//       index,
//       platform,
//       sortOrder,
//       value,
//     },
//     type: SET_EBAY_ITEM_SHIPPING_COST,
//   };
// };

// const setEbayItemShippingLoading = (game, platform, sortOrder, index, bool) => {
//   return {
//     payload: {
//       bool,
//       game,
//       index,
//       platform,
//       sortOrder,
//     },
//     type: SET_EBAY_ITEM_SHIPPING_COST_LOADING,
//   };
// };

// const setContactSeller = (game, platform, sortOrder, index, bool) => {
//   return {
//     payload: {
//       bool,
//       game,
//       index,
//       platform,
//       sortOrder,
//     },
//     type: SET_EBAY_ITEM_SHIPPING_CONTACT_SELLER,
//   };
// };

// const getShippingCosts = (game, platform, itemId, index, sortOrder = DEFAULT_SORT_ORDER) => {
//   return async (dispatch) => {
//     dispatch(setEbayItemShippingLoading(game, platform, sortOrder, index, true));

//     const { ShippingCostSummary } = await Backend.getShippingCosts(itemId, () => {
//       dispatch(setEbayItemShippingLoading(game, platform, sortOrder, index, false));
//     });
//     const { Value: value } = ShippingCostSummary?.ShippingServiceCost || {};
//     const costinNumber = Number(value);

//     dispatch(setEbayItemShippingLoading(game, platform, sortOrder, index, false));

//     if (costinNumber) {
//       dispatch(setEbayItemShippingCost(game, platform, sortOrder, index, costinNumber));
//     } else {
//       dispatch(setEbayItemShippingCost(game, platform, sortOrder, index, null));
//       dispatch(setContactSeller(game, platform, sortOrder, index, true));
//     }
//   };
// };

// const calculateTotalPrice = (platform, game, index, sortOrder) => {
//   return {
//     payload: { game, index, platform, sortOrder },
//     type: CALCULATE_TOTAL_PRICE,
//   };
// };

// const getEbayItems = (platform, game, sortOrder = DEFAULT_SORT_ORDER) => {
//   return async (dispatch, getState) => {
//     const { ebayItems } = getState();

//     //check if these ebay cards are already in reducer
//     if (ebayItems?.[platform]?.[game]?.[sortOrder]) return;
//     let items = [];

//     const errHandler = () => {
//       dispatch(showErrModal({ message: 'Cannot fetch ebay cards! Try again later' }));
//     };

//     if (sortOrder === 'Watched') {
//       const { data: ebayItems = { ebayItems: [] } } = await Backend.getGameWatchedCards(platform, game, errHandler);

//       items = ebayItems.map((ebayItem) => ({ itemId: [ebayItem.id] }));
//     } else {
//       const { data = null } = await Backend.getEbayItems(platform, game, sortOrder, errHandler);

//       if (data && data[0]) {
//         const { item: ebayitems = [] } = data[0];
//         items = ebayitems;
//       }
//     }

//     if (items.length) {
//       dispatch(setEbayItems(items, platform, game, sortOrder));
//     }
//   };
// };

export {
  // calculateTotalPrice,
  checkIfCardIsWatched,
  // getEbayItems,
  // getEbaySingleItem,
  // getEbaySingleItemByIndex,
  // getShippingCosts,
  notWatchEbayCard,
  // setEbayItems,
  watchEbayCard,
};

export {
  CALCULATE_TOTAL_PRICE,
  DEFAULT_SORT_ORDER,
  SET_EBAY_ITEM_SHIPPING_CONTACT_SELLER,
  SET_EBAY_ITEM_SHIPPING_COST,
  SET_EBAY_ITEM_SHIPPING_COST_LOADING,
  SET_EBAY_ITEMS,
  SET_EBAY_SINGLE_ITEM_DATA,
  SET_IS_WATCHED_EBAY_CARD,
};
