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

const profile = profileinfo => {
  return {
    type: 'FILL',
    payload: {
      ...profileinfo
    }
  };
};

export default actions;
export { signIn, profile };
