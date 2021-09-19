import { batch } from 'react-redux';
import { api, HttpRespStats } from 'Api';

import { TThunk } from 'Store/types';

import { flushProfile } from 'Routes/Profile/reducer/actions';

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
  } catch (err) {}
};

export const logOutThunk = (): TThunk => async (dispatch) => {
  await api.logout();

  batch(() => {
    dispatch(logOut());
    dispatch(flushProfile());
  });
};
