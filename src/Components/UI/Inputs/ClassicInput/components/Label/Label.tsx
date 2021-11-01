import React, { LabelHTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './Label.module.scss';

type TClassicLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function Label(props: TClassicLabelProps): JSX.Element {
  const { className, htmlFor, ...htmlProps } = props;
  return <label htmlFor={htmlFor} className={cn(styles.Label, className)} {...htmlProps} />;
}
