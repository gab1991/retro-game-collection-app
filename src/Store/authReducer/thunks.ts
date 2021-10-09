import { batch } from 'react-redux';
import { api } from 'Api';

import { TThunk } from 'Store/types';

import { flushProfile } from 'Routes/Profile/reducer/actions';

import { logOut, signIn } from './actions';

export const checkCredentialsThunk = (): TThunk => async (dispatch) => {
  try {
    const {
      data: { payload, status },
    } = await api.checkCredentials();

    if (status === 'success' && payload) {
      dispatch(signIn(payload.username));
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
