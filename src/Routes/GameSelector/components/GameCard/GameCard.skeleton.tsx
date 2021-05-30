import React from 'react';
import cn from 'classnames';

import styles from './GameCard.module.scss';

interface IGameCardSkeletonProps {
  className?: string;
}

export function GameCardSkeleton(props: IGameCardSkeletonProps): JSX.Element {
  return <div className={cn(styles.GameCardSkeleton, props.className)}></div>;
}
