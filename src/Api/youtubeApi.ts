import { Api, TApiResponse } from 'Api';

import { TPlatformNames, TVideoType } from 'Configs/appConfig';

import { endpoints } from './config';

class YoutubeApi extends Api {
  constructor() {
    super();
  }

  getVideo(videoType: TVideoType, platform: TPlatformNames, game: string): TApiResponse<string> {
    return this.executeReq({
      method: 'GET',
      url: `${endpoints.youtube}/${videoType}/${platform}/${game}`,
    });
  }
}

export const youtubeApi = new YoutubeApi();
