import React from 'react';
import styles from './Backdrop.module.scss';

export default function Blackdrop(props) {
  const { show, onClick, closeIcon } = props;

  return (
    <div
      onClick={onClick}
      className={styles.Backdrop}
      style={{ display: `${show ? 'block' : 'none'}` }}></div>
  );
}
