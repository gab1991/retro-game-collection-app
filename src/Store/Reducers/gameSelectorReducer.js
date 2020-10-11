import { appConfig } from '../../Сonfigs/appConfig';
import {
  SET_IS_LOADING,
  SET_NO_GAMES_FOUND,
  SET_GAMES_TO_SHOW,
  WRITE_PAGE_DATA,
  CHANGE_PAGE,
  CHANGE_SEARCH_STR,
  SET_NEW_ORDERING,
  CHANGE_QUERY_PARAMS,
  SET_SEARCH_INPUT_VALUE,
} from '../Actions/gameSelectorActions';

const { defaultOrdering } = appConfig.GameSelector;
const initial = {
  searchInputValue: '',
  isLoading: false,
  noGamesFound: false,
  gamesToShow: [],
  query: {
    page: 1,
    search: '',
    ordername: defaultOrdering.name,
    direction: defaultOrdering.direction,
  },
};

const gameSelectorReducer = (state = initial, { type, payload }) => {
  switch (type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: payload };
    case SET_NO_GAMES_FOUND:
      return { ...state, noGamesFound: payload };
    case SET_GAMES_TO_SHOW:
      return { ...state, gamesToShow: payload };
    case WRITE_PAGE_DATA:
      return { ...state, pageData: { ...payload } };
    case CHANGE_PAGE: {
      let newPageNum = Number(payload);
      if (!newPageNum) newPageNum = 1;
      return { ...state, query: { ...state.query, page: newPageNum } };
    }
    case SET_NEW_ORDERING: {
      const { ordername, direction } = payload || {};
      const query = { ...state.query };
      query.ordername = ordername;
      query.direction = direction;
      return { ...state, query };
    }
    case CHANGE_SEARCH_STR: {
      const str = payload;
      const query = { ...state.query };
      query.search = encodeURI(str);
      return { ...state, query };
    }
    case CHANGE_QUERY_PARAMS: {
      const newParams = payload;
      const query = { ...state.query };

      for (let param in query) {
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
            query.search = encodeURI(newParams[param]);
          } else {
            query[param] = newParams[param];
          }
        }
      }
      return { ...state, query, searchInputValue: query.search };
    }
    case SET_SEARCH_INPUT_VALUE:
      return { ...state, searchInputValue: payload };

    default:
      return state;
  }
};

export default gameSelectorReducer;
