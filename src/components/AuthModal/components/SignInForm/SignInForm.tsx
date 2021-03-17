import React, { SyntheticEvent, useState } from 'react';
import { batch, useDispatch } from 'react-redux';
import { Backend } from 'Backend';

import { AuthFormSpinner, CloseAuthModal } from 'Components/AuthModal/components';
import { useAuthModalContext } from 'Components/AuthModal/context';
import { ButtonNeon, InputAuth } from 'Components/UI';
import { showAuthModal } from 'Store/appStateReducer/actions';
import { signIn } from 'Store/authReducer/actions';

import styles from './SignInForm.module.scss';

export function SignInForm(): JSX.Element {
  const dispatch = useDispatch();
  const [isSending, setIsSending] = useState(false);
  const {
    signInInputChangeHandler,
    signInInputs,
    validateSignInInputs,
    signInErrorCallBack,
    toSignUp,
  } = useAuthModalContext();

  const sendLoginReq = async ({ username, password }) => {
    setIsSending(true);

    try {
      const {
        data: { token },
      } = await Backend.postSignIn(username, password, signInErrorCallBack);

      if (token && username) {
        batch(() => {
          dispatch(signIn(username, token));
          dispatch(showAuthModal(false));
        });
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

      signInInputs.forEach(({ name, value }) => (sendObj[name] = value));

      sendLoginReq(sendObj);
    }
  };

  const guestEnterHandler = () => {
    sendLoginReq({ password: 'guest1', username: 'guest' });
  };

  const toSignUpLocal = (e: SyntheticEvent) => {
    e.preventDefault();
    toSignUp();
  };

  return (
    <div className={styles.SignIn}>
      <h1>Seen you lately?</h1>
      <form onSubmit={regularLogin}>
        <div className={styles.InputsSection}>
          {signInInputs.map((input) => (
            <div key={input.name} className={styles.InputWrapper}>
              <InputAuth
                label={input.label}
                type={input.type}
                placeholder={input.placeholder}
                value={input.value}
                addToggler={input.type === 'password'}
                onChange={(e) => {
                  signInInputChangeHandler(e, input.name);
                }}
                errorMsg={input.errMsg}
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
          <ButtonNeon txtContent={`Sign Up`} rectangular onClick={toSignUpLocal} />
        </div>
      </form>
      <CloseAuthModal />
      {isSending && <AuthFormSpinner />}
    </div>
  );
}
