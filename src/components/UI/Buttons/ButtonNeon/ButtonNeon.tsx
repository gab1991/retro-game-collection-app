import React from 'react';

import { IButtonBasic } from '../ButtonBasic';

import styles from '../ButtonNeon/ButtonNeon.module.scss';

interface IButtonNeon extends IButtonBasic {
  blinking?: boolean;
  className?: string;
  color?: string;
  direction?: string;
  disabled?: boolean;
  onDisabledClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  rectangular?: boolean;
  style?: React.CSSProperties;
}

export function ButtonNeon(props: IButtonNeon): JSX.Element {
  const {
    txtContent,
    onClick: clickHander,
    direction,
    name,
    rectangular,
    blinking,
    color,
    style,
    disabled,
    onDisabledClick: disableClickHandler,
    onMouseEnter: mouseEnterHandler,
    onMouseLeave: mouseLeaveHandler,
    className,
  } = props;

  return (
    <button
      name={name}
      onClick={!disabled ? clickHander : disableClickHandler}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      data-direction={direction}
      className={`${styles.ButtonNeon} 
      ${rectangular ? styles.Rectangular : null}
      ${color ? styles[color] : null}
      ${rectangular ? styles.Rectangular : null}
      ${disabled ? styles.Disabled : null}
      ${blinking ? styles.Blinking : null}
      ${className}`}
      style={{ ...style }}
    >
      {txtContent}
    </button>
  );
}
