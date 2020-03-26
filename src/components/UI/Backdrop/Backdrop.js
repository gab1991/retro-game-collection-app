import React from 'react';
import styles from './Backdrop.css';
import closeicon from '../../../assets/images/ui/close.svg';

export default function Blackdrop(props) {
  const { show, onClick, closeIcon } = props;
  console.log(props);
  return (
    <div
      onClick={onClick}
      className={styles.Backdrop}
      style={{ display: `${show ? 'block' : 'none'}` }}>
      {closeIcon && (
        <div className={styles.CloseIconContainer}>
          <img src={closeicon} alt="closeicon" />
        </div>
      )}
    </div>
  );
}
