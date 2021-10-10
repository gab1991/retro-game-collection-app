import { Api, IGetGamesForPlatParams, TApiResponse } from 'Api';
import { queryParamBuilder } from 'Utils';

import { IRawgGame, IRawgGameDetails, IRawgScreenshot } from 'Typings/rawgData';

import { endpoints } from './config';

class RawgApi extends Api {
  constructor() {
    super();
  }

  getGameDetails(slug: string): TApiResponse<IRawgGameDetails> {
    return this.executeReq({
      method: 'GET',
      url: `${endpoints.rawg.getDetailsUrl}/${slug}`,
    });
  }

  getGamesForPlatform(params: IGetGamesForPlatParams): TApiResponse<{ count: number; results: IRawgGame[] }> {
    const paramsStr = queryParamBuilder({ ...params });
    const url = `${endpoints.rawg.gamesForPlatformUrl}${paramsStr}`;
    return this.executeReq({
      method: 'GET',
      url,
    });
  }

  getScreenshots(slug: string): TApiResponse<{ results: Array<IRawgScreenshot> }> {
    return this.executeReq({
      method: 'GET',
      url: `${endpoints.rawg.getScreenshotsUrl}/${slug}`,
    });
  }
}

export const rawgApi = new RawgApi();
