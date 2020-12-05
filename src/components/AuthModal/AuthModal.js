import React, { useState } from 'react';

import SignInForm from './SigInForm/SignInForm';
import SignUpForm from './SignUpForm/SignUpForm';
import { Backdrop } from 'Components/UI';

import styles from './Authmodal.module.scss';

export default function AuthModal(props) {
  const { activeSideProps } = props;
  const [activeSide, setActiveSide] = useState(activeSideProps || 'ActiveSignIn');

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
