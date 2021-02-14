import { TGameDetailedReducer } from './types';
import { TSelector } from 'Store/types';

export const selectGameDetails: TSelector<TGameDetailedReducer> = (state) => state.gameDetailed;
