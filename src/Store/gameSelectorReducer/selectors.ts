import { TSelector } from 'Store/types';

import { IRawgGame, IRawgPageData } from 'Typings/RawgData';

export const getGamesToShow: TSelector<Array<IRawgGame>> = (state) => state.gameSelector.gamesToShow;

export const getPageData: TSelector<IRawgPageData> = (state) => state.gameSelector.pageData;
