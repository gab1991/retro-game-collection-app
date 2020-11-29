import { appConfig } from '../../Сonfigs/appConfig';
import Backend from '../../Backend/Backend';
import { history } from '../../index';
import { parseQueryString, stringifyQuery } from '../../Utils/queryStrUtils';

const SET_IS_LOADING = 'SET_IS_LOADING';
const SET_NO_GAMES_FOUND = 'SET_NO_GAMES_FOUND';
const SET_GAMES_TO_SHOW = 'SET_GAMES_TO_SHOW';
const WRITE_PAGE_DATA = 'WRITE_PAGE_DATA';
const CHANGE_PAGE = 'CHANGE_PAGE';
const CHANGE_SEARCH_STR = 'CHANGE_SEARCH_STR';
const SET_NEW_ORDERING = 'SET_NEW_ORDERING';
const CHANGE_QUERY_PARAMS = 'CHANGE_QUERY_PARAMS';
const SET_SEARCH_INPUT_VALUE = 'SET_SEARCH_INPUT_VALUE';

const setIsLoading = (bool) => {
  return {
    type: SET_IS_LOADING,
    payload: bool,
  };
};

const setNoGamesFound = (bool) => {
  return {
    type: SET_NO_GAMES_FOUND,
    payload: bool,
  };
};

const setGamesToShow = (arrOfGames) => {
  return {
    type: SET_GAMES_TO_SHOW,
    payload: arrOfGames,
  };
};

const writePageData = (data) => {
  return {
    type: WRITE_PAGE_DATA,
    payload: { ...data },
  };
};

const getGamesForPlatform = (platformName) => {
  return async (dispatch, getState) => {
    const state = getState();
    const { page, direction, ordername, search } = state.gameSelector.query;
    const platformID = appConfig.platformIdList[platformName];

    const req = {
      page: page || 1,
      page_size: appConfig.GameSelector.gamesPerRequest,
      ordering: `${direction === '↓' ? '-' : ''}${ordername}`,
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

const changePage = (pagenum) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_PAGE,
      payload: pagenum,
    });
    dispatch(updateQueryParams());
  };
};

const changeSearchStr = (str) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_SEARCH_STR,
      payload: str,
    });
    dispatch(updateQueryParams());
  };
};

const startNewSearch = (searchStr) => {
  return (dispatch) => {
    dispatch(changeSearchStr(searchStr));
    dispatch(changePage(1));
    dispatch(updateQueryParams());
  };
};

const setNewOrdering = (option) => {
  const [ordername, direction] = option.split(' ');
  return (dispatch) => {
    dispatch({
      type: SET_NEW_ORDERING,
      payload: {
        ordername,
        direction,
      },
    });
    dispatch(updateQueryParams());
  };
};

const updateQueryParams = () => {
  return (dispatch, getstate) => {
    const state = getstate();
    const { query } = state.gameSelector;
    history.push(`${history.location.pathname}?${stringifyQuery(query)}`);
  };
};

const parseQueryParams = (searchStr = {}) => {
  return (dispatch) => {
    const currentParams = parseQueryString(searchStr);
    dispatch({
      type: CHANGE_QUERY_PARAMS,
      payload: currentParams,
    });
  };
};

const setSearchInputValue = (value) => {
  return {
    type: SET_SEARCH_INPUT_VALUE,
    payload: value,
  };
};

export { getGamesForPlatform, changePage, parseQueryParams, setSearchInputValue, startNewSearch, setNewOrdering };

export {
  SET_IS_LOADING,
  SET_NO_GAMES_FOUND,
  SET_GAMES_TO_SHOW,
  WRITE_PAGE_DATA,
  CHANGE_PAGE,
  CHANGE_SEARCH_STR,
  SET_NEW_ORDERING,
  CHANGE_QUERY_PARAMS,
  SET_SEARCH_INPUT_VALUE,
};
