import React from 'react';
import styles from './PlatformCard.module.scss';
import { images } from '../../Сonfigs/appConfig';

export default function PlatformCard({ name, className }) {
  const gamepadImage = images[name].gamepad.src;
  const logoImage = images[name].logo.src;

  return (
    <a href={`/${name}`} className={`${styles.PlatformCard} ${className}`}>
      <div className={styles.Logo}>
        <img src={logoImage} alt={name} />
      </div>
      <div className={styles.GamePad}>
        <img src={gamepadImage} alt={name} />
      </div>
    </a>
  );
}
