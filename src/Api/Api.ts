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
  additionals?: unknown;
  err_message?: string;
  errors?: TServerError[];
  payload?: T;
  status: TServerStatus;
}

type TApiResponse<T = unknown> = TReqResult<IServerResponse<T>>;

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

  checkCredentials(): TApiResponse<{ username: string }> {
    return this.executeReq({
      method: 'POST',
      url: endpoints.checkCredentialUrl,
    });
  }

  logout(): TApiResponse {
    return this.executeReq({
      method: 'POST',
      url: endpoints.logoutUrl,
    });
  }

  getBoxArt(platform: TPlatformNames, slug: string): TApiResponse<string> {
    return this.executeReq({
      method: 'GET',
      url: `${endpoints.boxArtworkUrl}/${platform}/${slug}`,
    });
  }

  getEbayItems(
    platform: TPlatformNames,
    gameName: string,
    sortOrder: EEbaySortOrder
  ): TApiResponse<{ item: Array<Array<TEbayCardPreviewRawData>> }> {
    return this.executeReq({
      method: 'GET',
      url: `${endpoints.ebayItemsUrl}/${platform}/${gameName}/${sortOrder}`,
    });
  }

  getEbaySingleItem(id: number): TApiResponse<IEbayCardRawData> {
    return this.executeReq({
      method: 'GET',
      url: `${endpoints.ebaySingleItemUrl}/${id}`,
    });
  }

  getGameDetails(slug: string): TApiResponse<IRawgGameDetails> {
    return this.executeReq({
      method: 'GET',
      url: `${endpoints.getDetailsUrl}/${slug}`,
    });
  }

  getGameWatchedCards(platform: TPlatformNames, game: string): TApiResponse<Array<{ id: string }>> {
    return this.executeReq({
      method: 'GET',
      url: `${endpoints.profileUrl}/ebayCards/${platform}/${game}/watched`,
    });
  }

  getGamesForPlatform(params: IGetGamesForPlatParams): TApiResponse<{ count: number; results: IRawgGame[] }> {
    const paramsStr = queryParamBuilder({ ...params });
    const url = `${endpoints.gamesForPlatformUrl}${paramsStr}`;
    return this.executeReq({
      method: 'GET',
      url,
    });
  }

  getProfileInfo(): TApiResponse<IProfile> {
    return this.executeReq({
      method: 'GET',
      url: endpoints.profileUrl,
    });
  }

  getScreenshots(slug: string): TApiResponse<{ results: Array<IRawgScreenshot> }> {
    return this.executeReq({
      method: 'GET',
      url: `${endpoints.getScreenshotsUrl}/${slug}`,
    });
  }

  getShippingCosts(itemId: number): TApiResponse<IEbayCardShippingDetails> {
    return this.executeReq({
      method: 'GET',
      url: `${endpoints.shippingCostsUrl}/${itemId}/shopingCosts`,
    });
  }

  getVideo(videoType: TVideoType, platform: TPlatformNames, game: string): TApiResponse<string> {
    return this.executeReq({
      method: 'GET',
      url: `${endpoints.videoURL}/${videoType}/${platform}/${game}`,
    });
  }

  isWatchedEbayCard(ebayCard: IEbayCardObj): TApiResponse<{ inList: true }> {
    return this.executeReq({
      method: 'GET',
      url: `${endpoints.profileUrl}/ebayCards/${ebayCard.platform}/${ebayCard.game}/${ebayCard.ebayItemId}/isWatched`,
    });
  }

  notWatchEbayCard(ebayCard: IEbayCardObj): TApiResponse {
    return this.executeReq({
      method: 'DELETE',
      url: `${endpoints.profileUrl}/ebayCards/${ebayCard.platform}/${ebayCard.game}/${ebayCard.ebayItemId}`,
    });
  }

  postSignIn(username: string, password: string): TApiResponse {
    return this.executeReq({
      data: {
        password,
        username,
      },
      method: 'POST',
      url: `${endpoints.signInUrl}`,
    });
  }

  postSignUp(data: ISignUpData): TApiResponse {
    return this.executeReq({
      data,
      method: 'POST',
      url: `${endpoints.signUpUrl}`,
    });
  }

  toggleEbayVisibility(game: string, platform: TPlatformNames, isShowed: boolean): TApiResponse {
    return this.executeReq({
      data: { game, isShowed, platform },

      method: 'POST',
      url: `${endpoints.profileUrl}/toggleEbaySection`,
    });
  }

  addGame(data: IAddGame): TApiResponse {
    return this.executeReq({
      data,
      method: 'POST',
      url: `${endpoints.profileUrl}/games`,
    });
  }

  removeGame(data: IRemoveGame): TApiResponse {
    return this.executeReq({
      data,
      method: 'DELETE',
      url: `${endpoints.profileUrl}/games`,
    });
  }

  reorderGames(data: IReorderGames): TApiResponse {
    return this.executeReq({
      data,
      method: 'PUT',
      url: `${endpoints.profileUrl}/games/reorder`,
    });
  }

  watchEbayCard(ebayCard: IEbayCardObj): TApiResponse {
    return this.executeReq({
      method: 'POST',
      url: `${endpoints.profileUrl}/ebayCards/${ebayCard.platform}/${ebayCard.game}/${ebayCard.ebayItemId}`,
    });
  }
}

const backendUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000';
export const api = new Api(backendUrl);
