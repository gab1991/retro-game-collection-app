import { useState } from 'react';
import { batch, useDispatch } from 'react-redux';
import { authApi, HttpRespStats, isAxiosError } from 'Api';

import { ESignInInputs } from 'Components/AuthModal/types';

import { showAuthModal } from 'Store/appStateReducer/actions';
import { signIn } from 'Store/authReducer/actions';

interface IUseLoginReqProps {
  onFieldErr?: (errMessage: string, field: ESignInInputs) => void;
}

interface IUseLoginReq {
  isSending: boolean;
  sendLoginReq: (username: string, password: string) => Promise<void>;
}

export const useLoginReq = ({ onFieldErr }: IUseLoginReqProps): IUseLoginReq => {
  const [isSending, setIsSending] = useState(false);
  const dispatch = useDispatch();

  const sendLoginReq = async (username: string, password: string) => {
    setIsSending(true);

    try {
      const {
        data: { status },
      } = await authApi.postSignIn(username, password);

      if (status === 'success') {
        batch(() => {
          dispatch(signIn(username));
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
        onFieldErr && onFieldErr(err_message, field);
      }
    } finally {
      setIsSending(false);
    }
  };

  return { isSending, sendLoginReq };
};
