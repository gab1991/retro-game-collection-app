const showHideAuth = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_AUTH':
      return action.payload;
    default:
      return state;
  }
};

export default showHideAuth;
