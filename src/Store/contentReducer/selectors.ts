import { IRootState } from 'Store/types';

import { EPlatformList } from 'Configs/appConfig';

export const selectBoxArt = (state: IRootState, platform: EPlatformList, gameName: string): string =>
  state.content.boxArts?.[platform]?.[gameName];
