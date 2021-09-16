import { batch } from 'react-redux';
import { api, HttpRespStats, isAxiosError } from 'Api';

import { TThunk } from 'Store/types';

import { flushProfile } from 'Routes/Profile/reducer/actions';
import { storageHandler } from 'Utils/localStorage';

import { logOut, signIn } from './actions';

export const checkCredentialsThunk = (): TThunk => async (dispatch) => {
  try {
    const {
      status,
      data: { username },
    } = await api.checkCredentials();

    if (status === HttpRespStats.success) {
      dispatch(signIn(username));
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
