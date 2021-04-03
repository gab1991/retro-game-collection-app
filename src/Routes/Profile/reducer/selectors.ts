import { IProfileGame, IProfilePlatform, TProfileReducer } from './types';
import { TSelector } from 'Store/types';

import { EAvailableLists, TPlatformNames } from 'Configs/appConfig';

export const selectProfile: TSelector<TProfileReducer> = (state) => state.profile;

export const selectOwnedPlatforms: TSelector<Array<IProfilePlatform> | void> = (state) =>
  state.profile?.owned_list.platforms;

export const selectWishedPlatforms: TSelector<Array<IProfilePlatform> | void> = (state) =>
  state.profile?.wish_list.platforms;

export const selectGamesFromList: TSelector<IProfileGame[] | null, [EAvailableLists, TPlatformNames]> = (
  state,
  list,
  platformName
) => {
  const profileList = state.profile?.[list];

  if (!profileList) {
    return null;
  }

  const requiredPlatforms = profileList.platforms.find(({ name }) => name === platformName);

  if (!requiredPlatforms) {
    return null;
  }

  return requiredPlatforms.games;
};
