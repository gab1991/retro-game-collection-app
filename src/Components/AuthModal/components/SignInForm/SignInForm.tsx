import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ISignInInput } from 'Components/AuthModal/types';

import { AuthFormSpinner, CloseAuthModalBtn } from 'Components/AuthModal/components';
import { useAuthModalContext } from 'Components/AuthModal/context';
import { ButtonNeon, ClassicInput } from 'Components/UI';
import { selectIsAuthLoading } from 'Store/authReducer/selectors';
import { signInThunk } from 'Store/authReducer/thunks';

import styles from './SignInForm.module.scss';

export function SignInForm(): JSX.Element {
  const { signInInputChangeHandler, signInInputs, validateSignInInputs, toSignUp } = useAuthModalContext();

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsAuthLoading);

  const regularLogin = (e: SyntheticEvent) => {
    e.preventDefault();

    const entireFormValid = validateSignInInputs();

    if (entireFormValid) {
      const sendObj = { password: '', username: '' };

      signInInputs.forEach(({ name, value }) => (sendObj[name] = value));

      dispatch(signInThunk(sendObj.username, sendObj.password));
    }
  };

  const guestEnterHandler = () => dispatch(signInThunk('guest', 'guest1'));

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
        disabled={isLoading}
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
      {isLoading && <AuthFormSpinner />}
    </div>
  );
}
