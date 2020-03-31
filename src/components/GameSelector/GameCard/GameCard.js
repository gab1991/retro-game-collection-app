import React from 'react';
import styles from './GameCard.css';
import { images } from '../../../configs/appConfig';

export default function GameCard(props) {
  const { slug, name, background_image: background } = props.gameInfo;
  return (
    <div
      className={styles.GameCard}
      onClick={() => props.openGameDetails(slug)}>
      <div>
        <img src={background || images.noPicture.background.src} alt={slug} />
      </div>
      <div>
        <p>{name}</p>
      </div>
    </div>
  );
}
