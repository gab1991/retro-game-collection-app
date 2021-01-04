export type TEbayCard = {
  itemData: IEbayCardItemData;
  //refactor
  itemId: Array<string>;
};

export interface IEbayCardItemData {
  bidCount: number;
  convertedCurrentPrice: IEbayCardCurValue;
  currency: string;
  currentPrice: number;
  deliveryPrice: number;
  endTime: string;
  itemId: number;
  itemUrl: string;
  listingType: string;
  pictures: Array<string>;
  shipping: Pick<IEbayCardRawData, 'ShippingServiceCost'>;
  title: string;
}

export interface IEbayCardRawData {
  BidCount: number;
  ConvertedCurrentPrice: IEbayCardCurValue;
  EndTime: string;
  ListingType: string;
  PictureURL: Array<string>;
  ShippingCostSummary: {
    ListedShippingServiceCost: IEbayCardCurValue;
    ShippingServiceCost: IEbayCardCurValue;
    ShippingType: string;
  };
  ShippingServiceCost?: IEbayCardCurValue;
  Title: string;
  ViewItemURLForNaturalSearch: string;
}

interface IEbayCardCurValue {
  CurrencyID: string;
  Value: number;
}

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
    convertedCurrentPrice: Array<IEbayDataPrevCurrencyValue>;
    currentPrice: Array<IEbayDataPrevCurrencyValue>;
    sellingState: Array<string>;
    timeLeft: Array<string>;
  }>;
  shippingInfo: Array<{ shippingServiceCost: Array<IEbayDataPrevCurrencyValue> }>;
  title: Array<string>;
  topRatedListing: Array<string>;
  viewItemURL: Array<string>;
};

interface IEbayDataPrevCurrencyValue {
  '@currencyId': string;
  __value__: string;
}
