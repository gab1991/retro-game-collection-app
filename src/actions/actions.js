const actions = () => {};

const signIn = (username, token) => {
  return {
    type: 'SIGN_IN',
    payload: {
      username,
      token
    }
  };
};

const logOut = message => {
  return {
    type: 'LOG_OUT',
    payload: {
      message: message
    }
  };
};

const profile = profileinfo => {
  return {
    type: 'FILL',
    payload: {
      ...profileinfo
    }
  };
};

export default actions;
export { signIn, profile, logOut };
