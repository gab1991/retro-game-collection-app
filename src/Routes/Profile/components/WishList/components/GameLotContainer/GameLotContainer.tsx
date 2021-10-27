import React, { HTMLAttributes } from 'react';

import styles from './GameLotContainer.module.scss';

export function GameLotContainer({ children }: HTMLAttributes<HTMLDivElement>): JSX.Element {
  return <div className={styles.GameLotContainer}>{children}</div>;
}
