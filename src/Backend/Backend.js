import axios_base from 'axios';
import { getToken } from '../Store/store';
import api from './api_config';
import { server_adress } from '../Сonfigs/server.config';

const axios = axios_base.create({
  baseURL: server_adress,
  timeout: 4000,
});

function queryParamBuilder(params) {
  if (typeof params === 'string') return params;

  const result = [];
  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      result.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      );
    }
  }
  return `?${result.join('&')}`;
}

const Backend = {
  getAllPlatfroms: () => {
    const url = api.platforms.getPlatformsURL;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  },

  getPlatformDetails: (platformId) => {
    const url = `${api.platforms.getPlatformsURL}/${platformId}`;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  },

  getGamesForPlatform: (params) => {
    let paramsStr = queryParamBuilder(params);
    let url = `${api.games.getGamesUrl}${paramsStr}`;
    return new Promise((resolve, reject) => {
      axios({
        url,
        method: 'GET',
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },

  getGameDetails: (slug) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `${api.game.getDetailsUrl}${slug}`,
        method: 'GET',
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },

  getScreenshots: (slug) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `${api.game.getDetailsUrl}${slug}/screenshots`,
        method: 'GET',
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },

  getBoxArt: (platform, slug) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `${api.appServer.boxArtworkUrl}/${platform}/${encodeURIComponent(
          slug
        )}`,
        method: 'GET',
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },

  postSignUp: (obj) => {
    let url = `${api.appServer.signUpUrl}`;
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      })
        // .then(handleErrors)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  },

  postSignIn: (username, password) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `${api.appServer.signInUrl}`,
        method: 'POST',
        data: {
          username,
          password,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
  checkCredentials: (token, username) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `/api/auth/check_credentials`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          username,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
  getProfileInfo: (token) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `/api/profile`,
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },

  updateProfile: (obj) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `${api.appServer.profileUrl}/update`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
        data: obj,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },

  getVideo: (videoType, platform, gameName) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `${
          api.appServer.videoURL
        }/${videoType}/${platform}/${encodeURIComponent(gameName)}`,
        method: 'GET',
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },

  getEbayItems: (platform, gameName, sortOrder) => {
    let url = `${api.appServer.ebayItemsUrl}/${platform}/${encodeURIComponent(
      gameName
    )}/${sortOrder}`;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  },

  getEbaySingleItem: (id) => {
    let url = `${api.appServer.ebaySingleItemUrl}/${id}`;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  },

  getShippingCosts: (itemId) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `${api.appServer.shippingCostsUrl}/${itemId}`,
        method: 'GET',
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },

  watchEbayCard: (obj) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `${api.appServer.profileUrl}/addEbayCard`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
        data: {
          ...obj,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },

  isWatchedEbayCard: (obj) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `${api.appServer.profileUrl}/isWatchedEbayCard`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
        data: obj,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },

  notWatchEbayCard: (obj) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `${api.appServer.profileUrl}/removeEbayCard`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
        data: obj,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },

  getGameWatchedCards: (platform, game) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `${api.appServer.profileUrl}/getGameWatchedCards/${platform}/${game}`,
        method: 'GET',
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
  toggleEbayVisibility: (gameName, platform, isShowed) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `${api.appServer.profileUrl}/toggleEbaySection`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
        data: { gameName, platform, isShowed },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
};

export default Backend;
