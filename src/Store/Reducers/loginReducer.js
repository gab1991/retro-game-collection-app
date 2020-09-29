const loginReducer = (state = false, { type, payload }) => {
  switch (type) {
    case 'SIGN_IN':
      return payload;
    default:
      return state;
  }
};

export default loginReducer;
