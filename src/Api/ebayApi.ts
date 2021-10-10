import { Api, EEbaySortOrder, TApiResponse } from 'Api';

import { TPlatformNames } from 'Configs/appConfig';
import { IEbayCardRawData, IEbayCardShippingDetails, TEbayCardPreviewRawData } from 'Typings/ebayData';

import { endpoints } from './config';

class EbayApi extends Api {
  constructor() {
    super();
  }

  getEbayItems(
    platform: TPlatformNames,
    gameName: string,
    sortOrder: EEbaySortOrder
  ): TApiResponse<{ item: Array<Array<TEbayCardPreviewRawData>> }> {
    return this.executeReq({
      method: 'GET',
      url: `${endpoints.ebay.itemsUrl}/${platform}/${gameName}/${sortOrder}`,
    });
  }

  getEbaySingleItem(id: number): TApiResponse<IEbayCardRawData> {
    return this.executeReq({
      method: 'GET',
      url: `${endpoints.ebay.singleItemUrl}/${id}`,
    });
  }
  getShippingCosts(itemId: number): TApiResponse<IEbayCardShippingDetails> {
    return this.executeReq({
      method: 'GET',
      url: `${endpoints.ebay.singleItemUrl}/${itemId}/shopingCosts`,
    });
  }
}

export const ebayApi = new EbayApi();
