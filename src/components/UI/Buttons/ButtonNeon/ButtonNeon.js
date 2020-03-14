import React from 'react';
import styles from '../ButtonNeon/ButtonNeon.css';

export default function ButtonNeon(props) {
  const { txtContent, onClick: clickHander, direction, name, style } = props;
  return (
    <button
      name={name}
      onClick={clickHander}
      direction={direction}
      className={styles.ButtonNeon}>
      {txtContent}
    </button>
  );
}
