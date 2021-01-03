import { createAction } from 'typesafe-actions';

import { storageHandler } from 'Utils/localStorage';

export const signIn = createAction('auth/signIn', (username: string, token: string) => {
  storageHandler.setItems([
    ['username', username],
    ['token', token],
  ]);
  return { token, username };
})();

export const logOut = createAction('auth/logOut', (username: string, token: string) => {
  storageHandler.removeItems(['username', 'token']);
  return { token, username };
})();

// import Backend from '../../Backend/Backend';
// import { storageHandler } from '../../Utils/localStorage';

// const LOG_OUT = 'LOG_OUT';
// const SIGN_IN = 'SIGN_IN';

// const logOut = () => {
//   storageHandler.removeItems(['username', 'token']);
//   return {
//     type: LOG_OUT,
//   };
// };

// const signIn = (username, token) => {
//   storageHandler.setItems([
//     ['username', username],
//     ['token', token],
//   ]);
//   return {
//     payload: {
//       token,
//       username,
//     },
//     type: SIGN_IN,
//   };
// };

// const checkCredentials = () => async (dispatch) => {
//   const { token, username } = storageHandler.getItems(['token', 'username']);
//   if (!token || !username) return;

//   const { status } = await Backend.checkCredentials(token, username, (err) => {
//     const { status } = err?.response || {};

//     if (status === 400 || status === 401) {
//       storageHandler.removeItems(['username', 'token']);
//     }
//   });

//   if (status === 200) {
//     dispatch(signIn(username, token));
//   }
// };

// export { checkCredentials, LOG_OUT, logOut, SIGN_IN, signIn };
