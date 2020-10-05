const ebayItemsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case 'SET_EBAY_ITEMS':
      return [...payload];
    case 'SET_EBAY_SINGLE_ITEM_DATA': {
      const { index, itemData } = payload;
      const newEbayItems = [...state];
      const isAuction =
        itemData?.listingType !== 'FixedPriceItem' ? true : false;

      const shippingCost = itemData?.deliveryPrice || null;

      newEbayItems[index] = {
        ...newEbayItems[index],
        itemData,
        isAuction,
        shippingCost,
      };
      return [...newEbayItems];
    }
    case 'SET_IS_WATCHED_EBAY_CARD': {
      const { index, bool } = payload;
      const newEbayItems = [...state];
      newEbayItems[index] = { ...newEbayItems[index], isWatched: bool };
      return [...newEbayItems];
    }
    case 'SET_EBAY_ITEM_SHIPPING_COST': {
      const { index, value } = payload;
      const newEbayItems = [...state];
      newEbayItems[index] = {
        ...newEbayItems[index],
        shippingCost: value ? value.toFixed(2) : null,
      };
      return [...newEbayItems];
    }
    case 'SET_EBAY_ITEM_SHIPPING_COST_LOADING': {
      const { index, bool } = payload;
      const newEbayItems = [...state];
      newEbayItems[index] = {
        ...newEbayItems[index],
        isLoadingShippingCosts: bool,
      };
      return [...newEbayItems];
    }

    case 'CALCULATE_TOTAL_PRICE': {
      const index = payload;
      const newEbayItems = [...state];
      const {
        shippingCost,
        itemData: { currentPrice },
      } = newEbayItems[index];
      const totalPrice = (Number(shippingCost) + Number(currentPrice)).toFixed(
        2
      );
      newEbayItems[index] = {
        ...newEbayItems[index],
        totalPrice,
      };
      return [...newEbayItems];
    }
    case 'SET_EBAY_ITEM_SHIPPING_CONTACT_SELLER': {
      const { index, bool } = payload;
      const newEbayItems = [...state];
      newEbayItems[index] = { ...newEbayItems[index], contactSeller: bool };

      return [...newEbayItems];
    }
    case 'SET_EBAY_LOT_ENDING_SOON': {
      // const { hours, minutes, seconds, index } = payload;
      // const newEbayItems = [...state];
      // newEbayItems[index] = {
      //   ...newEbayItems[index],
      //   endingSoon: { hours, minutes, seconds },
      // };
      // // console.log(newEbayItems[index]);s
      // return [...newEbayItems];
    }
    default:
      return state;
  }
};

export default ebayItemsReducer;
