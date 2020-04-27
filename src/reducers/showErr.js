const showHideErr = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_ERR':
      return action.payload;
    case 'HIDE_ERR':
      return false;
    default:
      return state;
  }
};

export default showHideErr;
