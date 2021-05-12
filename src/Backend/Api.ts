import axios_base, { AxiosError, AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

import { EEbaySortOrder, IApiMethods, IEbayCardObj, IGetGamesForPlatParams, ISignUpData, TUpdProfObj } from './types';
import { IProfile } from 'Routes/Profile/reducer/types';

import { TPlatformNames, TVideoType } from 'Configs/appConfig';
import { getToken } from 'Store/store';
import { IEbayCardRawData, IEbayCardShippingDetails, TEbayCardPreviewRawData } from 'Typings/EbayData';
import { IRawgGame, IRawgGameDetails, IRawgScreenshot } from 'Typings/RawgData';

import { endpoints } from './api_config';

const queryParamBuilder = (params: Record<string, string | number>) => {
  const result: Array<string> = [];
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      result.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    }
  }
  return `?${result.join('&')}`;
};

type TApiClient = AxiosInstance;
type TExecReqConfig = AxiosRequestConfig;
type TReqResult<T = any> = AxiosPromise<T>;

class Api {
  private readonly client: TApiClient;

  constructor(backendUrl: string) {
    this.client = axios_base.create({
      baseURL: backendUrl,
      timeout: 4000,
    });
  }

  async executeReq(config: TExecReqConfig = {}) {
    try {
      const res = await this.client(config);
      console.log('in api', res);
      //handling ebayApi specific errors
      const {
        data: { Ack: ebayApiError },
      } = res;

      if (ebayApiError === 'Failure') {
        throw res;
      }

      return res;
    } catch (err) {
      console.error('ERROR', err);
      throw err;
    }
  }

  checkCredentials(token: string, username: string): TReqResult<{ success: string }> {
    return this.executeReq({
      data: {
        username,
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: 'POST',
      url: endpoints.checkCredentialUrl,
    });
  }

  getBoxArt(platform: TPlatformNames, slug: string): TReqResult<string> {
    return this.executeReq({
      method: 'GET',
      url: `${endpoints.boxArtworkUrl}/${platform}/${encodeURIComponent(slug)}`,
    });
  }
  getEbayItems(
    platform: TPlatformNames,
    gameName: string,
    sortOrder: EEbaySortOrder
  ): TReqResult<{ item: Array<Array<TEbayCardPreviewRawData>> }> {
    return this.executeReq({
      method: 'GET',
      url: `${endpoints.ebayItemsUrl}/${platform}/${encodeURIComponent(gameName)}/${sortOrder}`,
    });
  }

  getEbaySingleItem(id: number): TReqResult<{ Item: IEbayCardRawData }> {
    return this.executeReq({
      method: 'GET',
      url: `${endpoints.ebaySingleItemUrl}/${id}`,
    });
  }

  getGameDetails(slug: string): TReqResult<IRawgGameDetails> {
    return this.executeReq({
      method: 'GET',
      url: `${endpoints.getDetailsUrl}/${slug}`,
    });
  }

  getGameWatchedCards(platform: TPlatformNames, game: string): TReqResult<Array<{ id: string }>> {
    return this.executeReq({
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      method: 'GET',
      url: `${endpoints.profileUrl}/getGameWatchedCards/${platform}/${game}`,
    });
  }

  getGamesForPlatform(params: IGetGamesForPlatParams): TReqResult<{ count: number; results: IRawgGame[] }> {
    const paramsStr = queryParamBuilder({ ...params });
    const url = `${endpoints.gamesForPlatformUrl}${paramsStr}`;
    return this.executeReq({
      method: 'GET',
      url,
    });
  }

  getProfileInfo(): TReqResult<IProfile> {
    return this.executeReq({
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      method: 'GET',
      url: endpoints.profileUrl,
    });
  }

  getScreenshots(slug: string): TReqResult<{ results: Array<IRawgScreenshot> }> {
    return this.executeReq({
      method: 'GET',
      url: `${endpoints.getScreenshotsUrl}/${slug}`,
    });
  }

  getShippingCosts(itemId: number): TReqResult<IEbayCardShippingDetails> {
    return this.executeReq({
      method: 'GET',
      url: `${endpoints.shippingCostsUrl}/${itemId}`,
    });
  }

  getVideo(videoType: TVideoType, platform: TPlatformNames, game: string): TReqResult<string> {
    return this.executeReq({
      method: 'GET',
      url: `${endpoints.videoURL}/${videoType}/${platform}/${encodeURIComponent(game)}`,
    });
  }

  isWatchedEbayCard(ebayCard: IEbayCardObj): TReqResult<{ success: string }> {
    return this.executeReq({
      data: ebayCard,
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      method: 'POST',
      url: `${endpoints.profileUrl}/isWatchedEbayCard`,
    });
  }

  notWatchEbayCard(ebayCard: IEbayCardObj): TReqResult {
    return this.executeReq({
      data: ebayCard,
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      method: 'POST',
      url: `${endpoints.profileUrl}/removeEbayCard`,
    });
  }

  postSignIn(username: string, password: string): TReqResult<{ success: string; token: string; username: string }> {
    return this.executeReq({
      data: {
        password,
        username,
      },
      method: 'POST',
      url: `${endpoints.signInUrl}`,
    });
  }

  postSignUp(data: ISignUpData): TReqResult<{ user_id: number }> {
    return this.executeReq({
      data,
      method: 'POST',
      url: `${endpoints.signUpUrl}`,
    });
  }

  toggleEbayVisibility(game: string, platform: TPlatformNames, isShowed: boolean): TReqResult {
    return this.executeReq({
      data: { game, isShowed, platform },
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      method: 'POST',
      url: `${endpoints.profileUrl}/toggleEbaySection`,
    });
  }

  //rewrite this method
  updateProfile(obj: TUpdProfObj): TReqResult {
    return this.executeReq({
      data: obj,
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      method: 'POST',
      url: `${endpoints.profileUrl}/update`,
    });
  }

  watchEbayCard(ebayCard: IEbayCardObj): TReqResult {
    return this.executeReq({
      data: {
        ebayCard,
      },
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      method: 'POST',
      url: `${endpoints.profileUrl}/addEbayCard`,
    });
  }
}

const backendUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000';
export const api = new Api(backendUrl);
