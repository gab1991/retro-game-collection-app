const isProduction = process.env.NODE_ENV === 'production';
const apiEndPoint = isProduction ? '/api' : 'http://localhost:8000/api';
//should remove when move to backend
const RAWG_API_KEY = '2a65231971864b659dc4deaccdf824eb';
const RAWG_API_GAMES_ENDPOINT = `https://api.rawg.io/api/games`;

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
    getDetailsUrl: RAWG_API_GAMES_ENDPOINT,
  },
  games: {
    getGamesUrl: RAWG_API_GAMES_ENDPOINT,
  },
};

export const insertApiKey = (): string => `key=${RAWG_API_KEY}`;
