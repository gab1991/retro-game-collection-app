import { ActionType } from 'typesafe-actions';
import { DeepReadonly } from 'utility-types';

import { IRawgGame, IRawgPageData } from 'Typings/RawgData';
import { EGameSelectorOrderingDirection, EGameSelectorOrderingName } from 'Сonfigs/appConfig';

import * as gameSelectorActions from './actions';

export type TGamwSelectorActions = ActionType<typeof gameSelectorActions>;

export type TGameSelectorReducer = DeepReadonly<{
  gamesToShow: Array<IRawgGame>;
  isLoading: boolean;
  noGamesFound: boolean;
  pageData: IRawgPageData;
  query: IGameSelectorQuery;
  searchInputValue: string;
}>;

export interface IGameSelectorQuery {
  direction: EGameSelectorOrderingDirection;
  ordername: EGameSelectorOrderingName;
  page: number;
  search: string;
}

export interface ISetNewOrdering {
  direction: EGameSelectorOrderingDirection;
  ordername: EGameSelectorOrderingName;
}
