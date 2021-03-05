import { Backend } from 'Backend';

import { ISetNewOrdering } from './types';
import { TThunk } from 'Store/types';

import { appConfig } from '../../../Configs/appConfig';
import { history } from '../../../index';
import { parseQueryString, stringifyQuery } from '../../../Utils/queryStrUtils';

import {
  _changeQueryParams,
  _changeSearchStr,
  _setNewOrdering,
  changePageNumber,
  setGamesToShow,
  setIsLoading,
  setNoGamesFound,
  writePageData,
} from './actions';

export const getGamesForPlatform = (platformName: string): TThunk => {
  return async (dispatch, getState) => {
    const state = getState();
    const { page, direction, ordername, search } = state.gameSelector.query;
    const platformID = appConfig.platformIdList[platformName];

    const req = {
      ordering: `${direction === '↓' ? '-' : ''}${ordername}`,
      page: page || 1,
      page_size: appConfig.GameSelector.gamesPerRequest,
      platforms: platformID,
      search: `${search || ' '}`,
    };

    dispatch(setIsLoading(true));

    const { data } = await Backend.getGamesForPlatform(req, () => {
      //error handling cb
      dispatch(setIsLoading(false));
    });
    dispatch(writePageData({ ...data }));
    dispatch(setIsLoading(false));

    const { results: games } = data;
    if (!games?.length) {
      dispatch(setNoGamesFound(true));
    } else {
      dispatch(setNoGamesFound(false));
    }

    dispatch(setGamesToShow(games));
  };
};

export const changePage = (pagenum: number): TThunk => {
  return (dispatch) => {
    dispatch(changePageNumber(pagenum));
    dispatch(updateQueryParams());
  };
};

export const changeSearchStr = (str: string): TThunk => {
  return (dispatch) => {
    dispatch(_changeSearchStr(str));
    dispatch(updateQueryParams());
  };
};

export const startNewSearch = (searchStr: string): TThunk => {
  return (dispatch) => {
    dispatch(changeSearchStr(searchStr));
    dispatch(changePage(1));
    dispatch(updateQueryParams());
  };
};

export const setNewOrdering = (option: string): TThunk => {
  const [ordername, direction] = option.split(' ');
  return (dispatch) => {
    dispatch(_setNewOrdering({ direction, ordername } as ISetNewOrdering));
    dispatch(updateQueryParams());
  };
};

export const updateQueryParams = (): TThunk => {
  return (dispatch, getstate) => {
    const state = getstate();
    const { query } = state.gameSelector;
    history.push(`${history.location.pathname}?${stringifyQuery(query)}`);
  };
};

export const parseQueryParams = (searchStr: string): TThunk => {
  return (dispatch) => {
    const currentParams = parseQueryString(searchStr);

    dispatch(_changeQueryParams(currentParams));
  };
};
