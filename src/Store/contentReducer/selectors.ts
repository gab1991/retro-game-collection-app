import { IRootState } from 'Store/types';

import { TPlatformNames } from 'Configs/appConfig';

export const selectBoxArt = (state: IRootState, platform: TPlatformNames, gameName: string): string | void =>
  state.content.boxArts?.[platform]?.[gameName];
