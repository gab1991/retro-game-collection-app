import React from 'react';
import styles from './SignInForm.css';
import ButtonNeon from '../../UI/Buttons/ButtonNeon/ButtonNeon';

export default function SignInForm(props) {
  const { toSignUp } = props;
  const inputs = [
    {
      desc: 'Username',
      type: 'text',
      placeholder: 'Type name of your account'
    },
    {
      desc: 'Password',
      type: 'text',
      placeholder: 'Type your password here'
    },
    {
      desc: 'Password',
      type: 'text',
      placeholder: 'Type your password here'
    }
  ];

  const submitHandler = e => {
    e.preventDefault();
  };

  return (
    <div className={styles.SignIn}>
      <h1>Seen you lately?</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label>Username</label>
          <input type="text" name="username" id="username" />
        </div>
        <div>
          <label>Password</label>
          <input type="text" name="password" id="password" />
        </div>
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
