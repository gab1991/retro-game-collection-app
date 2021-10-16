import { batch } from 'react-redux';
import { authApi, HttpRespStats, isAxiosError, ISignUpData } from 'Api';

import { ESignInInputs, ESignUpInputs } from 'Components/AuthModal/types';
import { TThunk } from 'Store/types';

import { ECornerNotifierCorners } from 'Components/UI/Modals';
import { flushProfile } from 'Routes/Profile/reducer/actions';
import { showAuthModal, showCornerNotifier } from 'Store/appStateReducer/actions';
import { selectIsMobile } from 'Store/appStateReducer/selectors';

import { logOut, signIn, signUp } from './actions';

export const checkCredentialsThunk = (): TThunk => async (dispatch) => {
  try {
    const {
      data: { payload, status },
    } = await authApi.checkCredentials();

    if (status === 'success' && payload) {
      dispatch(signIn.success(payload.username));
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

export const signUpThunk = (signUpData: ISignUpData): TThunk => async (dispatch, getStore) => {
  const store = getStore();
  const isMobile = selectIsMobile(store);

  dispatch(signUp.request());

  try {
    const {
      data: { status },
    } = await authApi.postSignUp(signUpData);

    if (status === 'success') {
      batch(() => {
        dispatch(signUp.success(signUpData.username));
        dispatch(showAuthModal(false));
        !isMobile &&
          dispatch(
            showCornerNotifier({
              corner: ECornerNotifierCorners.bottomLeft,
              message: 'Account is successfully created',
              removeTime: 1000,
              show: true,
            })
          );
      });
    }
  } catch (err) {
    if (
      isAxiosError<{ err_message: string; field: ESignUpInputs }>(err) &&
      err.response?.status === HttpRespStats['Bad Request'] &&
      err.response.data.field
    ) {
      const { err_message, field } = err.response.data;
      dispatch(signUp.failure({ err: err_message, field }));
    }
  }
};

export const signInThunk = (username: string, password: string): TThunk => async (dispatch) => {
  dispatch(signIn.request());

  try {
    const {
      data: { status },
    } = await authApi.postSignIn(username, password);

    if (status === 'success') {
      batch(() => {
        dispatch(signIn.success(username));
        dispatch(showAuthModal(false));
      });
    }
  } catch (err) {
    if (
      isAxiosError<{ err_message: string; field: ESignInInputs }>(err) &&
      err.response?.status === HttpRespStats['Bad Request'] &&
      err.response.data.field
    ) {
      const { err_message, field } = err.response.data;
      dispatch(signIn.failure({ err: err_message, field }));
    }
  }
};
