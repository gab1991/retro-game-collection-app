import Backend from '../../Backend/Backend';
import { storageHandler } from '../../Utils/localStorage';

const LOG_OUT = 'LOG_OUT';
const SIGN_IN = 'SIGN_IN';

const logOut = () => {
  storageHandler.removeItems(['username', 'token']);
  return {
    type: LOG_OUT,
  };
};

const signIn = (username, token) => {
  storageHandler.setItems([
    ['username', username],
    ['token', token],
  ]);
  return {
    type: SIGN_IN,
    payload: {
      username,
      token,
    },
  };
};

const checkCredentials = () => async (dispatch) => {
  const { token, username } = storageHandler.getItems(['token', 'username']);
  if (!token || !username) return;

  const { status } = await Backend.checkCredentials(token, username, (err) => {
    const { status } = err?.response || {};

    if (status === 400 || status === 401) {
      storageHandler.removeItems(['username', 'token']);
    }
  });

  if (status === 200) {
    dispatch(signIn(username, token));
  }
};

export { LOG_OUT, SIGN_IN, checkCredentials, logOut, signIn };