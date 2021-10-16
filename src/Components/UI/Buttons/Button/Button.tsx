import React, { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './Button.module.scss';

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: TButtonProps): JSX.Element {
  const { className, ...htmlProps } = props;

  return <button className={cn(styles.Button, className)} {...htmlProps} />;
}
