import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { IRootState } from 'Store/types';
import { DeepReadonly } from 'utility-types';

import { TPlatformNames } from 'Configs/appConfig';
import { selectBoxArt } from 'Store/contentReducer/selectors';
import { IRawgGameDetails } from 'Typings/RawgData';
import { trimName } from 'Utils/helperFunctions';

import styles from './gameInfoBox.module.scss';

interface IGameInfoBoxProps {
  gameDetails: DeepReadonly<IRawgGameDetails>;
}

export function GameInfoBox(props: IGameInfoBoxProps): JSX.Element {
  const { platformName } = useParams<{ platformName: TPlatformNames }>();
  const {
    gameDetails: { name, released, developers, publishers },
  } = props;
  const boxArtUrl = String(
    useSelector<IRootState, string | void>((state) => selectBoxArt(state, platformName, name))
  );
  const nameTrimmed = trimName(name);

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
