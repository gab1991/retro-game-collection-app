import React, { useState, useEffect } from 'react';
import GameBox from './GameBox/GameBox';
import styles from './GameBoxContainer.css';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

const SortableList = SortableContainer(({ games, platform }) => {
  return (
    <div className={styles.GameBoxContainer}>
      {games.map((game, index) => (
        <SortableItem
          key={`${game.name}_${platform}`}
          index={index}
          game={game}
          platform={platform}
        />
      ))}
    </div>
  );
});

const SortableItem = SortableElement(({ game, platform }) => (
  <GameBox game={game} platform={platform} />
));

export default function GameBoxContainer(props) {
  const { games, platform } = props;
  const [gamesSort, setGamesSort] = useState([]);

  useEffect(() => {
    setGamesSort(games);
  }, [games]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setGamesSort(arrayMove(gamesSort, oldIndex, newIndex));
  };

  return (
    <SortableList
      onSortEnd={onSortEnd}
      games={gamesSort}
      platform={platform}
      axis={'xy'}
    />
  );
}
