import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IRootState } from 'Store/types';
import { DeepReadonly } from 'utility-types';

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
  const { platformName } = useGameDetailedContext();
  const {
    gameDetails: { name, released, developers, publishers },
  } = props;
  const boxArtUrl = String(
    useSelector<IRootState, string | void>((state) => selectBoxArt(state, platformName, name))
  );
  const nameTrimmed = trimName(name);

  useEffect(() => {
    dispatch(getBoxArt(platformName, name));
  }, [name, platformName, dispatch]);

  return (
    <div className={`${styles.GameInfoBox}`}>
      <div className={styles.ImageContainer}>
        <img src={boxArtUrl} alt={`${name}_boxart`}></img>
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
