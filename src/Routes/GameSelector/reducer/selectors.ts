import { IGameSelectorQuery } from './types';
import { TSelector } from 'Store/types';

import { IRawgGame, IRawgPageData } from 'Typings/rawgData';

export const selectGamesToShow: TSelector<Array<IRawgGame>> = (state) => state.gameSelector.gamesToShow;

export const selectPageData: TSelector<IRawgPageData> = (state) => state.gameSelector.pageData;

export const selectQuery: TSelector<IGameSelectorQuery> = (state) => state.gameSelector.query;

export const selectSearchInputValue: TSelector<string> = (state) => state.gameSelector.searchInputValue;

export const selectIsLoading: TSelector<boolean> = (state) => state.gameSelector.isLoading;

export const selectNoGamesFound: TSelector<boolean> = (state) => state.gameSelector.noGamesFound;
