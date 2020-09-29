import Backend from '../../Backend/Backend';
import { storageHandler } from '../../Utils/localStorage';

const logOut = () => {
  storageHandler.removeItems(['username', 'token']);
  return {
    type: 'LOG_OUT',
  };
};

const signIn = (username, token) => {
  storageHandler.setItems([
    ['username', username],
    ['token', token],
  ]);
  return {
    type: 'SIGN_IN',
    payload: {
      username,
      token,
    },
  };
};

const checkCredentials = () => async (dispatch) => {
  const { token, username } = storageHandler.getItems(['token', 'username']);
  if (!token || !username) return;

  try {
    const { status } = await Backend.checkCredentials(token, username);

    if (status === 200) {
      dispatch(signIn(username, token));
    }
  } catch (err) {
    const { status } = err?.response || {};

    if (status === 400 || status === 401) {
      storageHandler.removeItems(['username', 'token']);
    } else {
      console.log(err);
    }
  }
};

export { checkCredentials, logOut, signIn };
