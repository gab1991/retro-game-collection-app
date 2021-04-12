import React, { ReactNode } from 'react';

import styles from './GameLotContainer.module.scss';

export interface IGameLotContainerProps {
  children?: ReactNode;
}

export function GameLotContainer({ children }: IGameLotContainerProps): JSX.Element {
  return <div className={styles.GameLotContainer}>{children}</div>;
}
