import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IRootState } from 'Store/types';
import { DeepReadonly } from 'utility-types';

import { GameBoxSkeletonController } from 'Components/UI/Skeletons';
import { useGameDetailedContext } from 'Routes/GameDetailed/context';
import { selectBoxArt } from 'Store/contentReducer/selectors';
import { getBoxArt } from 'Store/contentReducer/thunks';
import { IRawgGameDetails } from 'Typings/RawgData';
import { trimName } from 'Utils/helperFunctions';

import styles from './GameInfoBox.module.scss';

interface IGameInfoBoxProps {
  gameDetails: DeepReadonly<IRawgGameDetails>;
}

export function GameInfoBox(props: IGameInfoBoxProps): JSX.Element {
  const dispatch = useDispatch();
  const { platform } = useGameDetailedContext();
  const {
    gameDetails: { name, released, developers, publishers },
  } = props;
  const boxArtUrl = String(
    useSelector<IRootState, string | void>((state) => selectBoxArt(state, platform, name))
  );
  const nameTrimmed = trimName(name);

  useEffect(() => {
    dispatch(getBoxArt(platform, name));
  }, [name, platform, dispatch]);

  return (
    <div className={`${styles.GameInfoBox}`}>
      <div className={styles.ImageContainer}>
        {boxArtUrl ? (
          <img src={boxArtUrl} alt={`${name}_boxart`}></img>
        ) : (
          <GameBoxSkeletonController platform={platform} />
        )}
      </div>
      <div className={styles.TextContainer}>
        <h2 className={styles.Name}>{nameTrimmed}</h2>
        <h3>Date of Release:</h3>
        <span>{released}</span>
        {developers && (
          <>
            <h3>Developers:</h3>
            <ul>
              {developers.map((dev, index) => (
                <li key={index}>{dev.name}</li>
              ))}
            </ul>
          </>
        )}
        {publishers && (
          <>
            <h3>Publishers:</h3>
            <ul>
              {publishers.map((pub, index) => (
                <li key={index}>{pub.name}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
