import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ISignUpInput } from 'Components/AuthModal/types';

import { AuthFormSpinner, CloseAuthModalBtn } from 'Components/AuthModal/components';
import { useAuthModalContext } from 'Components/AuthModal/context';
import { ButtonNeon, ClassicInput } from 'Components/UI';
import { selectIsAuthLoading } from 'Store/authReducer/selectors';
import { signUpThunk } from 'Store/authReducer/thunks';

import styles from './SignUpForm.module.scss';

export function SignUpForm(): JSX.Element {
  const { toSignIn, signUpInputs, signUpInputChangeHandler, validateSignUpInputs } = useAuthModalContext();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsAuthLoading);

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();

    const entireFormValid = validateSignUpInputs();

    if (entireFormValid) {
      const sendObj = { email: '', password: '', username: '' };

      signUpInputs.forEach(({ name, value }) => {
        if (name === 'passConfirm') return;
        sendObj[name] = value;
      });

      dispatch(signUpThunk(sendObj));
    }
  };

  const toSignInLocal = (e: SyntheticEvent) => {
    e.preventDefault();
    toSignIn();
  };

  const renderInput = (input: ISignUpInput) => {
    const ClassicInputComp = input.type === 'password' ? ClassicInput.InputWithToggler : ClassicInput.Input;

    return (
      <ClassicInputComp
        type={input.type}
        placeholder={input.placeholder}
        onChange={(e) => signUpInputChangeHandler(e, input.name)}
        value={input.value}
        disabled={isLoading}
        isError={!!input.errMsg}
        hintText={input.errMsg}
      />
    );
  };

  return (
    <div className={styles.SignUp}>
      <h1>Start Your Journey</h1>
      <form onSubmit={submitHandler}>
        <div className={styles.InputsSection}>
          {signUpInputs.map((input) => (
            <ClassicInput.Label key={input.name} onClick={(e) => e.preventDefault()}>
              {input.label}
              {renderInput(input)}
            </ClassicInput.Label>
          ))}
        </div>
        <div className={styles.BtnSection}>
          <ButtonNeon className={styles.NeonBtn} rectangular onClick={submitHandler}>
            Create Account
          </ButtonNeon>
          <ButtonNeon className={styles.NeonBtn} rectangular onClick={toSignInLocal}>
            Back to Sign In
          </ButtonNeon>
        </div>
      </form>
      <CloseAuthModalBtn className={styles.CloseBtn} />
      {isLoading && <AuthFormSpinner />}
    </div>
  );
}
