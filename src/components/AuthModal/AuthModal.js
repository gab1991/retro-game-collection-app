import React, { useState } from 'react';
import styles from './Authmodal.css';
import Backdrop from '../UI/Backdrop/Backdrop';
import SignUpForm from './SignUpForm/SignUpForm';
import SignInForm from './SigInForm/SignInForm';

export default function AuthModal(props) {
  const [activeSide, setActiveSide] = useState('SignUp');

  const backToSignIn = () => {
    setActiveSide('SignIn');
  };

  const toSignUp = () => {
    setActiveSide('SignUp');
  };

  return (
    <div className={styles.AuthModal}>
      <Backdrop />
      <div
        className={`${styles.AuthCard}
          ${activeSide === 'SignIn' ? styles.ActiveSignIn : null}
          ${activeSide === 'SignUp' ? styles.ActiveSignUp : null}
        `}>
        <SignInForm toSignUp={toSignUp} />
        <SignUpForm backToSignIn={backToSignIn} />
      </div>
    </div>
  );
}
