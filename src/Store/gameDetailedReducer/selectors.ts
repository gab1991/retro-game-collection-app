import { TGameDetailedReducer } from './types';
import { TSelector } from 'Store/types';

export const selectGameDetails: TSelector<TGameDetailedReducer> = (state) => state.gameDetailed;

export const selectScreenshots: TSelector<Array<string>> = (state) => state.gameDetailed.screenshots;
