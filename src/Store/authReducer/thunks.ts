import { Backend } from 'Backend';

import { TThunk } from 'Store/types';

import { storageHandler } from 'Utils/localStorage';

import { signIn } from './actions';

export const checkCredentials = (): TThunk => async (dispatch) => {
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
