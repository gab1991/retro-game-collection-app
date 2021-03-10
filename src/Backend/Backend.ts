import axios_base, { AxiosRequestConfig } from 'axios';

import { TBackend, TErrCb } from './types';

import { server_adress } from '../Configs/server.config';
import { getToken } from '../Store/store';

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

    if (typeof errCb === 'function') errCb(err);

    return { ...err };
  }
};

export const Backend: TBackend = {
  checkCredentials: (token, username, errCb) => {
    return axiosExecute(
      {
        data: {
          username,
        },
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: 'POST',
        url: `/api/auth/check_credentials`,
      },
      errCb
    );
  },

  getBoxArt: (platform, slug, errCb) => {
    return axiosExecute(
      {
        method: 'GET',
        url: `${api.appServer.boxArtworkUrl}/${platform}/${encodeURIComponent(slug)}`,
      },
      errCb
    );
  },

  getEbayItems: (platform, gameName, sortOrder, errCb) => {
    return axiosExecute(
      {
        method: 'GET',
        url: `${api.appServer.ebayItemsUrl}/${platform}/${encodeURIComponent(gameName)}/${sortOrder}`,
      },
      errCb
    );
  },

  getEbaySingleItem: (id, errCb) => {
    return axiosExecute(
      {
        method: 'GET',
        url: `${api.appServer.ebaySingleItemUrl}/${id}`,
      },
      errCb
    );
  },

  getGameDetails: (slug, errCb) => {
    return axiosExecute(
      {
        method: 'GET',
        url: `${api.game.getDetailsUrl}${slug}`,
      },
      errCb
    );
  },

  getGameWatchedCards: (platform, game, errCb) => {
    return axiosExecute(
      {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
        method: 'GET',
        url: `${api.appServer.profileUrl}/getGameWatchedCards/${platform}/${game}`,
      },
      errCb
    );
  },

  getGamesForPlatform: (params, errCb) => {
    const paramsStr = queryParamBuilder({ ...params });
    const url = `${api.games.getGamesUrl}${paramsStr}`;
    return axiosExecute(
      {
        method: 'GET',
        url,
      },
      errCb
    );
  },

  getProfileInfo: (errCb) => {
    return axiosExecute(
      {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
        method: 'GET',
        url: `/api/profile`,
      },
      errCb
    );
  },

  getScreenshots: (slug, errCb) => {
    return axiosExecute(
      {
        method: 'GET',
        url: `${api.game.getDetailsUrl}${slug}/screenshots`,
      },
      errCb
    );
  },

  getShippingCosts: (itemId, errCb) => {
    return axiosExecute(
      {
        method: 'GET',
        url: `${api.appServer.shippingCostsUrl}/${itemId}`,
      },
      errCb
    );
  },

  getVideo: (videoType, platform, game, errCb) => {
    return axiosExecute(
      {
        method: 'GET',
        url: `${api.appServer.videoURL}/${videoType}/${platform}/${encodeURIComponent(game)}`,
      },
      errCb
    );
  },

  isWatchedEbayCard: (ebayCard, errCb) => {
    return axiosExecute(
      {
        data: ebayCard,
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
        method: 'POST',
        url: `${api.appServer.profileUrl}/isWatchedEbayCard`,
      },
      errCb
    );
  },

  notWatchEbayCard: (ebayCard, errCb) => {
    return axiosExecute(
      {
        data: ebayCard,
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
        method: 'POST',
        url: `${api.appServer.profileUrl}/removeEbayCard`,
      },
      errCb
    );
  },

  postSignIn: (username, password, errCb) => {
    return axiosExecute(
      {
        data: {
          password,
          username,
        },
        method: 'POST',
        url: `${api.appServer.signInUrl}`,
      },
      errCb
    );
  },

  postSignUp: (data, errCb) => {
    return axiosExecute(
      {
        data,
        method: 'POST',
        url: `${api.appServer.signUpUrl}`,
      },
      errCb
    );
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
