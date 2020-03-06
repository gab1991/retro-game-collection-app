import React from 'react';
import styles from './GameCard.css';

export default function GameCard(props) {
  const {
    slug,
    name,
    background_image: background,
    rating,
    id,
    tags,
    short_screenshots: screenshots,
    genres
  } = props.gameInfo;

  return (
    <div className={styles.GameCard}>
      <div>
        <img src={background} alt={slug} />
      </div>
      <div>
        <p>{name}</p>
      </div>
    </div>
  );
}
