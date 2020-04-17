// const initial = {
//   username: 'gab1',
//   token:
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTczOGE3YTI1ZWRkMjRhZDRmMDk1NTciLCJpYXQiOjE1ODQ3MzIyODd9.FFuXuBiFV48CNC7ZJsWvRVphpSmsYZahyiSwCD3BwQY',
// };

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
