import React, { SyntheticEvent, useState } from 'react';
import { batch, useDispatch } from 'react-redux';
import { authApi, isAxiosError } from 'Api';

import { HttpRespStats, ISignUpData } from 'Api/types';
import { ESignUpInputs } from 'Components/AuthModal/types';

import { AuthFormSpinner, CloseAuthModalBtn } from 'Components/AuthModal/components';
import { useAuthModalContext } from 'Components/AuthModal/context';
import { ButtonNeon, InputAuth } from 'Components/UI';
import { ECornerNotifierCorners } from 'Components/UI/Modals';
import { showAuthModal, showCornerNotifier } from 'Store/appStateReducer/actions';
import { signIn } from 'Store/authReducer/actions';

import styles from './SignUpForm.module.scss';

export function SignUpForm(): JSX.Element {
  const dispatch = useDispatch();
  const {
    isMobile,
    toSignIn,
    signUpInputs,
    signUpInputChangeHandler,
    validateSignUpInputs,
    setSignUpErrField,
  } = useAuthModalContext();
  const [isSending, setIsSending] = useState(false);

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();

    const entireFormValid = validateSignUpInputs();

    if (entireFormValid) {
      const sendObj = { email: '', password: '', username: '' };

      signUpInputs.forEach(({ name, value }) => {
        if (name === 'passConfirm') return;
        sendObj[name] = value;
      });

      postSignUp(sendObj);
    }
  };

  const postSignUp = async (signUpData: ISignUpData) => {
    setIsSending(true);

    try {
      const {
        data: { status },
      } = await authApi.postSignUp(signUpData);

      if (status === 'success') {
        batch(() => {
          dispatch(signIn(signUpData.username));
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

        setSignUpErrField(err_message, field);
      }
    } finally {
      setIsSending(false);
    }
  };

  const toSignInLocal = (e: SyntheticEvent) => {
    e.preventDefault();
    toSignIn();
  };

  return (
    <div className={`${styles.SignUp}`}>
      <h1>Start Your Journey</h1>
      <form onSubmit={submitHandler}>
        <div className={styles.InputsSection}>
          {signUpInputs.map((input) => (
            <div key={input.name} className={styles.InputWrapper}>
              <InputAuth
                label={input.label}
                type={input.type}
                placeholder={input.placeholder}
                value={input.value}
                addToggler={input.type === 'password'}
                onChange={(e) => signUpInputChangeHandler(e, input.name)}
                errorMsg={input.errMsg}
                disabled={isSending}
              />
            </div>
          ))}
        </div>
        <div className={styles.BtnSection}>
          <ButtonNeon rectangular onClick={submitHandler}>
            Create Account
          </ButtonNeon>
          <ButtonNeon rectangular onClick={toSignInLocal}>
            Back to Sign In
          </ButtonNeon>
        </div>
      </form>
      <CloseAuthModalBtn />
      {isSending && <AuthFormSpinner />}
    </div>
  );
}
