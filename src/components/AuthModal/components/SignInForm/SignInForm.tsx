import React, { SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Backend } from 'Backend';

import { ESignInInputs } from 'Components/AuthModal/types';

import { AuthFormSpinner, CloseAuthModal } from 'Components/AuthModal/components';
import { useAuthModalContext } from 'Components/AuthModal/context';
import { ButtonNeon, InputAuth } from 'Components/UI';
import { showAuthModal } from 'Store/appStateReducer/actions';
import { signIn } from 'Store/authReducer/actions';

import styles from './SignInForm.module.scss';

export function SignInForm(props: any): JSX.Element {
  const { toSignUp } = props;
  const dispatch = useDispatch();
  const [isSending, setIsSending] = useState(false);
  const { signInInputChangeHandler, signInInputs, validateSignInInputs, signInErrorCallBack } = useAuthModalContext();

  const sendLoginReq = async ({ username, password }) => {
    setIsSending(true);

    try {
      const {
        data: { token },
      } = await Backend.postSignIn(username, password, signInErrorCallBack);

      if (token && username) {
        dispatch(signIn(username, token));
        closeModalHandler();
      }
    } catch (err) {
    } finally {
      setIsSending(false);
    }
  };

  const regularLogin = (e: SyntheticEvent) => {
    e.preventDefault();

    const entireFormValid = validateSignInInputs();

    if (entireFormValid) {
      const sendObj = { email: '', password: '', username: '' };
      Object.keys(signInInputs).forEach((name) => (sendObj[name] = signInInputs[name].value));
      sendLoginReq(sendObj);
    }
  };

  const guestEnterHandler = () => {
    sendLoginReq({ password: 'guest1', username: 'guest' });
  };

  const closeModalHandler = () => {
    dispatch(showAuthModal(false));
  };

  return (
    <div className={styles.SignIn}>
      <h1>Seen you lately?</h1>
      <form onSubmit={regularLogin}>
        <div className={styles.InputsSection}>
          {Object.keys(signInInputs).map((name) => (
            <div key={name} className={styles.InputWrapper}>
              <InputAuth
                type={signInInputs[name].type}
                placeholder={signInInputs[name].placeholder}
                value={signInInputs[name].value}
                addToggler={signInInputs[name].type === 'password'}
                onChange={(e) => signInInputChangeHandler(e, name as ESignInInputs)}
                wrong={signInInputs[name].errMsg}
                disabled={isSending}
              />
            </div>
          ))}
        </div>
        <div className={styles.GuestBtnSection}>
          <ButtonNeon txtContent={`Continue as Guest`} rectangular color={'gray'} onClick={guestEnterHandler} />
        </div>
        <div className={styles.BtnSection}>
          <ButtonNeon txtContent={`Sign in`} onClick={regularLogin} style={{ zIndex: 100 }} rectangular />
          <ButtonNeon txtContent={`Sign Up`} rectangular onClick={toSignUp} />
        </div>
      </form>
      <CloseAuthModal />
      {isSending && <AuthFormSpinner />}
    </div>
  );
}
