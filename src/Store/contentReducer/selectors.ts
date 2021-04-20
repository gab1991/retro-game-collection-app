import { TBoxArts } from './types';
import { IRootState } from 'Store/types';
import { DeepReadonly } from 'utility-types';

import { TPlatformNames } from 'Configs/appConfig';

export const selectBoxArt = (state: IRootState, platform: TPlatformNames, gameName: string): string | void =>
  state.content.boxArts?.[platform]?.[gameName];

export const selectBoxArts = (state: IRootState): DeepReadonly<TBoxArts> => state.content.boxArts;
