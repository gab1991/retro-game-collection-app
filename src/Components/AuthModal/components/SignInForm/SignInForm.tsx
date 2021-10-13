import React, { SyntheticEvent, useState } from 'react';
import { batch, useDispatch } from 'react-redux';
import { authApi, HttpRespStats, isAxiosError } from 'Api';

import { ESignInInputs, ISignInInput } from 'Components/AuthModal/types';

import { AuthFormSpinner, CloseAuthModalBtn } from 'Components/AuthModal/components';
import { useAuthModalContext } from 'Components/AuthModal/context';
import { ButtonNeon, ClassicInput } from 'Components/UI';
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
    setSignInErrField,
    toSignUp,
  } = useAuthModalContext();

  const sendLoginReq = async ({ username, password }) => {
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
        setSignInErrField(err_message, field);
      }
    } finally {
      setIsSending(false);
    }
  };

  const regularLogin = (e: SyntheticEvent) => {
    // console.log(e.);
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
          <ButtonNeon
            className={styles.NeonBtn}
            txtContent={`Continue as Guest`}
            rectangular
            color={'gray'}
            onClick={guestEnterHandler}
          />
        </div>
        <div className={styles.BtnSection}>
          <ButtonNeon
            className={styles.NeonBtn}
            txtContent={`Sign in`}
            onClick={regularLogin}
            style={{ zIndex: 100 }}
            rectangular
          />
          <ButtonNeon className={styles.NeonBtn} txtContent={`Sign Up`} rectangular onClick={toSignUpLocal} />
        </div>
      </form>
      <CloseAuthModalBtn className={styles.CloseBtn} />
      {isSending && <AuthFormSpinner />}
    </div>
  );
}
