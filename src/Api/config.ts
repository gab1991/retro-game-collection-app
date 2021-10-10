import { IS_PROD } from 'Configs/server.config';

const apiEndPoint = IS_PROD ? '/api' : 'http://localhost:8000/api';

export const endpoints = {
  auth: {
    checkCredentialUrl: `${apiEndPoint}/auth/check_credentials`,
    logoutUrl: `${apiEndPoint}/auth/log_out`,
    signInUrl: `${apiEndPoint}/auth/sign_in`,
    signUpUrl: `${apiEndPoint}/auth/sign_up`,
  },
  boxArts: `${apiEndPoint}/box_arts`,
  ebay: {
    itemsUrl: `${apiEndPoint}/ebay/searchList`,
    singleItemUrl: `${apiEndPoint}/ebay`,
  },
  profile: `${apiEndPoint}/profile`,
  rawg: {
    gamesForPlatformUrl: `${apiEndPoint}/rawg/gamesForPlatform`,
    getDetailsUrl: `${apiEndPoint}/rawg/gameDetails`,
    getScreenshotsUrl: `${apiEndPoint}/rawg/screenshots`,
  },
  youtube: `${apiEndPoint}/youtube`,
} as const;
