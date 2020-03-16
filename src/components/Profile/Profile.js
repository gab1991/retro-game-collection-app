import React from 'react';
import styles from './Profile.css';
import AuthModal from '../AuthModal/AuthModal';

export default function Profile(props) {
  const logged = false;

  return <div className={styles.Profile}>{!logged && <AuthModal />}</div>;
}
