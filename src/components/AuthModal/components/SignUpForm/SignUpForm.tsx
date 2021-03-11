import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Backend } from 'Backend';
import { useWindowSize } from 'CustomHooks';
import { validate } from 'Validation';

import { ButtonNeon, InputAuth, OvalSpinner, TogglerOptions } from 'Components/UI';
import { CloseSvg } from 'Components/UI/LogoSvg';
import { ECornerNotifierCorners } from 'Components/UI/Modals';
import { showAuthModal, showCornerNotifier } from 'Store/appStateReducer/actions';
import { signUpThunk } from 'Store/authReducer/thunks';

import styles from './SignUpForm.module.scss';
import sassVar from 'Configs/Variables.scss';

const mobileBreakPointWidth = parseInt(sassVar['breakpoints-mobile']);

export function SignUpForm(props): JSX.Element {
  const { backToSignIn } = props;
  const [wrongInputs, setWrongInputs] = useState({});
  const [isSending, setIsSending] = useState(false);
  const { width } = useWindowSize();
  const isMobile = mobileBreakPointWidth > width;
  const dispatch = useDispatch();
  const inputs = useRef({
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
  });

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

  const validityChecker = (name, value) => {
    if (value.length === 0) {
      wrongListHandler(name, 'length 0', '');
    } else {
      if (name === 'username') {
        const isValid = validate('username', value);
        if (isValid) wrongListHandler(name, 'remove', '');
        else wrongListHandler(name, 'set', 'Only numbers and letters allowed');
      }
      if (name === 'password' || name === 'passConfirm') {
        const isValid = validate('password', value);
        if (isValid) wrongListHandler(name, 'remove', '');
        else wrongListHandler(name, 'set', 'Password must contain at least one number and 4 to 15 chars');
      }
      if (name === 'email') {
        const isValid = validate('email', value);
        if (isValid) wrongListHandler(name, 'remove', '');
        else wrongListHandler(name, 'set', 'Wrong email');
      }
    }
  };

  const changeHandler = (e, name) => {
    const currentValue = e.target.value;
    inputs.current[name].value = currentValue;
    validityChecker(name, currentValue);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let entireFormValid = true;
    const inputsNames = Object.keys(inputs.current);
    inputsNames.forEach((name) => {
      if (inputs.current[name].valid === false) {
        entireFormValid = false;
        wrongListHandler(name, 'set', 'fill the field');
      }
    });

    if (inputs.current.password.value !== inputs.current.passConfirm.value) {
      entireFormValid = false;
      wrongListHandler('passConfirm', 'set', 'Passwords must macth');
    }

    if (entireFormValid) {
      const sendObj = { email: '', password: '', username: '' };

      inputsNames.forEach((name) => {
        if (name !== 'passConfirm') sendObj[name] = inputs.current[name].value;
      });

      setIsSending(true);

      dispatch(signUpThunk(sendObj));
      // Backend.postSignUp(sendObj)
      //   .then(() => {
      //     setIsSending(false);
      //     backToSignIn();
      //     if (!isMobile) {
      //       dispatch(
      //         showCornerNotifier({
      //           corner: ECornerNotifierCorners.bottomLeft,
      //           message: 'Account is successfully created',
      //           removeTime: 1000,
      //           show: true,
      //         })
      //       );
      //     }
      //   })
      //   .catch((err) => {
      //     if (err.status === 400 && err.body.field) {
      //       setIsSending(false);
      //       wrongListHandler(err.body.field, 'set', err.body.err_message);
      //     }
      //   });
    }
  };

  const closeModalHandler = () => {
    dispatch(showAuthModal(false));
  };
  return (
    <div className={`${styles.SignUp}`}>
      <h1>Start Your Journey</h1>
      <form onSubmit={submitHandler}>
        <div className={styles.InputsSection}>
          {Object.keys(inputs.current).map((name) => (
            <div key={name} className={styles.InputWrapper}>
              <InputAuth
                {...inputs.current[name]}
                dataDesc={name}
                addToggler={inputs.current[name].type === 'password' ? TogglerOptions['hideShowToggler'] : null}
                onChange={changeHandler}
                wrong={wrongInputs[name]}
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
