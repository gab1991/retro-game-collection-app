export type TEbayCard = {
  itemData: TEbayCardItemData;
};

export type TEbayCardItemData = {
  itemId: number;
  itemUrl: string;
  pictures: Array<string>;
};

export type TEbayCardPreviewRawData = {
  autoPay: Array<string>;
  condition: Array<Array<string>>;
  country: Array<string>;
  galleryURL: Array<string>;
  globalId: Array<string>;
  isMultiVariationListing: Array<string>;
  itemId: Array<string>;
  listingInfo: Array<Array<string>>;
  location: Array<string>;
  postalCode: Array<string>;
  primaryCategory: Array<Array<string>>;
  productId: Array<{ '@type': string; __value__: string }>;
  returnsAccepted: Array<string>;
  sellingStatus: Array<{
    convertedCurrentPrice: Array<IEbayDataCurrencyValue>;
    currentPrice: Array<IEbayDataCurrencyValue>;
    sellingState: Array<string>;
    timeLeft: Array<string>;
  }>;
  shippingInfo: Array<{ shippingServiceCost: Array<IEbayDataCurrencyValue> }>;
  title: Array<string>;
  topRatedListing: Array<string>;
  viewItemURL: Array<string>;
};

interface IEbayDataCurrencyValue {
  '@currencyId': string;
  __value__: string;
}
