import Backend from '../../Backend/Backend';
import { showInfoModal, showErrModal } from '../Actions/modalActions';

const sortOrder = 'BestMatch';

const getCardItemId = (store, { platform, game, sortOrder, index }) => {
  if (!store || !platform || !game || !sortOrder) return null;
  const { ebayItems } = store;
  const { itemId: itemIdArr } = ebayItems?.[platform]?.[game]?.[sortOrder]?.[
    index
  ];
  return itemIdArr[0];
};

const setEbayItems = (items, platform, game, sortOrder) => {
  return {
    type: 'SET_EBAY_ITEMS',
    payload: { items, platform, game, sortOrder },
  };
};

const setEbaySingleItemData = (platform, game, index, itemData, sortOrder) => {
  return {
    type: 'SET_EBAY_SINGLE_ITEM_DATA',
    payload: { platform, game, index, itemData, sortOrder },
  };
};

const getEbaySingleItemByIndex = (
  platform,
  game,
  index,
  sortOrder = 'BestMatch'
) => {
  return async (dispatch, getState) => {
    try {
      const itemId = getCardItemId(getState(), {
        platform,
        game,
        sortOrder,
        index,
      });

      const itemData = await getEbaySingleItem(itemId);

      dispatch(
        setEbaySingleItemData(platform, game, index, itemData, sortOrder)
      );
    } catch (err) {
      dispatch(
        showErrModal({
          message: 'Something wrong happened.Try again later',
        })
      );
    }
  };
};

const getEbaySingleItemByItemId = (itemId) => {
  return async (dispatch) => {
    try {
      const itemData = await getEbaySingleItem(itemId);

      // dispatch(setEbaySingleItemData(index, itemData));
    } catch (err) {
      dispatch(
        showErrModal({
          message: 'Something wrong happened.Try again later',
        })
      );
    }
  };
};

const getEbaySingleItem = async (itemId) => {
  try {
    const { Item: item } = await Backend.getEbaySingleItem(itemId);

    return {
      pictures: item?.PictureURL,
      title: item?.Title,
      convertedCurrentPrice: item?.ConvertedCurrentPrice,
      currentPrice: Number(item?.ConvertedCurrentPrice.Value).toFixed(2),
      currency: item?.ConvertedCurrentPrice.CurrencyID,
      shipping: item?.ShippingCostSummary,
      deliveryPrice: item?.ShippingServiceCost
        ? item?.ShippingServiceCost.Value
        : '',
      listingType: item?.ListingType,
      itemUrl: item?.ViewItemURLForNaturalSearch,
      bidCount: item?.BidCount,
      endTime: item?.EndTime,
      itemId: itemId,
    };
  } catch (err) {
    //error handling
  }
};

const setIsWatchedEbayCard = (platform, game, sortOrder, index, bool) => {
  return {
    type: 'SET_IS_WATCHED_EBAY_CARD',
    payload: { platform, game, sortOrder, index, bool },
  };
};

const checkIfCardIsWatched = (
  gameName,
  platform,
  index,
  sortOrder = 'BestMatch'
) => {
  return async (dispatch, getState) => {
    const itemId = getCardItemId(getState(), {
      platform,
      game: gameName,
      sortOrder,
      index,
    });
    try {
      const {
        data: { success },
      } = await Backend.isWatchedEbayCard({
        gameName,
        platform,
        ebayItemId: itemId,
      });
      if (success) {
        dispatch(
          setIsWatchedEbayCard(platform, gameName, sortOrder, index, true)
        );
      } else {
        dispatch(
          setIsWatchedEbayCard(platform, gameName, sortOrder, index, false)
        );
      }
    } catch (err) {
      dispatch(
        setIsWatchedEbayCard(platform, gameName, sortOrder, index, false)
      );
    }
  };
};

