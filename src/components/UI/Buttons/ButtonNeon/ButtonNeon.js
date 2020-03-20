import React from 'react';
import styles from '../ButtonNeon/ButtonNeon.css';

export default function ButtonNeon(props) {
  const {
    txtContent,
    onClick: clickHander,
    direction,
    name,
    rectangular,
    blinking,
    style
  } = props;
  return (
    <button
      name={name}
      onClick={clickHander}
      direction={direction}
      className={`${styles.ButtonNeon} 
      ${rectangular ? styles.Rectangular : null}
      ${blinking ? styles.Blinking : null}`}
      style={style}>
      {txtContent}
    </button>
  );
}
