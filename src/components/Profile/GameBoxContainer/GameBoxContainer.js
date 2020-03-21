import React from 'react';
import GameBox from './GameBox/GameBox';
import styles from './GameBoxContainer.css';

export default function GameBoxContainer(props) {
  const { games, platform } = props;

  return (
    <div className={styles.GameBoxContainer}>
      {games.map(game => (
        <GameBox
          key={`${game.name}_${platform}`}
          game={game}
          platform={platform}
        />
      ))}
    </div>
  );
}
