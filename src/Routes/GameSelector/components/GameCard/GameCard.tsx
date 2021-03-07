import React from 'react';
import { Link } from 'react-router-dom';

import { images, TPlatformNames } from 'Configs/appConfig';

import styles from './GameCard.module.scss';

interface IGameCardProps {
  background_image: string;
  className?: string;
  name: string;
  platformName: TPlatformNames;
  slug: string;
}

export function GameCard(props: IGameCardProps): JSX.Element {
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
