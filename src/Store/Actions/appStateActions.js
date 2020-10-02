const setIsMobile = (bool) => {
  return {
    type: 'SET_IS_MOBILE',
    payload: bool,
  };
};

export { setIsMobile };
