// const signIn = (username, token) => {
//   localStorage.setItem('username', username);
//   localStorage.setItem('token', token);
//   return {
//     type: 'SIGN_IN',
//     payload: {
//       username,
//       token,
//     },
//   };
// };

// const profile = (profileinfo) => {
//   return {
//     type: 'FILL',
//     payload: {
//       ...profileinfo,
//     },
//   };
// };

const removeGameFromList = (list, platform, gameName) => {
  return {
    type: 'REMOVE_GAME_FROM_LIST',
    payload: {
      list: list,
      platform: platform,
      gameName: gameName,
    },
  };
};

const showAuthModal = (bool) => {
  return {
    type: 'SHOW_AUTH',
    payload: bool,
  };
};

const showInfoModal = (modalProps) => {
  return {
    type: 'SHOW_INFO',
    payload: { ...modalProps },
  };
};
const hideInfoModal = () => {
  return {
    type: 'SHOW_INFO',
    payload: false,
  };
};

const showCornerNotifier = (modalProps) => {
  return {
    type: 'SHOW_CORN_NOT',
    payload: { ...modalProps },
  };
};
const hideCornerNotifier = () => {
  return {
    type: 'HIDE_CORN_NOT',
    payload: false,
  };
};

const cacheGameSelector = (data) => {
  return {
    type: 'GAMESELECTOR_CACHE',
    payload: { ...data },
  };
};

export {
  // signIn,
  // profile,
  // logOut,
  showAuthModal,
  // showErrModal,
  // hideErrModal,
  cacheGameSelector,
  showInfoModal,
  hideInfoModal,
  showCornerNotifier,
  hideCornerNotifier,
  removeGameFromList,
};
