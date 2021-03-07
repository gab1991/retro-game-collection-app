import { TSelector } from 'Store/types';

import { IRawgGame, IRawgPageData } from 'Typings/RawgData';

export const selectGamesToShow: TSelector<Array<IRawgGame>> = (state) => state.gameSelector.gamesToShow;

export const selectPageData: TSelector<IRawgPageData> = (state) => state.gameSelector.pageData;
