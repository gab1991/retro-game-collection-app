import { createAction } from 'typesafe-actions';

import { EPlatformList } from 'Сonfigs/appConfig';

interface ISetBoxArtUrl {
  gameName: string;
  platform: EPlatformList;
  url: string;
}

export const setBoxArtUrl = createAction('content/setBoxArtUrl', ({ url, platform, gameName }: ISetBoxArtUrl) => ({
  gameName,
  platform,
  url,
}))();
