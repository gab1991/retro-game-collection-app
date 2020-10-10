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
    const itemId = getCardItemId(getState(), {
      platform,
      game,
      sortOrder,
      index,
    });

    const itemData = await getEbaySingleItem(itemId, dispatch);

    if (!itemData) return;

    dispatch(setEbaySingleItemData(platform, game, index, itemData, sortOrder));
  };
};

const getEbaySingleItem = async (itemId, dispatch) => {
  const {
    data: { Item: item } = { Item: null },
  } = await Backend.getEbaySingleItem(itemId, () => {
    dispatch(
      showErrModal({ message: 'Something wrong happened.Try again later' })
    );
  });

  if (!item) return null;

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
    const {
      data: { success } = { success: null },
    } = await Backend.isWatchedEbayCard(
      {
        gameName,
        platform,
        ebayItemId: itemId,
      },
      () => {
        dispatch(
          setIsWatchedEbayCard(platform, gameName, sortOrder, index, false)
        );
      }
    );

    if (success) {
      dispatch(
        setIsWatchedEbayCard(platform, gameName, sortOrder, index, true)
      );
    } else {
      dispatch(
        setIsWatchedEbayCard(platform, gameName, sortOrder, index, false)
      );
    }
  };
};

const watchEbayCard = (gameName, platform, ebayItemId, index) => {
  return async (dispatch) => {
    dispatch(setIsWatchedEbayCard(platform, gameName, sortOrder, index, true));

    const errorCallback = (err) => {
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
    };

    const { status } = await Backend.watchEbayCard(
      {
        gameName,
        platform,
        ebayItemId,
      },
      errorCallback
    );

    if (status !== 200) {
      dispatch(
        setIsWatchedEbayCard(platform, gameName, sortOrder, index, false)
      );
    }
  };
};

const notWatchEbayCard = (gameName, platform, ebayItemId, index) => {
  return async (dispatch) => {
    dispatch(setIsWatchedEbayCard(platform, gameName, sortOrder, index, false));

    const errHandler = () => {
      dispatch(
        setIsWatchedEbayCard(platform, gameName, sortOrder, index, true)
      );
      dispatch(
        showErrModal({
          message: 'Something wrong happened.Try again later',
        })
      );
    };

    await Backend.notWatchEbayCard(
      {
        gameName,
        platform,
        ebayItemId,
      },
      errHandler
    );
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
    dispatch(
      setEbayItemShippingLoading(game, platform, sortOrder, index, true)
    );

    const { ShippingCostSummary } = await Backend.getShippingCosts(
      itemId,
      () => {
        dispatch(
          setEbayItemShippingLoading(game, platform, sortOrder, index, false)
        );
      }
    );
    const { Value: value } = ShippingCostSummary?.ShippingServiceCost || {};
    const costinNumber = Number(value);

    dispatch(
      setEbayItemShippingLoading(game, platform, sortOrder, index, false)
    );

    if (costinNumber) {
      dispatch(
        setEbayItemShippingCost(game, platform, sortOrder, index, costinNumber)
      );
    } else {
      dispatch(setEbayItemShippingCost(game, platform, sortOrder, index, null));
      dispatch(setContactSeller(game, platform, sortOrder, index, true));
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
  return async (dispatch, getState) => {
    const { ebayItems } = getState();

    //check if these ebay cards are already in reducer
    if (ebayItems?.[platform]?.[game]?.[sortOrder]) return;
    let items = [];

    const errHandler = () => {
      dispatch(
        showErrModal({ message: 'Cannot fetch ebay cards! Try again later' })
      );
    };

    if (sortOrder === 'Watched') {
      const {
        data: ebayItems = { ebayItems: [] },
      } = await Backend.getGameWatchedCards(platform, game, errHandler);

      items = ebayItems.map((ebayItem) => ({ itemId: [ebayItem.id] }));
    } else {
      const { data = null } = await Backend.getEbayItems(
        platform,
        game,
        sortOrder,
        errHandler
      );

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
