import { AxiosPromise } from 'axios';

import { IProfile, IReorderGamesActionArgs } from 'Routes/Profile/reducer/types';

import { EAvailableLists, EPlatformList, TPlatformNames, TVideoType } from 'Configs/appConfig';
import { IEbayCardRawData, IEbayCardShippingDetails, TEbayCardPreviewRawData } from 'Typings/EbayData';
import { IRawgGame, IRawgGameDetails, IRawgScreenshot } from 'Typings/RawgData';

export type TBackend = {
  checkCredentials: (token: string, username: string) => AxiosPromise<{ success: string }>;
  getBoxArt: (platform: TPlatformNames, slug: string) => AxiosPromise<string>;
  getEbayItems: (
    platform: TPlatformNames,
    game: string,
    sortOrder: EEbaySortOrder
  ) => AxiosPromise<{ item: Array<Array<TEbayCardPreviewRawData>> }>;
  getEbaySingleItem: (id: number) => AxiosPromise<{ Item: IEbayCardRawData }>;
  getGameDetails: (slug: string) => AxiosPromise<IRawgGameDetails>;
  getGameWatchedCards: (platform: TPlatformNames, game: string) => AxiosPromise<Array<{ id: string }>>;
  getGamesForPlatform: (params: IGetGamesForPlatParams) => AxiosPromise<{ count: number; results: IRawgGame[] }>;
  getProfileInfo: () => AxiosPromise<IProfile>;
  getScreenshots: (slug: string) => AxiosPromise<{ results: Array<IRawgScreenshot> }>;
  getShippingCosts: (itemId: number) => AxiosPromise<IEbayCardShippingDetails>;
  getVideo: (videoType: TVideoType, platform: TPlatformNames, game: string) => AxiosPromise<string>;
  isWatchedEbayCard: (ebayCard: IEbayCardObj) => AxiosPromise<{ success: string }>;
  notWatchEbayCard: (ebayCard: IEbayCardObj) => AxiosPromise;
  postSignIn: (
    username: string,
    password: string
  ) => AxiosPromise<{ success: string; token: string; username: string }>;
  postSignUp: (data: ISignUpData) => AxiosPromise<{ user_id: number }>;
  toggleEbayVisibility: (game: string, platform: TPlatformNames, isShowed: boolean) => AxiosPromise;
  //rewrite this method
  updateProfile: (obj: TUpdProfObj) => AxiosPromise;
  watchEbayCard: (ebayCard: IEbayCardObj) => AxiosPromise;
};

type TUpdProfObj = IReodredGames | IRemoveGame | IAddGame;

interface IReodredGames extends IReorderGamesActionArgs {
  action: 'reorder';
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

export interface IGetGamesForPlatParams {
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
