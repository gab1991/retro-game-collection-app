import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

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
        className={cn(styles.GameCard, className, { [styles.GameCard_notLoaded]: !isImgLoaded })}
      >
        <img
          className={styles.ImgContainer}
          src={background || images.noPicture.background.src}
          alt={''}
          onLoad={() => setImageLoaded(true)}
        />
        <p className={styles.NameSection}>{name}</p>
      </Link>
      {!isImgLoaded && <GameCardSkeleton className={className} />}
    </>
  );
}
