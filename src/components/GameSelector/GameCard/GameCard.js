import React from 'react';
import styles from './GameCard.css';
import { withRouter } from 'react-router-dom';

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
    <div
      className={styles.GameCard}
      onClick={() => props.openGameDetails(slug)}>
      <div>
        <img src={background} alt={slug} />
      </div>
      <div>
        <p>{name}</p>
      </div>
    </div>
  );
}
