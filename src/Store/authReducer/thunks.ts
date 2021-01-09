import { batch } from 'react-redux';
import { Backend, HttpRespStats } from 'Backend';

import { TThunk } from 'Store/types';

import { flushProfile } from 'Store/profileReducer/actions';
import { storageHandler } from 'Utils/localStorage';

import { logOut, signIn } from './actions';

export const checkCredentials = (): TThunk => async (dispatch) => {
  const { token, username } = storageHandler.getItems(['token', 'username']);
  if (!token || !username) return;

  const { status } = await Backend.checkCredentials(token, username, (err) => {
    const { status } = err?.response || {};

    if (status === HttpRespStats.badRequest || status === HttpRespStats.unathorized) {
      storageHandler.removeItems(['username', 'token']);
    }
  });

  if (status === HttpRespStats.success) {
    dispatch(signIn(username, token));
  }
};

export const logOutThunk = (): TThunk => async (dispatch) => {
  storageHandler.removeItems(['username', 'token']);

  batch(() => {
    dispatch(logOut());
    dispatch(flushProfile());
  });
};
