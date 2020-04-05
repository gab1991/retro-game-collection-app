import React from 'react';
import styles from './PlatformCard.module.css';
import { images } from '../../configs/appConfig';

export default function PlatformCard(props) {
  let gamepadImage = images[props.name].gamepad.src;
  let logoImage = images[props.name].logo.src;

  return (
    <div
      className={styles.PlatformCard}
      onClick={(e) => {
        props.selectPlatform(props.name);
      }}>
      <div>
        <img src={logoImage} alt={props.name} />
      </div>
      <div>
        <img src={gamepadImage} alt={props.name} />
      </div>
    </div>
  );
}
