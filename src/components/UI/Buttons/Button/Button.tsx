import React from 'react';

import styles from './Button.module.scss';

interface IButtonProps {
  direction?: string;
  letterSpacing?: boolean;
  name?: string;
  onClick: () => void;
  pressed?: boolean;
  style?: React.CSSProperties;
  txtContent: string;
}

export function Button(props: IButtonProps): JSX.Element {
  const { txtContent, onClick: clickHander, direction, name, style, pressed, letterSpacing } = props;
  return (
    <button
      name={name}
      onClick={clickHander}
      data-direction={direction}
      className={`${styles.Button} ${pressed ? styles.Pressed : null} ${letterSpacing ? styles.LetterSpacing : null}`}
      style={style}
    >
      {txtContent}
    </button>
  );
}
