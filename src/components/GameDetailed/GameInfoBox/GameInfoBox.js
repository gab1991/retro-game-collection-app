import React from 'react';
import styles from './GameInfoBox.css';

export default function GameInfoBox(props) {
  const { name, released, developers, publishers } = props.gameInfo;
  const { boxArt } = props;

  return (
    <div className={styles.GameInfoBox}>
      <div className={styles.ImageContainer}>
        <img src={boxArt} alt={boxArt}></img>
      </div>
      <div className={styles.TextContainer}>
        <h3>Name:</h3>
        <span>{name}</span>
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
