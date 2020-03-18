import React, { useState, useRef } from 'react';
import styles from './SignUpForm.css';
import ButtonNeon from '../../UI/Buttons/ButtonNeon/ButtonNeon';
import Input from '../../UI/Inputs/InputAuth/InputAuth';

export default function SignUpForm(props) {
  const { backToSignIn } = props;
  const [wrongInputs, setWrongInputs] = useState({});

  const inputs = useRef({
    username: {
      label: 'Username',
      type: 'text',
      placeholder: 'Type name of your account',
      value: '',
      valid: false
    },
    password: {
      label: 'Password',
      type: 'text',
      placeholder: 'Type your password',
      value: '',
      valid: false
    },
    passConfirm: {
      label: 'Confirm Password',
      type: 'text',
      placeholder: 'Confirm your password once again',
      value: '',
      valid: false
    },
    email: {
      label: 'Email',
      type: 'email',
      placeholder: 'Current email',
      value: '',
      valid: false
    }
  });

  const wrongListHandler = (name, action, message) => {
    // console.log(name);
    const updated = { ...wrongInputs };
    if (action === 'set') {
      updated[name] = message;
      inputs.current[name].valid = false;
      console.log(updated);
    } else {
      updated[name] = false;
      inputs.current[name].valid = true;
    }
    setWrongInputs(updated);
  };

  const validityChecker = (name, value) => {
    if (value.length === 0) {
      wrongListHandler(name, 'remove');
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
      if (name === 'email') {
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(value)) {
          wrongListHandler(name, 'set', 'Wrong email');
        } else {
          wrongListHandler(name, 'remove');
        }
      }
    }
  };

  const changeHandler = (e, name) => {
    let currentValue = e.target.value;
    inputs.current[name].value = currentValue;
    validityChecker(name, currentValue);
  };

  const submitHandler = e => {
    e.preventDefault();

    let entireFormValid = true;
    const inputsNames = Object.keys(inputs.current);
    inputsNames.forEach(name => {
      if (inputs.current[name].valid == false) {
        entireFormValid = false;
        wrongListHandler(name, 'set', 'fill the field');
      }
    });

    if (entireFormValid) {
      const sendObj = {};
      inputsNames.forEach(name => (sendObj[name] = inputs.current[name].value));
      // console.log(sendObj);s
    }
  };

  return (
    <div className={styles.SignUp}>
      <h1>Start Your Journey</h1>
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
        <div className={styles.BtnSection}>
          <ButtonNeon
            txtContent={`Create Account`}
            rectangular
            onClick={submitHandler}
          />
          <ButtonNeon
            txtContent={`Back to Sign In`}
            rectangular
            onClick={backToSignIn}
          />
        </div>
      </form>
    </div>
  );
}
