import { createAction } from 'typesafe-actions';

import { TPlatformNames } from 'Configs/appConfig';

interface ISetBoxArtUrl {
  gameName: string;
  platform: TPlatformNames;
  url: string;
}

export const setBoxArtUrl = createAction('content/setBoxArtUrl', ({ url, platform, gameName }: ISetBoxArtUrl) => ({
  gameName,
  platform,
  url,
}))();
