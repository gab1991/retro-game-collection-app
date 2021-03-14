import { AxiosError, AxiosPromise } from 'axios';

import { IProfile, IProfileGame } from 'Routes/Profile/reducer/types';

import { EAvailableLists, EPlatformList, TPlatformNames, TVideoType } from 'Configs/appConfig';
import { IEbayCardRawData, IEbayCardShippingDetails, TEbayCardPreviewRawData } from 'Typings/EbayData';
import { IRawgGameDetails, IRawgScreenshot } from 'Typings/RawgData';

export type TBackend = {
  checkCredentials: (token: string, username: string, errCb?: TErrCb) => AxiosPromise;
  getBoxArt: (platform: TPlatformNames, slug: string, errCb?: TErrCb) => AxiosPromise<string>;
  getEbayItems: (
    platform: TPlatformNames,
    game: string,
    sortOrder: EEbaySortOrder,
    errCb?: TErrCb
  ) => AxiosPromise<{ item: Array<Array<TEbayCardPreviewRawData>> }>;
  getEbaySingleItem: (id: number, errCb?: TErrCb) => AxiosPromise<{ Item: IEbayCardRawData }>;
  getGameDetails: (slug: string, errCb?: TErrCb) => AxiosPromise<IRawgGameDetails>;
  getGameWatchedCards: (platform: TPlatformNames, game: string, errCb?: TErrCb) => AxiosPromise;
  getGamesForPlatform: (params: IGetGamesForPlatParams, errCb?: TErrCb) => AxiosPromise;
  getProfileInfo: (errCb?: TErrCb) => AxiosPromise<IProfile>;
  getScreenshots: (slug: string, errCb?: TErrCb) => AxiosPromise<{ results: Array<IRawgScreenshot> }>;
  getShippingCosts: (itemId: number, errCb?: TErrCb) => AxiosPromise<IEbayCardShippingDetails>;
  getVideo: (videoType: TVideoType, platform: TPlatformNames, game: string, errCb?: TErrCb) => AxiosPromise<string>;
  isWatchedEbayCard: (ebayCard: IEbayCardObj, errCb?: TErrCb) => AxiosPromise<{ success?: string }>;
  notWatchEbayCard: (ebayCard: IEbayCardObj, errCb?: TErrCb) => AxiosPromise;
  postSignIn: (username: string, password: string, errCb?: TErrCb) => AxiosPromise;
  postSignUp: (data: ISignUpData, errCb?: TErrCb) => AxiosPromise<{ user_id: number }>;
  toggleEbayVisibility: (game: string, platform: TPlatformNames, isShowed: boolean, errCb?: TErrCb) => AxiosPromise;
  //rewrite this method
  updateProfile: (obj: TUpdProfObj, errCb?: TErrCb) => AxiosPromise;
  watchEbayCard: (ebayCard: IEbayCardObj, errCb?: TErrCb) => AxiosPromise;
};

export type TErrCb = (err: AxiosError) => void;

type TUpdProfObj = IReodredGames | IRemoveGame | IAddGame;

interface IReodredGames {
  action: 'reorder';
  list: EAvailableLists;
  platform: TPlatformNames;
  sortedGames: Array<IProfileGame>;
}

interface IRemoveGame {
  action: 'removeGame';
  game: string;
  list: EAvailableLists;
  platform: TPlatformNames;
}

interface IAddGame {
  action: 'addGame';
  game: IRawgGameDetails;
  list: EAvailableLists;
  platform: TPlatformNames;
}

interface IGetGamesForPlatParams {
  ordering: string;
  page: number;
  page_size: number;
  platforms: EPlatformList;
  search: string;
}

interface IEbayCardObj {
  ebayItemId: number;
  game: string;
  platform: TPlatformNames;
}

export interface ISignUpData {
  email: string;
  password: string;
  username: string;
}

export enum EEbaySortOrder {
  'Lowest Price' = 'PricePlusShippingLowest',
  'New Offers' = 'StartTimeNewest',
  'Relevance' = 'BestMatch',
  'Watched' = 'Watched',
}
