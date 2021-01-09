import { IGameSelectorQuery, ISetNewOrdering } from './types';
import { createAction } from 'typesafe-actions';

import { IRawgGame, IRawgPageData } from 'Typings/RawgData';

export const setIsLoading = createAction('gameSelector/setIsLoading', (val: boolean) => val)();

export const setNoGamesFound = createAction('gameSelector/setNoGamesFound', (val: boolean) => val)();

export const setGamesToShow = createAction(
  'gameSelector/setGamesToShow',
  (arrOfGames: Array<IRawgGame>) => arrOfGames
)();

export const writePageData = createAction('gameSelector/writePageData', (pageData: IRawgPageData) => pageData)();

export const setSearchInputValue = createAction('gameSelector/setSearchInputValue', (val: string) => val)();

export const changePageNumber = createAction('gameSelector/changePageNumber', (pageNum: number) => pageNum)();

export const _changeSearchStr = createAction('gameSelector/changeSearchStr', (str: string) => str)();

export const _setNewOrdering = createAction(
  'gameSelctor/setNewOrdering',
  ({ direction, ordername }: ISetNewOrdering) => ({
    direction,
    ordername,
  })
)();

export const _changeQueryParams = createAction(
  'gameSelector/changeQueryParams',
  (currentParams: Partial<IGameSelectorQuery>) => currentParams
)();
