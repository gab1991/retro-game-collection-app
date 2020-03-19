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
        <p>
          <span> Name: </span>
          {name}
        </p>
        <p>
          <span>Date of Release: </span>
          {released}
        </p>
        {developers && (
          <>
            <p>
              <span>Developers:</span>
            </p>
            <ul>
              {developers.map((dev, index) => (
                <li key={index}>{dev.name}</li>
              ))}
            </ul>
          </>
        )}
        {publishers && (
          <>
            <p>
              <span>Publishers:</span>
            </p>
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
