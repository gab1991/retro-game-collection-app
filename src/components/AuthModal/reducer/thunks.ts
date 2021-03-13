import { Backend, HttpRespStats } from 'Backend';

import { ISignUpData } from 'Backend/types';
import { TThunk } from 'Store/types';

import { postSignUp } from './actions';

export const signUpThunk = (signUpData: ISignUpData): TThunk => async (dispatch) => {
  dispatch(postSignUp.request());

  const errCb = () => {};
  const {
    data: { user_id },
  } = await Backend.postSignUp(signUpData);
};
