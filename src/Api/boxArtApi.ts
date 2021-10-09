import { Api, TApiResponse } from 'Api';

import { TPlatformNames } from 'Configs/appConfig';

import { endpoints } from './config';

class BoxArtApi extends Api {
  constructor() {
    super();
  }

  getBoxArt(platform: TPlatformNames, slug: string): TApiResponse<string> {
    return this.executeReq({
      method: 'GET',
      url: `${endpoints.boxArts}/${platform}/${slug}`,
    });
  }
}

export const boxArtApi = new BoxArtApi();
