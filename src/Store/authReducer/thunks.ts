import { batch } from 'react-redux';
import { api, HttpRespStats, isAxiosError } from 'Api';

import { TThunk } from 'Store/types';

import { flushProfile } from 'Routes/Profile/reducer/actions';
import { storageHandler } from 'Utils/localStorage';

import { logOut, signIn } from './actions';

export const checkCredentialsThunk = (): TThunk => async (dispatch) => {
  const { token, username } = storageHandler.getItems(['token', 'username']);
  if (!token || !username) return;

  try {
    const { status } = await api.checkCredentials(token, username);

    if (status === HttpRespStats.success) {
      dispatch(signIn(username, token));
    }
  } catch (err) {
    if (!isAxiosError(err)) {
      return;
    }

    const { status } = err?.response || {};

    if (status === HttpRespStats.badRequest || status === HttpRespStats.unathorized) {
      storageHandler.removeItems(['username', 'token']);
    }
  }
};

export const logOutThunk = (): TThunk => async (dispatch) => {
  storageHandler.removeItems(['username', 'token']);

  batch(() => {
    dispatch(logOut());
    dispatch(flushProfile());
  });
};
