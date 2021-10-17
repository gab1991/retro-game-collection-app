import React, { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './ButtonNeon.module.scss';

export interface IButtonNeon extends ButtonHTMLAttributes<HTMLButtonElement> {
  blinking?: boolean;
  color?: 'green' | 'gray' | 'red';
  rectangular?: boolean;
}

export function ButtonNeon(props: IButtonNeon): JSX.Element {
  const { rectangular, blinking, color, children, className, ...htmlProps } = props;

  return (
    <button
      className={cn(
        styles.ButtonNeon,
        { [styles.Rectangular]: rectangular },
        { [styles.Disabled]: htmlProps.disabled },
        { [styles.Blinking]: blinking },
        color ? styles[color] : '',
        className
      )}
      {...htmlProps}
    >
      {children}
    </button>
  );
}
