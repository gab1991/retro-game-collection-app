import { IProfile, IProfilePlatform } from 'Routes/Profile/reducer/types';
import { DeepReadonly } from 'utility-types';

import { EAvailableLists, TPlatformNames } from 'Configs/appConfig';

export const checkIfInList = (
  profile: DeepReadonly<IProfile>,
  list: EAvailableLists,
  platformName: TPlatformNames,
  gameName: string
): boolean => {
  const userPlatforms = profile[list].platforms;

  let chosenPlatform: null | DeepReadonly<IProfilePlatform> = null;
  for (const platform of userPlatforms) {
    if (platformName === platform.name) {
      chosenPlatform = platform;
    }
  }

  if (!chosenPlatform) return false;

  const { games } = chosenPlatform;
  for (const game of games) {
    if (gameName === game.name) return true;
  }

  return false;
};
