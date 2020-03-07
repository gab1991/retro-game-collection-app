import React from 'react';
import styles from './PlatformCard.css';
import { images, appConfig } from '../../configs/appConfig';

// function importAll(r) {
//   let images = {};
//   r.keys().map((item, index) => {
//     return (images[item.replace('./', '')] = r(item));
//   });
//   return images;
// }
// const gamepadImages = importAll(
//   require.context('../../assets/images/icons/', false, /\.(png|jpe?g|svg)$/)
// );
// const logoImages = importAll(
//   require.context(
//     '../../assets/images/platform logos/',
//     false,
//     /\.(png|jpe?g|svg)$/
//   )
// );

export default function PlatformCard(props) {
  // let gamepadImage = '';
  // let logoImage = '';

  // switch (props.name) {
  //   case 'Genesis':
  //     gamepadImage = gamepadImages['Sega Genesis.png'];
  //     logoImage = logoImages['sega_genesis_logo.png'];
  //     break;
  //   case 'NES':
  //     gamepadImage = gamepadImages['Nintendo NES.png'];
  //     logoImage = logoImages['nes_logo.png'];
  //     break;
  //   default:
  // }
  let gamepadImage = images[props.name].gamepad.src;
  let logoImage = images[props.name].logo.src;

  return (
    <div
      className={styles.PlatformCard}
      onClick={e => {
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
