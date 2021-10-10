import React, { HTMLAttributes } from 'react';
import cn from 'classnames';

import { OvalSpinner } from 'Components/UI';

import styles from './AuthFormSpinner.module.scss';

type TAuthFormSpinnerProps = HTMLAttributes<HTMLDivElement>;

export function AuthFormSpinner(props: TAuthFormSpinnerProps): JSX.Element {
  const { className, ...restHtmlProps } = props;
  return (
    <div className={cn(styles.SendingBackdrop, className)} {...restHtmlProps}>
      <OvalSpinner className={styles.OvalSpinner} />
    </div>
  );
}
