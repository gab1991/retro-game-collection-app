const actions = () => {};

const signIn = (username, token) => {
  return {
    type: 'SIGN_IN',
    payload: {
      username,
      token,
    },
  };
};

const logOut = (message) => {
  return {
    type: 'LOG_OUT',
    payload: {
      message: message,
    },
  };
};

const profile = (profileinfo) => {
  return {
    type: 'FILL',
    payload: {
      ...profileinfo,
    },
  };
};

const showAuthModal = (bool) => {
  return {
    type: 'SHOW_AUTH',
    payload: bool,
  };
};

const showErrModal = (modalProps) => {
  return {
    type: 'SHOW_ERR',
    payload: { ...modalProps },
  };
};
const hideErrModal = () => {
  return {
    type: 'SHOW_ERR',
    payload: false,
  };
};

export default actions;
export { signIn, profile, logOut, showAuthModal, showErrModal, hideErrModal };
