import React from 'react';
import styles from './Backdrop.css';
import closeicon from '../../../assets/images/ui/close.svg';

export default function Blackdrop(props) {
  return (
    <div className={styles.Backdrop}>
      <div className={styles.CloseIconContainer}>
        <img src={closeicon} alt="closeicon" />
      </div>
    </div>
  );
}
