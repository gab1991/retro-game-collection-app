const showHideAuth = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_AUTH':
      return action.payload;
    default:
      return state;
  }
};

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

const showHideInfo = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_INFO':
      return action.payload;
    case 'HIDE_INFO':
      return false;
    default:
      return state;
  }
};

const showHideCornerNotifier = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_CORN_NOT':
      return action.payload;
    case 'HIDE_CORN_NOT':
      return { ...state, show: false };
    default:
      return state;
  }
};

export { showHideErr, showHideInfo, showHideAuth, showHideCornerNotifier };
