import React, { SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import { Backend, HttpRespStats } from 'Backend';

import { ISignUpData } from 'Backend/types';
import { ESignUpInputs, TSignUpInputs } from 'Components/AuthModal/types';

import { useAuthModalContext } from 'Components/AuthModal/context';
import { validateAuthModalInput } from 'Components/AuthModal/validation';
import { ButtonNeon, InputAuth, OvalSpinner } from 'Components/UI';
import { CloseSvg } from 'Components/UI/LogoSvg';
import { ECornerNotifierCorners } from 'Components/UI/Modals';
import { showAuthModal, showCornerNotifier } from 'Store/appStateReducer/actions';

import styles from './SignUpForm.module.scss';

const SIGN_UP_INPUTS: TSignUpInputs = {
  email: {
    label: 'Email',
    placeholder: 'Current email',
    type: 'email',
    valid: false,
    value: '',
  },
  passConfirm: {
    label: 'Confirm Password',
    placeholder: 'Confirm your password once again',
    type: 'password',
    valid: false,
    value: '',
  },
  password: {
    label: 'Password',
    placeholder: 'Type your password',
    type: 'password',
    valid: false,
    value: '',
  },
  username: {
    label: 'Username',
    placeholder: 'Type name of your account',
    type: 'text',
    valid: false,
    value: '',
  },
};

export function SignUpForm(props: any): JSX.Element {
  const dispatch = useDispatch();
  const { isMobile } = useAuthModalContext();
  const { backToSignIn } = props;
  const [isSending, setIsSending] = useState(false);
  const [inputs, setInputs] = useState(SIGN_UP_INPUTS);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>, input: ESignUpInputs) => {
    const currentValue = e.currentTarget.value;

    setInputs((prev) => ({ ...prev, [input]: { ...prev[input], value: currentValue } }));

    const { errMessage, isValid } = validateAuthModalInput(input, currentValue);

    isValid
      ? setInputs((prev) => ({ ...prev, [input]: { ...prev[input], errMsg: '', valid: true } }))
      : setInputs((prev) => ({ ...prev, [input]: { ...prev[input], errMsg: errMessage, valid: false } }));
  };

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();

    let entireFormValid = true;

    const inputsNames = Object.keys(inputs) as Array<ESignUpInputs>;

    inputsNames.forEach((input) => {
      if (!inputs[input].valid) {
        entireFormValid = false;
        setInputs((prev) => ({ ...prev, [input]: { ...prev[input], errMsg: 'Fill this field', valid: false } }));
      }
    });

    if (inputs.password.value !== inputs.passConfirm.value) {
      entireFormValid = false;
      setInputs((prev) => ({
        ...prev,
        passConfirm: { ...prev.passConfirm, errMsg: 'Passwords must match', valid: false },
      }));
    }

    if (entireFormValid) {
      const sendObj = { email: '', password: '', username: '' };

      inputsNames.forEach((name) => {
        if (name !== 'passConfirm') {
          sendObj[name] = inputs[name].value;
        }
      });

      postSignUp(sendObj);
    }
  };

  const postSignUp = async (signUpData: ISignUpData) => {
    setIsSending(true);

    const { data } = await Backend.postSignUp(
      signUpData,
      (err: AxiosError<{ err_message: string; field: ESignUpInputs }>) => {
        if (err.response?.status === HttpRespStats.badRequest && err.response.data.field) {
          const { err_message, field } = err.response.data;
          setInputs((prev) => ({ ...prev, [field]: { ...prev[field], errMsg: err_message, valid: false } }));
        }
      }
    );

    if (data) {
      backToSignIn();
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

  const closeModalHandler = () => {
    dispatch(showAuthModal(false));
  };

  return (
    <div className={`${styles.SignUp}`}>
      <h1>Start Your Journey</h1>
      <form onSubmit={submitHandler}>
        <div className={styles.InputsSection}>
          {Object.keys(inputs).map((name) => (
            <div key={name} className={styles.InputWrapper}>
              <InputAuth
                type={inputs[name].type}
                placeholder={inputs[name].placeholder}
                value={inputs[name].value}
                addToggler={inputs[name].type === 'password'}
                onChange={(e) => changeHandler(e, name as ESignUpInputs)}
                wrong={inputs[name].errMsg}
                disabled={isSending}
              />
            </div>
          ))}
        </div>
        <div className={styles.BtnSection}>
          <ButtonNeon txtContent={`Create Account`} rectangular onClick={submitHandler} />
          <ButtonNeon txtContent={`Back to Sign In`} rectangular onClick={backToSignIn} />
        </div>
      </form>
      <div
        className={styles.CloseSvgWrapper}
        onClick={closeModalHandler}
        onKeyPress={closeModalHandler}
        role={'button'}
        tabIndex={0}
      >
        <CloseSvg />
      </div>
      {isSending && (
        <div className={styles.SendingBackdrop}>
          <div className={styles.OvalSpinnerWrapper}>
            <OvalSpinner />
          </div>
        </div>
      )}
    </div>
  );
}
