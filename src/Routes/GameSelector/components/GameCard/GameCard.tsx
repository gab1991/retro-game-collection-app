import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { images, TPlatformNames } from 'Configs/appConfig';

import { GameCardSkeleton } from './GameCard.skeleton';

import styles from './GameCard.module.scss';

export interface IGameCardProps {
  background_image: string;
  className?: string;
  name: string;
  platformName: TPlatformNames;
  slug: string;
}

export function GameCard(props: IGameCardProps): JSX.Element {
  const { slug, name, background_image: background, className, platformName } = props;
  const [isImgLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <Link
        to={`/${platformName}/${slug}`}
        className={`${styles.GameCard} ${className}`}
        style={{ display: isImgLoaded ? 'flex' : 'none' }}
      >
        <div className={styles.ImgContainer}>
          <img src={background || images.noPicture.background.src} alt={''} onLoad={() => setImageLoaded(true)} />
        </div>
        <div className={styles.NameSection}>
          <p>{name}</p>
        </div>
      </Link>
      {!isImgLoaded && <GameCardSkeleton className={className} />}
    </>
  );
}
