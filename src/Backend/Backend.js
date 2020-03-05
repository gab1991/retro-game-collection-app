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
  }
};

export default Backend;

//   loadData: function(offset = '0', limit = '5') {
//     const url = `https://staffz.ru/api/announce-list?offset=${offset}&limit=${limit}`;
//     return new Promise((resolve, reject) => {
//       fetch(url)
//         .then(res => res.json())
//         .then(data => resolve(data))
//         .catch(err => reject(err));
//     });
//   },
