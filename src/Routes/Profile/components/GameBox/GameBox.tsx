import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Routes } from 'Routes';

import { IRootState } from 'Store/types';

import { GameBoxSkeletonController } from 'Components/UI/Skeletons';
import { TPlatformNames } from 'Configs/appConfig';
import { selectBoxArt } from 'Store/contentReducer/selectors';
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
    game: { slug, name: gameName },
    platform,
    showDesc = true,
    scaling = true,
  } = props;
  const boxArtUrl = useSelector<IRootState, string | void>((state) => selectBoxArt(state, platform, gameName));
  const [descrVisibility, setDescrVisibility] = useState(false);

  useEffect(() => {
    dispatch(getBoxArt(platform, gameName));
  }, [platform, gameName, dispatch]);

  return (
    <Link
      to={Routes.GameDetailed.makePath(platform, slug)}
      className={cn(styles.GameBox, { [styles.Scaling]: scaling }, className)}
      onMouseEnter={() => setDescrVisibility(true)}
      onMouseLeave={() => setDescrVisibility(false)}
      draggable={false}
    >
      {boxArtUrl ? (
        <img src={boxArtUrl} alt={''} className={styles.BoxArtImg} onDragStart={() => false} draggable={false} />
      ) : (
        <GameBoxSkeletonController platform={platform} />
      )}
      {showDesc && (
        <p className={cn(styles.Desctiprtion, { [styles.DesctiprionVisible]: descrVisibility })}>{gameName}</p>
      )}
    </Link>
  );
}
