import { batch } from 'react-redux';
import { authApi } from 'Api';

import { TThunk } from 'Store/types';

import { flushProfile } from 'Routes/Profile/reducer/actions';

import { logOut, signIn } from './actions';

export const checkCredentialsThunk = (): TThunk => async (dispatch) => {
  try {
    const {
      data: { payload, status },
    } = await authApi.checkCredentials();

    if (status === 'success' && payload) {
      dispatch(signIn(payload.username));
    }
  } catch (err) {}
};

export const logOutThunk = (): TThunk => async (dispatch) => {
  await authApi.logout();

  batch(() => {
    dispatch(logOut());
    dispatch(flushProfile());
  });
};
