import React from 'react';
import styles from './PlatformCard.module.scss';
import { images } from '../../Сonfigs/appConfig';

export default function PlatformCard(props) {
  let gamepadImage = images[props.name].gamepad.src;
  let logoImage = images[props.name].logo.src;

  return (
    <div
      className={styles.PlatformCard}
      onClick={(e) => {
        props.selectPlatform(props.name);
      }}>
      <div className={styles.Logo}>
        <img src={logoImage} alt={props.name} />
      </div>
      <div className={styles.GamePad}>
        <img src={gamepadImage} alt={props.name} />
      </div>
    </div>
  );
}
