import React, { SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Backend } from 'Backend';

import { ISignUpData } from 'Backend/types';

import { AuthFormSpinner, CloseAuthModal } from 'Components/AuthModal/components';
import { useAuthModalContext } from 'Components/AuthModal/context';
import { ButtonNeon, InputAuth } from 'Components/UI';
import { ECornerNotifierCorners } from 'Components/UI/Modals';
import { showCornerNotifier } from 'Store/appStateReducer/actions';

import styles from './SignUpForm.module.scss';

export function SignUpForm(): JSX.Element {
  const dispatch = useDispatch();
  const {
    isMobile,
    toSignIn,
    signUpInputs,
    signUpInputChangeHandler,
    validateSignUpInputs,
    signUpErrorCallBack,
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

    const { data } = await Backend.postSignUp(signUpData, signUpErrorCallBack);

    if (data) {
      toSignIn();
      !isMobile &&
        dispatch(
          showCornerNotifier({
            corner: ECornerNotifierCorners.bottomLeft,
            message: 'Account is successfully created',
            removeTime: 1000,
            show: true,
          })
        );
    }

    setIsSending(false);
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
          <ButtonNeon txtContent={`Create Account`} rectangular onClick={submitHandler} />
          <ButtonNeon txtContent={`Back to Sign In`} rectangular onClick={toSignInLocal} />
        </div>
      </form>
      <CloseAuthModal />
      {isSending && <AuthFormSpinner />}
    </div>
  );
}
