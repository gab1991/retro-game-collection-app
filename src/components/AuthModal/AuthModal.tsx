import React, { useState } from 'react';

import { Backdrop } from 'Components/UI';

import { SignInForm, SignUpForm } from './components';

import styles from './Authmodal.module.scss';

enum EActiveSide {
  'ActiveSignIn' = 'ActiveSignIn',
  'ActiveSignUp' = 'ActiveSignUp',
}

export function AuthModal(): JSX.Element {
  const [activeSide, setActiveSide] = useState(EActiveSide.ActiveSignIn);

  const backToSignIn = (e) => {
    if (e) e.preventDefault();
    setActiveSide(EActiveSide.ActiveSignIn);
  };

  const toSignUp = (e) => {
    if (e) e.preventDefault();
    setActiveSide(EActiveSide.ActiveSignUp);
  };

  return (
    <div className={styles.AuthModal}>
      <div className={`${styles.AuthCard} ${styles[activeSide]}`}>
        <SignInForm toSignUp={toSignUp} />
        <SignUpForm backToSignIn={backToSignIn} />
      </div>
      <Backdrop show />
    </div>
  );
}
