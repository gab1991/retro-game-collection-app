import { produce } from 'immer';

import { TGameSelectorReducer, TGamwSelectorActions } from './types';
import { createReducer } from 'typesafe-actions';

import { appConfig } from 'Configs/appConfig';

import * as actions from './actions';

const { defaultOrdering } = appConfig.GameSelector;

const initial: TGameSelectorReducer = {
  gamesToShow: [],
  isLoading: false,
  noGamesFound: false,
  pageData: { count: 0 },
  query: {
    direction: defaultOrdering.direction,
    ordername: defaultOrdering.name,
    page: 1,
    search: '',
  },
  searchInputValue: '',
};

export const gameSelectorReducer = createReducer<TGameSelectorReducer, TGamwSelectorActions>(initial)
  .handleAction(actions.setIsLoading, (state, { payload }): TGameSelectorReducer => ({ ...state, isLoading: payload }))
  .handleAction(
    actions.setNoGamesFound,
    (state, { payload }): TGameSelectorReducer => ({ ...state, noGamesFound: payload })
  )
  .handleAction(
    actions.setGamesToShow,
    (state, { payload }): TGameSelectorReducer => ({ ...state, gamesToShow: payload })
  )
  .handleAction(actions.writePageData, (state, { payload }): TGameSelectorReducer => ({ ...state, pageData: payload }))
  .handleAction(
    actions.changePageNumber,
    (state, { payload }): TGameSelectorReducer =>
      produce(state, (draft) => {
        draft.query.page = payload;
      })
  )
  .handleAction(
    actions.setNewOrdering,
    (state, { payload: { ordername, direction } }): TGameSelectorReducer =>
      produce(state, (draft) => {
        draft.query.direction = direction;
        draft.query.ordername = ordername;
      })
  )
  .handleAction(
    actions.changeSearchStrAction,
    (state, { payload }): TGameSelectorReducer =>
      produce(state, (draft) => {
        draft.query.search = payload;
      })
  )
  .handleAction(
    actions.setParsedQueryParams,
    (state, { payload: newParams }): TGameSelectorReducer =>
      produce(state, (draft) => {
        const { query } = draft;
        for (const param in query) {
          //negative cases fallback to default
          if (!newParams[param]) {
            if (param === 'page') {
              query.page = 1;
            } else if (param === 'search') {
              query.search = '';
            } else if (param === 'direction') {
              query.direction = defaultOrdering.direction;
            } else if (param === 'ordername') {
              query.direction = defaultOrdering.direction;
            }
          }
          //postitive cases
          if (newParams[param]) {
            if (param === 'page') {
              query.page = Number(newParams[param]) || 1;
            } else if (param === 'search') {
              query.search = encodeURI(newParams[param] || '');
            } else {
              query[param] = newParams[param];
            }
          }
        }
        draft.searchInputValue = query.search;
      })
  )
  .handleAction(
    actions.setSearchInputValue,
    (state, { payload }): TGameSelectorReducer => ({ ...state, searchInputValue: payload })
  )
  .handleAction(actions.flushGameSelectorStore, ({ query }): TGameSelectorReducer => ({ ...initial, query }));
