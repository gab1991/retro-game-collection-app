import React from 'react';
import styles from './Button.css';

export default function Button(props) {
  const {
    txtContent,
    onClick: clickHander,
    direction,
    name,
    style,
    pressed,
    letterSpacing
  } = props;
  return (
    <button
      name={name}
      onClick={clickHander}
      direction={direction}
      className={`${styles.Button} ${pressed ? styles.Pressed : null} ${
        letterSpacing ? styles.LetterSpacing : null
      }`}
      style={style}>
      {txtContent}
    </button>
  );
}
