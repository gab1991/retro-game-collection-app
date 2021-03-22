import axios_base, { AxiosError, AxiosRequestConfig } from 'axios';

import { TBackend, TErrCb } from './types';

import { server_adress } from 'Configs/server.config';
import { getToken } from 'Store/store';

import { api, insertApiKey } from './api_config';

const axios = axios_base.create({
  baseURL: server_adress,
  timeout: 4000,
});

const queryParamBuilder = (params: Record<string, string | number>) => {
  const result: Array<string> = [];
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      result.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    }
  }
  return `?${result.join('&')}`;
};

const axiosExecute = async (config: AxiosRequestConfig = {}, errCb?: TErrCb) => {
  try {
    const res = await axios(config);
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

    // if (typeof errCb === 'function') errCb(err);

    // return { ...err };
  }
};

export const Backend: TBackend = {
  checkCredentials: (token, username) => {
    return axiosExecute({
      data: {
        username,
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: 'POST',
      url: `/api/auth/check_credentials`,
    });
  },

  getBoxArt: (platform, slug) => {
    return axiosExecute({
      method: 'GET',
      url: `${api.appServer.boxArtworkUrl}/${platform}/${encodeURIComponent(slug)}`,
    });
  },

  getEbayItems: (platform, gameName, sortOrder) => {
    return axiosExecute({
      method: 'GET',
      url: `${api.appServer.ebayItemsUrl}/${platform}/${encodeURIComponent(gameName)}/${sortOrder}`,
    });
  },

  getEbaySingleItem: (id) => {
    return axiosExecute({
      method: 'GET',
      url: `${api.appServer.ebaySingleItemUrl}/${id}`,
    });
  },

  getGameDetails: (slug) => {
    return axiosExecute({
      method: 'GET',
      url: `${api.game.getDetailsUrl}/${slug}?${insertApiKey()}`,
    });
  },

  getGameWatchedCards: (platform, game) => {
    return axiosExecute({
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      method: 'GET',
      url: `${api.appServer.profileUrl}/getGameWatchedCards/${platform}/${game}`,
    });
  },

  getGamesForPlatform: (params) => {
    const paramsStr = queryParamBuilder({ ...params });
    const url = `${api.games.getGamesUrl}${paramsStr}&${insertApiKey()}`;
    return axiosExecute({
      method: 'GET',
      url,
    });
  },

  getProfileInfo: () => {
    return axiosExecute({
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      method: 'GET',
      url: `/api/profile`,
    });
  },

  getScreenshots: (slug) => {
    return axiosExecute({
      method: 'GET',
      url: `${api.game.getDetailsUrl}/${slug}/screenshots?${insertApiKey()}`,
    });
  },

  getShippingCosts: (itemId) => {
    return axiosExecute({
      method: 'GET',
      url: `${api.appServer.shippingCostsUrl}/${itemId}`,
    });
  },

  getVideo: (videoType, platform, game) => {
    return axiosExecute({
      method: 'GET',
      url: `${api.appServer.videoURL}/${videoType}/${platform}/${encodeURIComponent(game)}`,
    });
  },

  isWatchedEbayCard: (ebayCard) => {
    return axiosExecute({
      data: ebayCard,
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      method: 'POST',
      url: `${api.appServer.profileUrl}/isWatchedEbayCard`,
    });
  },

  notWatchEbayCard: (ebayCard) => {
    return axiosExecute({
      data: ebayCard,
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      method: 'POST',
      url: `${api.appServer.profileUrl}/removeEbayCard`,
    });
  },

  postSignIn: (username, password) => {
    return axiosExecute({
      data: {
        password,
        username,
      },
      method: 'POST',
      url: `${api.appServer.signInUrl}`,
    });
  },

  postSignUp: (data) => {
    return axiosExecute({
      data,
      method: 'POST',
      url: `${api.appServer.signUpUrl}`,
    });
  },

  toggleEbayVisibility: (game, platform, isShowed, errCb) => {
    return axiosExecute(
      {
        data: { game, isShowed, platform },
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
        method: 'POST',
        url: `${api.appServer.profileUrl}/toggleEbaySection`,
      },
      errCb
    );
  },

  updateProfile: (obj, errCb) => {
    return axiosExecute(
      {
        data: obj,
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
        method: 'POST',
        url: `${api.appServer.profileUrl}/update`,
      },
      errCb
    );
  },

  watchEbayCard: (obj, errCb) => {
    return axiosExecute(
      {
        data: {
          ...obj,
        },
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
        method: 'POST',
        url: `${api.appServer.profileUrl}/addEbayCard`,
      },
      errCb
    );
  },
};

export const HttpRespStats = {
  badRequest: 400,
  success: 200,
  unathorized: 401,
};

//Error TypeGuard
export const isAxiosError = <T>(err: any): err is AxiosError<T> => err?.isAxiosError;
