import { IProfilePlatform, TProfileReducer } from './types';
import { TSelector } from 'Store/types';

export const selectProfile: TSelector<TProfileReducer> = (state) => state.profile;

export const selectOwnedPlatforms: TSelector<Array<IProfilePlatform> | void> = (state) =>
  state.profile?.owned_list.platforms;
