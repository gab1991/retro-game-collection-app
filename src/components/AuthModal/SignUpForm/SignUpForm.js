import React from 'react';
import styles from './SignUpForm.css';
import ButtonNeon from '../../UI/Buttons/ButtonNeon/ButtonNeon';

export default function SignUpForm(props) {
  const { backToSignIn } = props;

  const submitHandler = e => {
    e.preventDefault();
  };

  return (
    <div className={styles.SignUp}>
      <h1>Start Your Journey</h1>
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
          <label>Confirm Password</label>
          <input type="text" name="password" id="password" />
        </div>
        <div>
          <label>Email</label>
          <input type="text" name="email" id="email" />
        </div>
        <div className={styles.BtnSection}>
          <ButtonNeon txtContent={`Create Account`} rectangular />
          <ButtonNeon
            txtContent={`Back to SignIn`}
            rectangular
            onClick={backToSignIn}
          />
        </div>
      </form>
    </div>
  );
}
