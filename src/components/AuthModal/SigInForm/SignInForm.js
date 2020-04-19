import React, { useRef, useState } from 'react';
import styles from './SignInForm.module.scss';
import CloseSvg from '../../UI/LogoSvg/CloseSvg/CloseSvg';
import { showAuthModal } from '../../../actions/actions';
import ButtonNeon from '../../UI/Buttons/ButtonNeon/ButtonNeon';
import Input from '../../UI/Inputs/InputAuth/InputAuth';
import Backend from '../../../Backend/Backend';
import { useDispatch } from 'react-redux';
import { signIn } from '../../../actions/actions';

export default function SignInForm(props) {
  const { toSignUp } = props;
  const [wrongInputs, setWrongInputs] = useState({});
  const dispatch = useDispatch();
  const inputs = useRef({
    username: {
      label: 'Username',
      type: 'text',
      placeholder: 'Type name of your account',
      value: '',
    },
    password: {
      label: 'Password',
      type: 'password',
      placeholder: 'Type your password',
      value: '',
    },
  });

  const validityChecker = (name, value) => {
    if (value.length === 0) {
      wrongListHandler(name, 'length 0');
    } else {
      if (name === 'username') {
        let regex = /^[a-zA-Z0-9]+$/;
        if (!regex.test(value)) {
          wrongListHandler(name, 'set', 'Only numbers and letters allowed');
        } else {
          wrongListHandler(name, 'remove');
        }
      }
      if (name === 'password' || name === 'passConfirm') {
        let regex = /^(?=.*\d).{4,15}$/;
        if (!regex.test(value)) {
          wrongListHandler(
            name,
            'set',
            'Pass must contain at least at least one number and contain between 4 and 15 chars'
          );
        } else {
          wrongListHandler(name, 'remove');
        }
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
    let currentValue = e.target.value;
    inputs.current[name].value = currentValue;
    validityChecker(name, currentValue);
  };

  const sendLoginReq = (sendObj) => {
    Backend.postSignIn(sendObj)
      .then((res) => {
        dispatch(signIn(res.username, res.token));
        localStorage.setItem('token', res.token);
        closeModalHandler();
      })
      .catch((err) => {
        if (err.status === 400 && err.body.field) {
          wrongListHandler(err.body.field, 'set', err.body.err_message);
        }
      });
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
      inputsNames.forEach(
        (name) => (sendObj[name] = inputs.current[name].value)
      );
      sendLoginReq(sendObj);
    }
  };

  const guestEnterHandler = (e) => {
    console.log(e.target);
    e.preventDefault();

    const guestAut = { username: 'guest', password: 'guest1' };
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
              <Input
                {...inputs.current[name]}
                desc={name}
                onChange={changeHandler}
                wrong={wrongInputs[name]}
              />
            </div>
          ))}
        </div>
        <div className={styles.GuestBtnSection}>
          <ButtonNeon
            txtContent={`Continue as Guest`}
            rectangular
            color={'gray'}
            onClick={guestEnterHandler}
          />
        </div>
        <div className={styles.BtnSection}>
          <ButtonNeon
            txtContent={`Sign in`}
            onClick={regularLogin}
            style={{ zIndex: 100 }}
            rectangular
          />
          <ButtonNeon txtContent={`Sign Up`} rectangular onClick={toSignUp} />
        </div>
      </form>
      <div className={styles.CloseSvgWrapper} onClick={closeModalHandler}>
        <CloseSvg />
      </div>
    </div>
  );
}
