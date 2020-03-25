const profileReducer = (state = null, action) => {
  switch (action.type) {
    case 'FILL':
      return action.payload;
      break;
    default:
      return state;
  }
};

export default profileReducer;
