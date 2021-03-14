import React from 'react';

import { Backdrop } from 'Components/UI';

import { SignInForm, SignUpForm } from './components';
import { useAuthModalContext } from './context';

import styles from './Authmodal.module.scss';

export function AuthModal(): JSX.Element {
  const { activeSide } = useAuthModalContext();

  return (
    <div className={styles.AuthModal}>
      <div className={`${styles.AuthCard} ${styles[activeSide]}`}>
        <SignInForm />
        <SignUpForm />
      </div>
      <Backdrop show />
    </div>
  );
}
