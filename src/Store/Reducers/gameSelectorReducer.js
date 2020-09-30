import { appConfig } from '../../Сonfigs/appConfig';

const { defaultOrdering } = appConfig.GameSelector;
const initial = {
  searchInputValue: '',
  isLoading: false,
  noGamesFound: false,
  gamesToShow: [],
  ordering: {
    name: defaultOrdering.name,
    direction: defaultOrdering.direction,
  },
  query: { search: '', params: { page: 1 } },
};

const gameSelectorReducer = (state = initial, { type, payload }) => {
  switch (type) {
    // case 'GET_HISTORY_OBJ':
    //   return { ...state, history: payload };
    case 'SET_IS_LOADING':
      return { ...state, isLoading: payload };
    case 'SET_NO_GAMES_FOUND':
      return { ...state, noGamesFound: payload };
    case 'SET_GAMES_TO_SHOW':
      return { ...state, gamesToShow: payload };
    case 'CACHE_GAME_SELECTOR':
      return { ...state, cache: { ...payload } };
    case 'CHANGE_PAGE': {
      const newPageNum = payload;
      console.log(newPageNum);

      return { ...state };
    }
    case 'UPDATE_QUERY_PARAMS': {
      return {
        ...state,
        query: {
          ...state.query,
          params: { ...state.query.params, ...payload },
        },
      };
    }
    case 'SET_SEARCH_INPUT_VALUE':
      return { ...state, searchInputValue: payload };
    case 'SET_NEW_ORDERING':
      return { ...state, ordering: { ...state.ordering, ...payload } };
    default:
      return state;
  }
};

export default gameSelectorReducer;
