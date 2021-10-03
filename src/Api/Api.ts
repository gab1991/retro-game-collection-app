import { IAddGame, IRemoveGame, IReorderGames } from 'Api';
import axios_base, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import { queryParamBuilder } from 'Utils';

import { EEbaySortOrder, IEbayCardObj, IGetGamesForPlatParams, ISignUpData } from './types';
import { IProfile } from 'Routes/Profile/reducer/types';

import { TPlatformNames, TVideoType } from 'Configs/appConfig';
import { IEbayCardRawData, IEbayCardShippingDetails, TEbayCardPreviewRawData } from 'Typings/EbayData';
import { IRawgGame, IRawgGameDetails, IRawgScreenshot } from 'Typings/RawgData';

import { endpoints } from './config';

type TApiClient = AxiosInstance;
type TExecReqConfig = AxiosRequestConfig;
type TReqResult<T = unknown> = AxiosPromise<T>;
type TServerStatus = 'success' | 'fail';
type TServerError = unknown;
interface IServerResponse<T = unknown> {
  data?: T;
  errors: TServerError[];
  status: TServerStatus;
}

interface ICheckCredentialResponse extends IServerResponse {
  username: string;
}

class Api {
  private readonly client: TApiClient;

  constructor(backendUrl: string) {
    this.client = axios_base.create({
      baseURL: backendUrl,
      timeout: 4000,
      withCredentials: true,
    });
  }

  async executeReq(config: TExecReqConfig = {}) {
    try {
      return await this.client(config);
    } catch (err) {
      console.error('ERROR', err);
      throw err;
    }
  }

  checkCredentials(): TReqResult<ICheckCredentialResponse> {
    return this.executeReq({
      method: 'POST',
      url: endpoints.checkCredentialUrl,
    });
  }

  logout(): TReqResult<IServerResponse> {
    return this.executeReq({
      method: 'POST',
      url: endpoints.logoutUrl,
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
      method: 'GET',
      url: `${endpoints.profileUrl}/ebayCards/watched/${platform}/${game}`,
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

  getProfileInfo(): TReqResult<IServerResponse<IProfile>> {
    return this.executeReq({
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
      url: `${endpoints.shippingCostsUrl}/${itemId}/shopingCosts`,
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
      method: 'GET',
      url: `${endpoints.profileUrl}/ebayCards/isWatched/${ebayCard.platform}/${ebayCard.game}/${ebayCard.ebayItemId}`,
    });
  }

  notWatchEbayCard(ebayCard: IEbayCardObj): TReqResult {
    return this.executeReq({
      data: ebayCard,

      method: 'DELETE',
      url: `${endpoints.profileUrl}/ebayCards`,
    });
  }

  postSignIn(username: string, password: string): TReqResult<ICheckCredentialResponse> {
    return this.executeReq({
      data: {
        password,
        username,
      },
      method: 'POST',
      url: `${endpoints.signInUrl}`,
    });
  }

  postSignUp(data: ISignUpData): TReqResult<IServerResponse> {
    return this.executeReq({
      data,
      method: 'POST',
      url: `${endpoints.signUpUrl}`,
    });
  }

  toggleEbayVisibility(game: string, platform: TPlatformNames, isShowed: boolean): TReqResult {
    return this.executeReq({
      data: { game, isShowed, platform },

      method: 'POST',
      url: `${endpoints.profileUrl}/toggleEbaySection`,
    });
  }

  addGame(data: IAddGame) {
    return this.executeReq({
      data,

      method: 'POST',
      url: `${endpoints.profileUrl}/games`,
    });
  }

  removeGame(data: IRemoveGame) {
    return this.executeReq({
      data,

      method: 'DELETE',
      url: `${endpoints.profileUrl}/games`,
    });
  }

  reorderGames(data: IReorderGames): TReqResult {
    return this.executeReq({
      data,

      method: 'PUT',
      url: `${endpoints.profileUrl}/games/reorder`,
    });
  }

  watchEbayCard(ebayCard: IEbayCardObj): TReqResult {
    return this.executeReq({
      data: {
        ebayCard,
      },

      method: 'POST',
      url: `${endpoints.profileUrl}/ebayCards`,
    });
  }
}

const backendUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000';
export const api = new Api(backendUrl);
