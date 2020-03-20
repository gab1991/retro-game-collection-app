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

const Backend = {
  getAllPlatfroms: () => {
    const url = api.platforms.getPlatformsURL;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  },

  getPlatformDetails: platformId => {
    const url = `${api.platforms.getPlatformsURL}/${platformId}`;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  },

  getGamesForPlatform: params => {
    let paramsStr = queryParamBuilder(params);
    let url = `${api.games.getGamesUrl}${paramsStr}`;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  },

  getGameDetails: slug => {
    let url = `${api.game.getDetailsUrl}${slug}`;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  },

  getScreenshots: slug => {
    let url = `${api.game.getDetailsUrl}${slug}/screenshots`;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  },

  getBoxArt: (platform, slug) => {
    let url = `${api.appServer.boxArtworkUrl}/${platform}/${encodeURIComponent(
      slug
    )}`;
    console.log(platform, slug);
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  },

  postSignUp: obj => {
    let url = `${api.appServer.signUpUrl}`;
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  },

  postSignIn: obj => {
    let url = `${api.appServer.signInUrl}`;
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  },

  getProfileInfo: (username, token) => {
    let url = `${api.appServer.profileUrl}/${username}/${token}`;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  },
  updateProfile: (username, token, obj) => {
    let url = `${api.appServer.profileUrl}/${username}/update/${token}`;
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
};

export default Backend;
