import React from 'react';
import styles from '../ButtonNeon/ButtonNeon.module.scss';

export default function ButtonNeon(props) {
  const {
    txtContent,
    onClick: clickHander,
    direction,
    name,
    rectangular,
    blinking,
    color,
    style,
  } = props;

  return (
    <button
      name={name}
      onClick={clickHander}
      direction={direction}
      className={`${styles.ButtonNeon} 
      ${rectangular ? styles.Rectangular : null}
      ${color ? styles[color] : null}
      ${rectangular ? styles.Rectangular : null}
      ${blinking ? styles.Blinking : null}`}
      style={{ ...style }}>
      {txtContent}
    </button>
  );
}
