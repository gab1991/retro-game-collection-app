const isProduction = process.env.NODE_ENV === 'production';
const apiEndPoint = isProduction ? '/api' : 'http://localhost:8000/api';

export const api = {
  appServer: {
    boxArtworkUrl: `${apiEndPoint}/box_arts`,
    ebayItemsUrl: `${apiEndPoint}/ebay/searchList`,
    ebaySingleItemUrl: `${apiEndPoint}/ebay/singleItem`,
    profileUrl: `${apiEndPoint}/profile`,
    shippingCostsUrl: `${apiEndPoint}/ebay/shopingCosts`,
    signInUrl: `${apiEndPoint}/auth/sign_in`,
    signUpUrl: `${apiEndPoint}/auth/sign_up`,
    videoURL: `${apiEndPoint}/youtube`,
  },
  game: {
    getDetailsUrl: 'https://api.rawg.io/api/games/',
  },
  games: {
    getGamesUrl: 'https://api.rawg.io/api/games',
    params: {
      dates: 'Filter by a release date, for example: 2010-01-01,2018-12-31.1960-01-01,1969-12-31.',
      genres: 'Filter by genres, for example: 4,51 or action,indie.',
      ordering: ['name', 'released', 'rating'],
      page: 'A page number within the paginated result set.',
      page_size: 'Number of results to return per page.',
      platforms: 'Filter by platforms, for example: 4,5.',
      search: 'Search query.',
      tags: 'Filter by tags, for example: 31,7 or singleplayer,multiplayer.',
      // 'Available fields: name, released, added, created, rating. You can reverse the sort order adding a hyphen, for example: -released.'
    },
  },
  // platforms: {
  //   getPlatformsURL: 'https://api.rawg.io/api/platforms',
  // },
};
