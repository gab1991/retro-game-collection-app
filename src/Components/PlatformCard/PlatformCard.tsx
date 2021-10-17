import React, { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { images } from 'Configs/appConfig';

import styles from './PlatformCard.module.scss';

interface IPlatformCardProps extends HTMLAttributes<HTMLAnchorElement> {
  name: string;
}

export function PlatformCard({ name, className }: IPlatformCardProps): JSX.Element {
  const gamepadImage = images[name].gamepad.src;

  const logoImage = images[name].logo.src;

  return (
    <Link to={`/${name}`} className={cn(styles.PlatformCard, className)}>
      <div className={styles.Logo}>
        <img src={logoImage} alt={name} />
      </div>
      <div className={styles.GamePad}>
        <img src={gamepadImage} alt={name} />
      </div>
    </Link>
  );
}
