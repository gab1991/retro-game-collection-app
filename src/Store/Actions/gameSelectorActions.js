import { appConfig } from '../../Сonfigs/appConfig';
import Backend from '../../Backend/Backend';
import { history } from '../../index';
import { parseQueryString, stringifyQuery } from '../../Utils/queryStrUtils';

const getHistoryObj = (history) => {
  return {
    type: 'GET_HISTORY_OBJ',
    payload: history,
  };
};

const setIsLoading = (bool) => {
  return {
    type: 'SET_IS_LOADING',
    payload: bool,
  };
};

const setNoGamesFound = (bool) => {
  return {
    type: 'SET_NO_GAMES_FOUND',
    payload: bool,
  };
};

const setGamesToShow = (arrOfGames) => {
  return {
    type: 'SET_GAMES_TO_SHOW',
    payload: arrOfGames,
  };
};

const cacheGameSelector = (data) => {
  return {
    type: 'CACHE_GAME_SELECTOR',
    payload: { ...data },
  };
};

const getGamesForPlatform = (platformName) => {
  return async (dispatch, getState) => {
    const state = getState();
    const { params } = state.gameSelector.query;
    const { ordering } = state.gameSelector;
    const platformID = appConfig.platformIdList[platformName];
    const url = `${history.location.pathname}${history.location.search}`;

    const req = {
      page: params?.page || 1,
      page_size: appConfig.GameSelector.gamesPerRequest,
      ordering: `${ordering.direction === '↓' ? '-' : ''}${ordering.name}`,
      platforms: platformID,
      search: `${params?.search || ' '}`,
    };

    dispatch(setIsLoading(true));

    try {
      const { data } = await Backend.getGamesForPlatform(req);
      dispatch(cacheGameSelector({ ...data, url }));
      dispatch(setIsLoading(false));

      const { results: games } = data;

      if (!games?.length) {
        dispatch(setNoGamesFound(true));
      }
      dispatch(setGamesToShow(games));
    } catch (err) {
      dispatch(setIsLoading(false));
    }
  };
};

const updateQueryParams = (params) => {
  const currentParams = parseQueryString(history.location.search);
  const combinedParams = { ...currentParams, ...params };

  if (combinedParams.page) {
    combinedParams.page = Number(params.page);
  }
  history.push(
    `${history.location.pathname}?${stringifyQuery(combinedParams)}`
  );

  return {
    type: 'UPDATE_QUERY_PARAMS',
    payload: combinedParams,
  };
};

const changePage = (pagenum) => {
  return (dispatch) => {
    dispatch(updateQueryParams({ page: pagenum }));
  };
};

const startNewSearch = (searchStr) => {
  return (dispatch) => {
    dispatch(updateQueryParams({ page: 1, search: searchStr }));
  };
};

const setNewOrdering = (option) => {
  const [ordername, direction] = option.split(' ');
  return (dispatch) => {
    dispatch(updateQueryParams({ ordername, direction }));
    dispatch({
      type: 'SET_NEW_ORDERING',
      payload: {
        name: ordername,
        direction,
      },
    });
  };
};

const parseQueryParams = ({ match }) => {
  const { platformName } = match?.params || {};
  const url = `${history.location.pathname}${history.location.search}`;
  const params = parseQueryString(history.location.search);
  if (params.page) {
    params.page = Number(params.page);
  }
  return (dispatch) => dispatch(updateQueryParams(params));
};

const setSearchInputValue = (value) => {
  return {
    type: 'SET_SEARCH_INPUT_VALUE',
    payload: value,
  };
};

export {
  getGamesForPlatform,
  // getHistoryObj,
  changePage,
  parseQueryParams,
  setSearchInputValue,
  startNewSearch,
  setNewOrdering,
};