const watchEbayCard = (gameName, platform, ebayItemId, index) => {
  return async (dispatch) => {
    try {
      dispatch(
        setIsWatchedEbayCard(platform, gameName, sortOrder, index, true)
      );

      const { status } = await Backend.watchEbayCard({
        gameName,
        platform,
        ebayItemId,
      });

      if (status !== 200) {
        dispatch(
          setIsWatchedEbayCard(platform, gameName, sortOrder, index, false)
        );
      }
    } catch (err) {
      if (err?.response?.data?.show_modal) {
        dispatch(
          showInfoModal({
            message: 'Add game to your WishList at first',
            btnTxtContent: 'got it',
          })
        );
      } else {
        dispatch(
          showErrModal({
            message: 'Something wrong happened.Try again later',
          })
        );
      }
      dispatch(
        setIsWatchedEbayCard(platform, gameName, sortOrder, index, false)
      );
    }
  };
};

const notWatchEbayCard = (gameName, platform, ebayItemId, index) => {
  return async (dispatch) => {
    try {
      dispatch(
        setIsWatchedEbayCard(platform, gameName, sortOrder, index, false)
      );

      const res = await Backend.notWatchEbayCard({
        gameName,
        platform,
        ebayItemId,
      });
    } catch (err) {
      dispatch(
        setIsWatchedEbayCard(platform, gameName, sortOrder, index, true)
      );
      dispatch(
        showErrModal({
          message: 'Something wrong happened.Try again later',
        })
      );
    }
  };
};

const setEbayItemShippingCost = (game, platform, sortOrder, index, value) => {
  return {
    type: 'SET_EBAY_ITEM_SHIPPING_COST',
    payload: {
      game,
      platform,
      sortOrder,
      index,
      value,
    },
  };
};

const setEbayItemShippingLoading = (game, platform, sortOrder, index, bool) => {
  return {
    type: 'SET_EBAY_ITEM_SHIPPING_COST_LOADING',
    payload: {
      game,
      platform,
      sortOrder,
      index,
      bool,
    },
  };
};

const setContactSeller = (game, platform, sortOrder, index, bool) => {
  return {
    type: 'SET_EBAY_ITEM_SHIPPING_CONTACT_SELLER',
    payload: {
      game,
      platform,
      sortOrder,
      index,
      bool,
    },
  };
};

const getShippingCosts = (
  game,
  platform,
  itemId,
  index,
  sortOrder = 'BestMatch'
) => {
  return async (dispatch) => {
    try {
      dispatch(
        setEbayItemShippingLoading(game, platform, sortOrder, index, true)
      );

      const { ShippingCostSummary } = await Backend.getShippingCosts(itemId);
      const { Value: value } = ShippingCostSummary?.ShippingServiceCost || {};
      const costinNumber = Number(value);

      dispatch(
        setEbayItemShippingLoading(game, platform, sortOrder, index, false)
      );

      if (costinNumber) {
        dispatch(
          setEbayItemShippingCost(
            game,
            platform,
            sortOrder,
            index,
            costinNumber
          )
        );
      } else {
        dispatch(
          setEbayItemShippingCost(game, platform, sortOrder, index, null)
        );
        dispatch(setContactSeller(game, platform, sortOrder, index, true));
      }
    } catch (err) {
      dispatch(
        setEbayItemShippingLoading(game, platform, sortOrder, index, false)
      );
      dispatch(
        showErrModal({
          message: 'Something wrong happened.Try again later',
        })
      );
    }
  };
};

const calculateTotalPrice = (platform, game, index, sortOrder) => {
  return {
    type: 'CALCULATE_TOTAL_PRICE',
    payload: { platform, game, index, sortOrder },
  };
};

const getEbayItems = (platform, game, sortOrder) => {
  return async (dispatch) => {
    try {
      if (sortOrder === 'Watched') {
        await Backend.getGameWatchedCards();
      }
      const [res] = await Backend.getEbayItems(platform, game, sortOrder);
      const { item: items } = res;

      dispatch(setEbayItems(items, platform, game, sortOrder));
    } catch (err) {
      //error handling
    }
  };
};

export {
  setEbayItems,
  getEbaySingleItem,
  getEbaySingleItemByIndex,
  checkIfCardIsWatched,
  watchEbayCard,
  notWatchEbayCard,
  getShippingCosts,
  calculateTotalPrice,
  getEbayItems,
};
