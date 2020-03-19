import React, { useState } from 'react';
import styles from './Authmodal.css';
import Backdrop from '../UI/Backdrop/Backdrop';
import SignUpForm from './SignUpForm/SignUpForm';
import SignInForm from './SigInForm/SignInForm';

export default function AuthModal(props) {
  const [activeSide, setActiveSide] = useState('SignIn');

  const backToSignIn = e => {
    if (e) e.preventDefault();
    setActiveSide('SignIn');
  };

  const toSignUp = () => {
    setActiveSide('SignUp');
  };

  const hideAuthModal = () => {};

  return (
    <div className={styles.AuthModal}>
      <Backdrop onClick={hideAuthModal} />
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