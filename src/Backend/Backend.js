import axios_base from 'axios';
import { getToken } from '../Store/store';
import api from './api_config';
import { server_adress } from '../Сonfigs/server.config';

const axios = axios_base.create({
  baseURL: server_adress,
  timeout: 4000,
});

const queryParamBuilder = (params) => {
  if (typeof params === 'string') return params;

  const result = [];
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      result.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    }
  }
  return `?${result.join('&')}`;
};

const axiosExecute = async (options = {}, errCb) => {
  try {
    const res = await axios(options);
    const {
      data: { Ack: ebayApiError },
    } = res;

    if (ebayApiError === 'Failure') {
      throw res;
    }

    return res;
  } catch (err) {
    console.log('ERROR', err);

    if (typeof errCb === 'function') errCb(err);

    return { ...err };
  }
};

const Backend = {
  getGamesForPlatform: (params, errCb) => {
    const paramsStr = queryParamBuilder(params);
    const url = `${api.games.getGamesUrl}${paramsStr}`;
    return axiosExecute(
      {
        url,
        method: 'GET',
      },
      errCb,
    );
  },

  getGameDetails: (slug, errCb) => {
    return axiosExecute(
      {
        url: `${api.game.getDetailsUrl}${slug}`,
        method: 'GET',
      },
      errCb,
    );
  },

  getScreenshots: (slug, errCb) => {
    return axiosExecute(
      {
        url: `${api.game.getDetailsUrl}${slug}/screenshots`,
        method: 'GET',
      },
      errCb,
    );
  },

  getBoxArt: (platform, slug, errCb) => {
    return axiosExecute(
      {
        url: `${api.appServer.boxArtworkUrl}/${platform}/${encodeURIComponent(slug)}`,
        method: 'GET',
      },
      errCb,
    );
  },

  postSignUp: (data, errCb) => {
    return axiosExecute(
      {
        url: `${api.appServer.signUpUrl}`,
        method: 'POST',
        data: data,
      },
      errCb,
    );
  },

  postSignIn: (username, password, errCb) => {
    return axiosExecute(
      {
        url: `${api.appServer.signInUrl}`,
        method: 'POST',
        data: {
          username,
          password,
        },
      },
      errCb,
    );
  },

  checkCredentials: (token, username, errCb) => {
    return axiosExecute(
      {
        url: `/api/auth/check_credentials`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          username,
        },
      },
      errCb,
    );
  },

  getProfileInfo: (errCb) => {
    return axiosExecute(
      {
        url: `/api/profile`,
        method: 'GET',
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      },
      errCb,
    );
  },

  updateProfile: (obj, errCb) => {
    return axiosExecute(
      {
        url: `${api.appServer.profileUrl}/update`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
        data: obj,
      },
      errCb,
    );
  },

  getVideo: (videoType, platform, gameName, errCb) => {
    return axiosExecute(
      {
        url: `${api.appServer.videoURL}/${videoType}/${platform}/${encodeURIComponent(gameName)}`,
        method: 'GET',
      },
      errCb,
    );
  },

  getEbayItems: (platform, gameName, sortOrder, errCb) => {
    return axiosExecute(
      {
        url: `${api.appServer.ebayItemsUrl}/${platform}/${encodeURIComponent(gameName)}/${sortOrder}`,
        method: 'GET',
      },
      errCb,
    );
  },

  getEbaySingleItem: (id, errCb) => {
    return axiosExecute(
      {
        url: `${api.appServer.ebaySingleItemUrl}/${id}`,
        method: 'GET',
      },
      errCb,
    );
  },

  getShippingCosts: (itemId, errCb) => {
    return axiosExecute(
      {
        url: `${api.appServer.shippingCostsUrl}/${itemId}`,
        method: 'GET',
      },
      errCb,
    );
  },

  watchEbayCard: (obj, errCb) => {
    return axiosExecute(
      {
        url: `${api.appServer.profileUrl}/addEbayCard`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
        data: {
          ...obj,
        },
      },
      errCb,
    );
  },

  isWatchedEbayCard: (obj, errCb) => {
    return axiosExecute(
      {
        url: `${api.appServer.profileUrl}/isWatchedEbayCard`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
        data: {
          ...obj,
        },
      },
      errCb,
    );
  },

  notWatchEbayCard: (obj, errCb) => {
    return axiosExecute(
      {
        url: `${api.appServer.profileUrl}/removeEbayCard`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
        data: {
          ...obj,
        },
      },
      errCb,
    );
  },

  getGameWatchedCards: (platform, game, errCb) => {
    return axiosExecute(
      {
        url: `${api.appServer.profileUrl}/getGameWatchedCards/${platform}/${game}`,
        method: 'GET',
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      },
      errCb,
    );
  },

  toggleEbayVisibility: (gameName, platform, isShowed, errCb) => {
    return axiosExecute(
      {
        url: `${api.appServer.profileUrl}/toggleEbaySection`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
        data: { gameName, platform, isShowed },
      },
      errCb,
    );
  },
};

export default Backend;
