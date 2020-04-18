import React, { useState } from 'react';
import styles from './Authmodal.module.scss';
import Backdrop from '../UI/Backdrop/Backdrop';
import SignUpForm from './SignUpForm/SignUpForm';
import SignInForm from './SigInForm/SignInForm';

export default function AuthModal(props) {
  const [activeSide, setActiveSide] = useState('ActiveSignIn');

  const backToSignIn = (e) => {
    if (e) e.preventDefault();
    setActiveSide('ActiveSignIn');
  };

  const toSignUp = (e) => {
    if (e) e.preventDefault();
    setActiveSide('ActiveSignUp');
  };

  const hideAuthModal = () => {};

  return (
    <div className={styles.AuthModal}>
      <div className={`${styles.AuthCard} ${styles[activeSide]}`}>
        <SignInForm toSignUp={toSignUp} />
        <SignUpForm backToSignIn={backToSignIn} />
      </div>
      <Backdrop onClick={hideAuthModal} closeIcon={true} show />
    </div>
  );
}
