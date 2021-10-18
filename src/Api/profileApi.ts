import { Api, IAddGame, IEbayCardObj, IRemoveGame, IReorderGames, TApiResponse } from 'Api';

import { IProfile } from 'Routes/Profile/reducer/types';

import { TPlatformNames } from 'Configs/appConfig';

import { endpoints } from './config';

class ProfileApi extends Api {
  constructor() {
    super();
  }

  getGameWatchedCards(platform: TPlatformNames, game: string): TApiResponse<Array<{ id: string }>> {
    return this.executeReq({
      method: 'GET',
      url: `${endpoints.profile}/ebayCards/${platform}/${game}/watched`,
    });
  }

  getProfileInfo(): TApiResponse<IProfile> {
    return this.executeReq({
      method: 'GET',
      url: endpoints.profile,
    });
  }

  isWatchedEbayCard(ebayCard: IEbayCardObj): TApiResponse<{ inList: true }> {
    return this.executeReq({
      method: 'GET',
      url: `${endpoints.profile}/ebayCards/${ebayCard.platform}/${ebayCard.game}/${ebayCard.ebayItemId}/isWatched`,
    });
  }

  notWatchEbayCard(ebayCard: IEbayCardObj): TApiResponse {
    return this.executeReq({
      method: 'DELETE',
      url: `${endpoints.profile}/ebayCards/${ebayCard.platform}/${ebayCard.game}/${ebayCard.ebayItemId}`,
    });
  }

  toggleEbayVisibility(game: string, platform: TPlatformNames, isShowed: boolean): TApiResponse {
    return this.executeReq({
      data: { game, isShowed, platform },

      method: 'POST',
      url: `${endpoints.profile}/toggleEbaySection`,
    });
  }

  addGame(data: IAddGame): TApiResponse {
    return this.executeReq({
      data,
      method: 'POST',
      url: `${endpoints.profile}/games`,
    });
  }

  removeGame(data: IRemoveGame): TApiResponse<IProfile> {
    return this.executeReq({
      data,
      method: 'DELETE',
      url: `${endpoints.profile}/games`,
    });
  }

  reorderGames(data: IReorderGames): TApiResponse {
    return this.executeReq({
      data,
      method: 'PUT',
      url: `${endpoints.profile}/games/reorder`,
    });
  }

  watchEbayCard(ebayCard: IEbayCardObj): TApiResponse {
    return this.executeReq({
      method: 'POST',
      url: `${endpoints.profile}/ebayCards/${ebayCard.platform}/${ebayCard.game}/${ebayCard.ebayItemId}`,
    });
  }
}

export const profileApi = new ProfileApi();
