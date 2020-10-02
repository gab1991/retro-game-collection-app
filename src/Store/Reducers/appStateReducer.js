const appStateReducer = (state = { isMobile: false }, { type, payload }) => {
  switch (type) {
    case 'SET_IS_MOBILE':
      return { ...state, isMobile: payload };
    default:
      return state;
  }
};

export default appStateReducer;
