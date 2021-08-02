import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Routes } from 'Routes';

import { GameBoxWithSkeleton } from 'Components/UI/Skeletons';
import { TPlatformNames } from 'Configs/appConfig';
import { getBoxArt } from 'Store/contentReducer/thunks';

import styles from './GameBox.module.scss';

export interface IGameBoxProps {
  className?: string;
  game: { name: string; slug: string };
  platform: TPlatformNames;
  scaling?: boolean;
  showDesc?: boolean;
}

export function GameBox(props: IGameBoxProps): JSX.Element {
  const dispatch = useDispatch();
  const {
    className,
    game: { slug, name },
    platform,
    showDesc = true,
    scaling = true,
  } = props;
  const [descrVisibility, setDescrVisibility] = useState(false);

  useEffect(() => {
    dispatch(getBoxArt(platform, name));
  }, [platform, name, dispatch]);

  return (
    <Link
      to={Routes.GameDetailed.makePath(platform, slug)}
      className={cn(styles.GameBox, { [styles.Scaling]: scaling }, className)}
      onMouseEnter={() => setDescrVisibility(true)}
      onMouseLeave={() => setDescrVisibility(false)}
      draggable={false}
    >
      <GameBoxWithSkeleton name={name} platform={platform} imgClassName={styles.BoxArtImg} />
      {showDesc && <p className={cn(styles.Desctiprtion, { [styles.DesctiprionVisible]: descrVisibility })}>{name}</p>}
    </Link>
  );
}
