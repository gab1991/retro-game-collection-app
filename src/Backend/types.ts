import { EPlatformList, TPlatformNames } from 'Configs/appConfig';
import { IRawgGame } from 'Typings/RawgData';

export type TBackend = {
  checkCredentials: (token: string, username: string, errCb?: TErrCb) => any;
  getBoxArt: (platform: TPlatformNames, slug: string, errCb?: TErrCb) => any;
  //need to type sortOrder
  getEbayItems: (platform: TPlatformNames, game: string, sortOrder: string, errCb?: TErrCb) => any;
  getEbaySingleItem: (id: number, errCb?: TErrCb) => any;
  getGameDetails: (slug: string, errCb?: TErrCb) => any;
  getGameWatchedCards: (platform: TPlatformNames, game: string, errCb?: TErrCb) => any;
  getGamesForPlatform: (params: IGetGamesForPlatParams, errCb?: TErrCb) => any;
  getProfileInfo: (errCb?: TErrCb) => any;
  getScreenshots: (slug: string, errCb?: TErrCb) => any;
  getShippingCosts: (itemId: number, errCb?: TErrCb) => any;
  getVideo: (videoType: TVideoType, platform: TPlatformNames, game: string, errCb?: TErrCb) => any;
  isWatchedEbayCard: (ebayCard: IEbayCardObj, errCb?: TErrCb) => any;
  notWatchEbayCard: (ebayCard: IEbayCardObj, errCb?: TErrCb) => any;
  postSignIn: (username: string, password: string, errCb?: TErrCb) => any;
  postSignUp: (data: ISignUpData, errCb?: TErrCb) => any;
  toggleEbayVisibility: (game: string, platform: TPlatformNames, isShowed: boolean, errCb?: TErrCb) => any;
  //rewrite this method
  updateProfile: (obj: TUpdProfObj, errCb?: TErrCb) => any;
  watchEbayCard: (ebayCard: IEbayCardObj, errCb?: TErrCb) => any;
};

type TUpdProfObj = IReodredGames | IRemoveGame | IAddGame;

interface IReodredGames {
  action: 'reorder';
  list: TList;
  platform: TPlatformNames;
  sortedGames: Array<IRawgGame>;
}

interface IRemoveGame {
  action: 'removeGame';
  game: string;
  list: TList;
  platform: TPlatformNames;
}

interface IAddGame {
  action: 'addGame';
  game: string;
  list: TList;
  platform: TPlatformNames;
}

interface IGetGamesForPlatParams {
  ordering: string;
  page: number;
  page_size: number;
  platforms: EPlatformList;
  search: string;
}

type TErrCb = (err) => void;

type TVideoType = 'soundtrack' | 'gameplay';

type TList = 'wish_list' | 'owned_list';

interface IEbayCardObj {
  ebayItemId: number;
  game: string;
  platform: TPlatformNames;
}

interface ISignUpData {
  email: string;
  password: string;
  username: string;
}
