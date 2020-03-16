import React from 'react';
import styles from './Authmodal.css';
import Backdrop from '../UI/Backdrop/Backdrop';
import ButtonNeon from '../UI/Buttons/ButtonNeon/ButtonNeon';

export default function AuthModal(props) {
  const submitHandler = e => {
    e.preventDefault();
  };
  return (
    <div className={styles.AuthModal}>
      <Backdrop />
      <div className={styles.AuthCard}>
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
              <ButtonNeon
                txtContent={`Continue as Guest`}
                rectangular
                blinking
              />
            </div>
            <div className={styles.BtnSection}>
              <ButtonNeon txtContent={`Sign in`} rectangular />
              <ButtonNeon txtContent={`Sign Up`} rectangular />
            </div>
          </form>
        </div>
        <div className={styles.SignUp}>
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
            <div className={styles.BtnSection}>
              <ButtonNeon txtContent={`Sign in`} rectangular />
              <ButtonNeon txtContent={`Sign Up`} rectangular />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
