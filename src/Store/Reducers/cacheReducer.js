const cacheData = (state = {}, action) => {
  switch (action.type) {
    case 'GAMESELECTOR_CACHE':
      return { ...state, gameSelectorCache: { ...action.payload } };
    default:
      return state;
  }
};

export default cacheData;
