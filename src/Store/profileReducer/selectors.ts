import { TProfileReducer } from './types';
import { TSelector } from 'Store/types';

export const selectProfile: TSelector<TProfileReducer> = (state) => state.profile;
