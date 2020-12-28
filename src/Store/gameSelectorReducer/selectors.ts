import { IRootState } from 'Store/types';
import { DeepReadonly } from 'utility-types';

import { IRawgGame, IRawgPageData } from 'Typings/RawgData';

export const getGamesToShow = (state: IRootState): DeepReadonly<Array<IRawgGame>> => state.gameSelector.gamesToShow;

export const getPageData = (state: IRootState): IRawgPageData => state.gameSelector.pageData;
