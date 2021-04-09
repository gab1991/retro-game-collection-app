import React, { ReactNode } from 'react';

import styles from './GameBoxContainer.module.scss';
export interface IGameBoxContainerProps {
  children?: ReactNode;
}

export function GameBoxContainer(props: IGameBoxContainerProps): JSX.Element {
  return <div className={styles.GameBoxContainer}>{props.children}</div>;
}
