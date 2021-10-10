import { IGameSelectorQuery, ISetNewOrdering } from './types';
import { createAction } from 'typesafe-actions';

import { IRawgGame, IRawgPageData } from 'Typings/rawgData';

export const setIsLoading = createAction('gameSelector/setIsLoading', (val: boolean) => val)();

export const setNoGamesFound = createAction('gameSelector/setNoGamesFound', (val: boolean) => val)();

export const setGamesToShow = createAction(
  'gameSelector/setGamesToShow',
  (arrOfGames: Array<IRawgGame>) => arrOfGames
)();

export const writePageData = createAction('gameSelector/writePageData', (pageData: IRawgPageData) => pageData)();

export const setSearchInputValue = createAction('gameSelector/setSearchInputValue', (val: string) => val)();

export const changePageNumber = createAction('gameSelector/changePageNumber', (pageNum: number) => pageNum)();

export const changeSearchStrAction = createAction('gameSelector/changeSearchStr', (str: string) => str)();

export const setNewOrdering = createAction(
  'gameSelctor/setNewOrdering',
  ({ direction, ordername }: ISetNewOrdering) => ({
    direction,
    ordername,
  })
)();

export const setParsedQueryParams = createAction(
  'gameSelector/setParsedQueryParams',
  (currentParams: Partial<IGameSelectorQuery>) => currentParams
)();

export const flushGameSelectorStore = createAction('gameSelector/flushGameSelectorStore')();
