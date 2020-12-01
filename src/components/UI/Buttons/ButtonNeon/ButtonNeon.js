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
      direction={direction}
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
