const profileReducer = (state = null, { type, payload }) => {
  switch (type) {
    case 'FILL_PROFILE':
      return payload;
    default:
      return state;
  }
};

export default profileReducer;
