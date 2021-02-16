import { TGameDetailedReducer } from './types';
import { TSelector } from 'Store/types';

import { IRawgGameDetails } from 'Typings/RawgData';

export const selectGameDetailed: TSelector<TGameDetailedReducer> = (state) => state.gameDetailed;

export const selectScreenshots: TSelector<Array<string>> = (state) => state.gameDetailed.screenshots;

export const selectIsWished: TSelector<boolean> = (state) => state.gameDetailed.isWished;

export const selectIsOwned: TSelector<boolean> = (state) => state.gameDetailed.isOwned;

export const selectGameDetails: TSelector<IRawgGameDetails | null> = (state) => state.gameDetailed.gameDetails;
