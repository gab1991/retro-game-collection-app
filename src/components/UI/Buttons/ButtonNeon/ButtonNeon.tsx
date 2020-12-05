import React from 'react';

import { IButtonBasic } from '../ButtonBasic';

import styles from '../ButtonNeon/ButtonNeon.module.scss';

interface IButtonNeon extends IButtonBasic {
  direction?: string;
  rectangular?: boolean;
  blinking?: boolean;
  color?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  onDisabledClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
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
