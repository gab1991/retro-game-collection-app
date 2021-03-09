import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Backend } from 'Backend';
import { validate } from 'Validation';

import { showAuthModal } from '../../../Store/appStateReducer/actions';
import { ButtonNeon, InputAuth, OvalSpinner } from 'Components/UI';
import { CloseSvg } from 'Components/UI/LogoSvg';
import { signIn } from 'Store/authReducer/actions';

import styles from './SignInForm.module.scss';

export default function SignInForm(props) {
  const { toSignUp } = props;
  const [wrongInputs, setWrongInputs] = useState({});
  const dispatch = useDispatch();
  const [isSending, setIsSending] = useState(false);

  const inputs = useRef({
    password: {
      label: 'Password',
      placeholder: 'Type your password',
      type: 'password',
      value: '',
    },
    username: {
      label: 'Username',
      placeholder: 'Type name of your account',
      type: 'text',
      value: '',
    },
  });

  const validityChecker = (name, value) => {
    if (value.length === 0) {
      wrongListHandler(name, 'length 0');
    } else {
      if (name === 'username') {
        const isValid = validate('username', value);
        if (isValid) wrongListHandler(name, 'remove');
        else wrongListHandler(name, 'set', 'Only numbers and letters allowed');
      }
      if (name === 'password') {
        const isValid = validate('password', value);
        if (isValid) wrongListHandler(name, 'remove');
        else
          wrongListHandler(
            name,
            'set',
            'Pass must contain at least at least one number and contain between 4 and 15 chars'
          );
      }
    }
  };

  const wrongListHandler = (name, action, message) => {
    if (action === 'set') {
      inputs.current[name].valid = false;
    } else if (action === 'length 0') {
      inputs.current[name].valid = false;
    } else {
      inputs.current[name].valid = true;
    }
    setWrongInputs((prevState) => {
      const wronginputs = { ...prevState };
      wronginputs[name] = message;
      return wronginputs;
    });
  };

  const changeHandler = (e, name) => {
    console.log(e.target, name);
    const currentValue = e.target.value;
    inputs.current[name].value = currentValue;
    validityChecker(name, currentValue);
  };

  const sendLoginReq = async ({ username, password }) => {
    setIsSending(true);
    try {
      const {
        data: { token },
      } = await Backend.postSignIn(username, password);
      if (token && username) {
        dispatch(signIn(username, token));
      }
      setIsSending(false);
      closeModalHandler();
    } catch (err) {
      // if (err.status === 400 && err.body.field) {
      // wrongListHandler(err.body.field, 'set', err.body.err_message);
      console.log({ err });
      setIsSending(false);
      // }
    }
  };

  const regularLogin = (e) => {
    e.preventDefault();

    let entireFormValid = true;
    const inputsNames = Object.keys(inputs.current);
    inputsNames.forEach((name) => {
      if (inputs.current[name].valid === false) {
        entireFormValid = false;
        wrongListHandler(name, 'set', 'fill the field');
      }
    });

    if (entireFormValid) {
      const sendObj = {};
      inputsNames.forEach((name) => (sendObj[name] = inputs.current[name].value));
      sendLoginReq(sendObj);
    }
  };

  const guestEnterHandler = (e) => {
    e.preventDefault();

    const guestAut = { password: 'guest1', username: 'guest' };
    sendLoginReq(guestAut);
  };

  const keyPressHandler = (e) => {
    if (e.key === 'Enter') regularLogin(e);
  };
  const closeModalHandler = () => {
    dispatch(showAuthModal(false));
  };
  return (
    <div className={styles.SignIn}>
      <h1>Seen you lately?</h1>
      <form onSubmit={regularLogin} onKeyPress={keyPressHandler}>
        <div className={styles.InputsSection}>
          {Object.keys(inputs.current).map((name) => (
            <div key={name} className={styles.InputWrapper}>
              <InputAuth {...inputs.current[name]} dataDesc={name} onChange={changeHandler} wrong={wrongInputs[name]} />
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
      <div className={styles.CloseSvgWrapper} onClick={closeModalHandler}>
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
