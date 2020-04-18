import api from './api_config';

function queryParamBuilder(params) {
  if (typeof params === 'string') return params;

  let result = [];
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      result.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      );
    }
  }
  return `?${result.join('&')}`;
}
async function handleErrors(res) {
  if (!res.ok) {
    const status = res.status;
    const body = await res.json();
    throw { status, body };
  }
  return res.json();
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
      fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  },

  getGameDetails: (slug) => {
    let url = `${api.game.getDetailsUrl}${slug}`;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  },

  getScreenshots: (slug) => {
    let url = `${api.game.getDetailsUrl}${slug}/screenshots`;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  },

  getBoxArt: (platform, slug) => {
    let url = `${api.appServer.boxArtworkUrl}/${platform}/${encodeURIComponent(
      slug
    )}`;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data))
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
        .then(handleErrors)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  },

  postSignIn: (obj) => {
    let url = `${api.appServer.signInUrl}`;
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      })
        .then(handleErrors)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  },

  getProfileInfo: (token) => {
    let url = `${api.appServer.profileUrl}`;
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(handleErrors)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  },

  updateProfile: (token, obj) => {
    let url = `${api.appServer.profileUrl}/update`;
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  },

  getVideo: (videoType, platform, gameName) => {
    let url = `${
      api.appServer.videoURL
    }/${videoType}/${platform}/${encodeURIComponent(gameName)}`;
    console.log(url);
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
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
    let url = `${api.appServer.shippingCostsUrl}/${itemId}`;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  },

  watchEbayCard: (token, obj) => {
    let url = `${api.appServer.profileUrl}/addEbayCard`;
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  },

  isWatchedEbayCard: (token, obj) => {
    let url = `${api.appServer.profileUrl}/isWatchedEbayCard`;
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  },

  notWatchEbayCard: (token, obj) => {
    let url = `${api.appServer.profileUrl}/removeEbayCard`;
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  },

  getGameWatchedCards: (token, platform, game) => {
    console.log({ token, platform, game });
    let url = `${api.appServer.profileUrl}/getGameWatchedCards/${platform}/${game}`;
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(handleErrors)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  },
};

export default Backend;
