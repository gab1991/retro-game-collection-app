import React, { SyntheticEvent } from 'react';

import { ISignInInput } from 'Components/AuthModal/types';

import { AuthFormSpinner, CloseAuthModalBtn } from 'Components/AuthModal/components';
import { useAuthModalContext } from 'Components/AuthModal/context';
import { useLoginReq } from 'Components/AuthModal/hooks';
import { ButtonNeon, ClassicInput } from 'Components/UI';

import styles from './SignInForm.module.scss';

export function SignInForm(): JSX.Element {
  const {
    signInInputChangeHandler,
    signInInputs,
    validateSignInInputs,
    setSignInErrField,
    toSignUp,
  } = useAuthModalContext();
  const { isSending, sendLoginReq } = useLoginReq({ onFieldErr: setSignInErrField });

  const regularLogin = (e: SyntheticEvent) => {
    e.preventDefault();

    const entireFormValid = validateSignInInputs();

    if (entireFormValid) {
      const sendObj = { password: '', username: '' };

      signInInputs.forEach(({ name, value }) => (sendObj[name] = value));

      sendLoginReq(sendObj.username, sendObj.password);
    }
  };

  const guestEnterHandler = () => sendLoginReq('guest', 'guest1');

  const toSignUpLocal = (e: SyntheticEvent) => {
    e.preventDefault();
    toSignUp();
  };

  const renderInput = (input: ISignInInput) => {
    const ClassicInputComp = input.type === 'password' ? ClassicInput.InputWithToggler : ClassicInput.Input;

    return (
      <ClassicInputComp
        type={input.type}
        placeholder={input.placeholder}
        onChange={(e) => signInInputChangeHandler(e, input.name)}
        value={input.value}
        disabled={isSending}
        isError={!!input.errMsg}
        hintText={input.errMsg}
      />
    );
  };

  return (
    <div className={styles.SignIn}>
      <h1>Seen you lately?</h1>
      <form onSubmit={regularLogin}>
        <div className={styles.InputsSection}>
          {signInInputs.map((input) => (
            <ClassicInput.Label key={input.name} onClick={(e) => e.preventDefault()}>
              {input.label}
              {renderInput(input)}
            </ClassicInput.Label>
          ))}
        </div>
        <div className={styles.GuestBtnSection}>
          <ButtonNeon className={styles.NeonBtn} rectangular color='gray' onClick={guestEnterHandler}>
            Continue as Guest
          </ButtonNeon>
        </div>
        <div className={styles.BtnSection}>
          <ButtonNeon className={styles.NeonBtn} onClick={regularLogin} rectangular>
            Sign in
          </ButtonNeon>
          <ButtonNeon className={styles.NeonBtn} rectangular onClick={toSignUpLocal}>
            Sign Up
          </ButtonNeon>
        </div>
      </form>
      <CloseAuthModalBtn className={styles.CloseBtn} />
      {isSending && <AuthFormSpinner />}
    </div>
  );
}
