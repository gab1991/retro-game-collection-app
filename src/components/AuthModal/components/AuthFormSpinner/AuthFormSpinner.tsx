import React from 'react';

import { OvalSpinner } from 'Components/UI';

import styles from './AuthFormSpinner.module.scss';

export function AuthFormSpinner(): JSX.Element {
  return (
    <div className={styles.SendingBackdrop}>
      <div className={styles.OvalSpinnerWrapper}>
        <OvalSpinner />
      </div>
    </div>
  );
}
