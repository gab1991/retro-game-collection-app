import React, { useRef, useState } from 'react';
import styles from './SignInForm.css';
import ButtonNeon from '../../UI/Buttons/ButtonNeon/ButtonNeon';
import Input from '../../UI/Inputs/InputAuth/InputAuth';

export default function SignInForm(props) {
  const { toSignUp } = props;
  const [wrongInputs, setWrongInputs] = useState({});
  const inputs = useRef({
    username: {
      label: 'Username',
      type: 'text',
      placeholder: 'Type name of your account',
      value: ''
    },
    password: {
      label: 'Password',
      type: 'password',
      placeholder: 'Type your password',
      value: ''
    }
  });

  const wrongListHandler = (name, action, message) => {
    if (action === 'set') {
      inputs.current[name].valid = false;
    } else if (action === 'length 0') {
      inputs.current[name].valid = false;
    } else {
      inputs.current[name].valid = true;
    }
    setWrongInputs(prevState => {
      const wronginputs = { ...prevState };
      wronginputs[name] = message;
      return wronginputs;
    });
  };

  const validityChecker = (name, value) => {};

  const submitHandler = e => {
    e.preventDefault();

    const sendObj = {};
    const inputsNames = Object.keys(inputs.current);
    inputsNames.forEach(name => (sendObj[name] = inputs.current[name].value));

    console.log(sendObj);
  };

  const changeHandler = (e, name) => {
    let currentValue = e.target.value;
    inputs.current[name].value = currentValue;
    validityChecker(name, currentValue);
  };

  return (
    <div className={styles.SignIn}>
      <h1>Seen you lately?</h1>
      <form onSubmit={submitHandler}>
        {Object.keys(inputs.current).map(name => (
          <div>
            <Input
              {...inputs.current[name]}
              desc={name}
              onChange={changeHandler}
              wrong={wrongInputs[name]}
            />
          </div>
        ))}
        <div>
          <ButtonNeon txtContent={`Continue as Guest`} rectangular blinking />
        </div>
        <div className={styles.BtnSection}>
          <ButtonNeon txtContent={`Sign in`} rectangular />
          <ButtonNeon txtContent={`Sign Up`} rectangular onClick={toSignUp} />
        </div>
      </form>
    </div>
  );
}
