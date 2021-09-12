/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AxiosError } from 'axios';

import { IProfileGame } from 'Routes/Profile/reducer/types';
import { DeepReadonly } from 'utility-types';

import { EAvailableLists, EPlatformList, TPlatformNames } from 'Configs/appConfig';

export const HttpRespStats = {
  badRequest: 400,
  success: 200,
  unathorized: 401,
};

export interface IReorderGames {
  list: EAvailableLists;
  newSortedGames: DeepReadonly<Array<IProfileGame>>;
  platform: TPlatformNames;
}

export interface IRemoveGame {
  game: string;
  list: EAvailableLists;
  platform: TPlatformNames;
}

export interface IAddGame {
  game: string;
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

export interface IEbayCardObj {
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

//Error TypeGuard
export const isAxiosError = <T>(err: any): err is AxiosError<T> => err?.isAxiosError;
