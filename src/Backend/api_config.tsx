const isProduction = process.env.NODE_ENV === 'production';
const apiEndPoint = isProduction ? '/api' : 'http://localhost:8000/api';

export const api = {
  appServer: {
    boxArtworkUrl: `${apiEndPoint}/box_arts`,
    ebayItemsUrl: `${apiEndPoint}/ebay/searchList`,
    ebaySingleItemUrl: `${apiEndPoint}/ebay/singleItem`,
    gamesForPlatformUrl: `${apiEndPoint}/rawg/gamesForPlatform`,
    getDetailsUrl: `${apiEndPoint}/rawg/gameDetails`,
    getScreenshotsUrl: `${apiEndPoint}/rawg/screenshots`,
    profileUrl: `${apiEndPoint}/profile`,
    shippingCostsUrl: `${apiEndPoint}/ebay/shopingCosts`,
    signInUrl: `${apiEndPoint}/auth/sign_in`,
    signUpUrl: `${apiEndPoint}/auth/sign_up`,
    videoURL: `${apiEndPoint}/youtube`,
  },
};
