const profileReducer = (state = null, action) => {
  switch (action.type) {
    case 'FILL':
      return action.payload;
    default:
      return state;
  }
};

export default profileReducer;
