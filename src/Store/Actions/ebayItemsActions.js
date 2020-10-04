import Backend from '../../Backend/Backend';
import { showInfoModal, showErrModal } from '../Actions/modalActions';

const setEbayItems = (items) => {
  return {
    type: 'SET_EBAY_ITEMS',
    payload: items,
  };
};

const setEbaySingleItemData = (index, itemData) => {
  return {
    type: 'SET_EBAY_SINGLE_ITEM_DATA',
    payload: { index, itemData },
  };
};

const getEbaySingleItem = (index) => {
  return async (dispatch, getState) => {
    const { ebayItems } = getState();
    const { itemId: itemIdArr } = ebayItems[index];
    const [itemId] = itemIdArr;

    try {
      const { Item: item } = await Backend.getEbaySingleItem(itemId);

      const itemData = {
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

      dispatch(setEbaySingleItemData(index, itemData));
    } catch (err) {
      //error handling
    }

    console.log(itemId);
  };
};

const setIsWatchedEbayCard = (index, bool) => {
  return {
    type: 'SET_IS_WATCHED_EBAY_CARD',
    payload: { index, bool },
  };
};

const checkIfCardIsWatched = (gameName, platform, index) => {
  return async (dispatch, getState) => {
    const { ebayItems } = getState();
    const { itemId: itemIdArr } = ebayItems[index];
    const [itemId] = itemIdArr;

    try {
      const {
        data: { success },
      } = await Backend.isWatchedEbayCard({
        gameName,
        platform,
        ebayItemId: itemId,
      });
      if (success) {
        dispatch(setIsWatchedEbayCard(index, true));
      } else {
        dispatch(setIsWatchedEbayCard(index, false));
      }
    } catch (err) {
      dispatch(setIsWatchedEbayCard(index, false));
    }
  };
};

const watchEbayCard = (gameName, platform, ebayItemId, index) => {
  return async (dispatch) => {
    try {
      dispatch(setIsWatchedEbayCard(index, true));

      const { status } = await Backend.watchEbayCard({
        gameName,
        platform,
        ebayItemId,
      });

      console.log(status);

      if (status !== 200) {
        dispatch(setIsWatchedEbayCard(index, false));
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
      dispatch(setIsWatchedEbayCard(index, false));
    }
  };
};

const notWatchEbayCard = (gameName, platform, ebayItemId, index) => {
  return async (dispatch) => {
    try {
      dispatch(setIsWatchedEbayCard(index, false));

      const res = await Backend.notWatchEbayCard({
        gameName,
        platform,
        ebayItemId,
      });
      console.log(res);
    } catch (err) {
      dispatch(setIsWatchedEbayCard(index, true));
      dispatch(
        showErrModal({
          message: 'Something wrong happened.Try again later',
        })
      );
    }
  };
};

const setEbayItemShippingCost = (index, value) => {
  return {
    type: 'SET_EBAY_ITEM_SHIPPING_COST',
    payload: {
      index,
      value,
    },
  };
};

const setEbayItemShippingLoading = (index, bool) => {
  return {
    type: 'SET_EBAY_ITEM_SHIPPING_COST_LOADING',
    payload: {
      index,
      bool,
    },
  };
};

const setContactSeller = (index, bool) => {
  return {
    type: 'SET_EBAY_ITEM_SHIPPING_CONTACT_SELLER',
    payload: {
      index,
      bool,
    },
  };
};

const getShippingCosts = (itemId, index) => {
  return async (dispatch) => {
    try {
      dispatch(setEbayItemShippingLoading(index, true));

      const { ShippingCostSummary } = await Backend.getShippingCosts(itemId);
      const { Value: value } = ShippingCostSummary?.ShippingServiceCost || {};
      const costinNumber = Number(value);

      dispatch(setEbayItemShippingLoading(index, false));

      if (costinNumber) {
        dispatch(setEbayItemShippingCost(index, costinNumber));
      } else {
        dispatch(setEbayItemShippingCost(index, null));
        dispatch(setContactSeller(index, true));
      }
    } catch (err) {
      dispatch(setEbayItemShippingLoading(index, false));
      dispatch(
        showErrModal({
          message: 'Something wrong happened.Try again later',
        })
      );
    }
  };
};

const calculateTotalPrice = (index) => {
  return {
    type: 'CALCULATE_TOTAL_PRICE',
    payload: index,
  };
};

export {
  setEbayItems,
  getEbaySingleItem,
  checkIfCardIsWatched,
  watchEbayCard,
  notWatchEbayCard,
  getShippingCosts,
  calculateTotalPrice,
};
