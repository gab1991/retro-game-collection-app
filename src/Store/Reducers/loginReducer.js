const initial = false;

const loggedReducer = (state = initial, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return action.payload;
    default:
      return state;
  }
};

export default loggedReducer;
