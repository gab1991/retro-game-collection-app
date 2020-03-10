import React from 'react';
import styles from './GameInfoBox.css';

export default function GameInfoBox(props) {
  const {
    name,
    description,
    background_image: background,
    released,
    developers,
    publishers
  } = props.gameInfo;

  return (
    <div className={styles.GameInfoBox}>
      <div className={styles.ImageContainer}>
        <img src={background} alt={background}></img>
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
              {developers.map(dev => (
                <li>{dev.name}</li>
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
              {publishers.map(pub => (
                <li>{pub.name}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

// publishers: [
