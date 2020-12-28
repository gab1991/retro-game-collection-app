import { TGameSelectorReducer, TGamwSelectorActions } from './types';
import { createReducer } from 'typesafe-actions';

import { appConfig } from 'Сonfigs/appConfig';

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
  .handleAction(actions.setIsLoading, (state, { payload }) => ({ ...state, isLoading: payload }))
  .handleAction(actions.setNoGamesFound, (state, { payload }) => ({ ...state, noGamesFound: payload }))
  .handleAction(actions.setGamesToShow, (state, { payload }) => ({ ...state, gamesToShow: payload }))
  .handleAction(actions.writePageData, (state, { payload }) => ({ ...state, pageData: payload }))
  .handleAction(actions.changePageNumber, (state, { payload }) => ({
    ...state,
    query: { ...state.query, page: payload },
  }))
  .handleAction(actions._setNewOrdering, (state, { payload: { ordername, direction } }) => ({
    ...state,
    query: { ...state.query, direction, ordername },
  }))
  .handleAction(actions._changeSearchStr, (state, { payload }) => ({
    ...state,
    query: { ...state.query, search: encodeURI(payload) },
  }))
  .handleAction(actions._changeQueryParams, (state, { payload }) => {
    const newParams = payload;
    const query = { ...state.query };

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
          // bug ts probaly
          query.search = encodeURI(newParams[param] as string);
        } else {
          query[param] = newParams[param];
        }
      }
    }
    return { ...state, query, searchInputValue: query.search };
  })
  .handleAction(actions.setSearchInputValue, (state, { payload }) => ({ ...state, searchInputValue: payload }));
