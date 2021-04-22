/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios_base, { AxiosError, AxiosRequestConfig } from 'axios';

import { TBackend } from './types';

import { server_adress } from 'Configs/server.config';
import { getToken } from 'Store/store';

import { api } from './api_config';

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

const axiosExecute = async (config: AxiosRequestConfig = {}) => {
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
      url: api.appServer.checkCredentialUrl,
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
      url: `${api.appServer.getDetailsUrl}/${slug}`,
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
    const url = `${api.appServer.gamesForPlatformUrl}${paramsStr}`;
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
      url: api.appServer.profileUrl,
    });
  },

  getScreenshots: (slug) => {
    return axiosExecute({
      method: 'GET',
      url: `${api.appServer.getScreenshotsUrl}/${slug}`,
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

  toggleEbayVisibility: (game, platform, isShowed) => {
    return axiosExecute({
      data: { game, isShowed, platform },
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      method: 'POST',
      url: `${api.appServer.profileUrl}/toggleEbaySection`,
    });
  },

  updateProfile: (obj) => {
    return axiosExecute({
      data: obj,
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      method: 'POST',
      url: `${api.appServer.profileUrl}/update`,
    });
  },

  watchEbayCard: (obj) => {
    return axiosExecute({
      data: {
        ...obj,
      },
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      method: 'POST',
      url: `${api.appServer.profileUrl}/addEbayCard`,
    });
  },
};

export const HttpRespStats = {
  badRequest: 400,
  success: 200,
  unathorized: 401,
};

//Error TypeGuard
export const isAxiosError = <T>(err: any): err is AxiosError<T> => err?.isAxiosError;
