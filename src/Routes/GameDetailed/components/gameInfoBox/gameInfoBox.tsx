import React from 'react';

import { trimName } from '../../../../Utils/helperFunctions';

import styles from './gameInfoBox.module.scss';

export function GameInfoBox(props) {
  const {
    boxArt,
    gameInfo: { name, released, developers, publishers },
    className,
  } = props;

  const nameTrimmed = trimName(name);

  return (
    <div className={`${styles.GameInfoBox} ${className}`}>
      <div className={styles.ImageContainer}>
        <img src={boxArt} alt={`${name}_boxart`}></img>
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
