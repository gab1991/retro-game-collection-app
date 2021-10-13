import React, { SyntheticEvent, useState } from 'react';
import { batch, useDispatch } from 'react-redux';
import { authApi, isAxiosError } from 'Api';

import { HttpRespStats, ISignUpData } from 'Api/types';
import { ESignUpInputs, ISignUpInput } from 'Components/AuthModal/types';

import { AuthFormSpinner, CloseAuthModalBtn } from 'Components/AuthModal/components';
import { useAuthModalContext } from 'Components/AuthModal/context';
import { ButtonNeon, ClassicInput } from 'Components/UI';
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

  const renderInput = (input: ISignUpInput) => {
    const ClassicInputComp = input.type === 'password' ? ClassicInput.InputWithToggler : ClassicInput.Input;

    return (
      <ClassicInputComp
        type={input.type}
        placeholder={input.placeholder}
        onChange={(e) => signUpInputChangeHandler(e, input.name)}
        value={input.value}
        disabled={isSending}
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
      {isSending && <AuthFormSpinner />}
    </div>
  );
}
