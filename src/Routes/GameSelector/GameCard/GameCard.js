import React from 'react';
import { Link } from 'react-router-dom';

import { images } from '../../../Configs/appConfig';

import styles from './GameCard.module.scss';

export default function GameCard(props) {
  const { slug, name, background_image: background, className, platformName } = props;

  return (
    <Link to={`/${platformName}/${slug}`} className={`${styles.GameCard} ${className}`}>
      <div className={styles.ImgContainer}>
        <img src={background || images.noPicture.background.src} alt={slug} />
      </div>
      <div className={styles.NameSection}>
        <p>{name}</p>
      </div>
    </Link>
  );
}
