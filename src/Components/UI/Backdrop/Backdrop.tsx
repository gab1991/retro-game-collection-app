import React, { ButtonHTMLAttributes } from 'react';
import cx from 'classnames';

import styles from './Backdrop.module.scss';

type TBackdropProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Backdrop(props: TBackdropProps): JSX.Element {
  const { className, ...htmlProps } = props;

  return <button className={cx(styles.Backdrop, className)} {...htmlProps} />;
}
