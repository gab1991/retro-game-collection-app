import React from 'react';
import styles from './GameCard.module.scss';
import { images } from '../../../Сonfigs/appConfig';

export default function GameCard(props) {
  const { slug, name, background_image: background, className } = props;
  const { platformName } = props;

  return (
    <a
      href={`/${platformName}/${slug}`}
      className={`${styles.GameCard} ${className}`}>
      <div className={styles.ImgContainer}>
        <img src={background || images.noPicture.background.src} alt={slug} />
      </div>
      <div className={styles.NameSection}>
        <p>{name}</p>
      </div>
    </a>
  );
}
