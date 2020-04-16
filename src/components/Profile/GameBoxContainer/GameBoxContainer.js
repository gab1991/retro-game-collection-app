import React, { useState, useEffect } from 'react';
import useWindowSize from '../../../CustomHooks/useWindowSize';
import GameBox from './GameBox/GameBox';
import { connect } from 'react-redux';
import styles from './GameBoxContainer.module.scss';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import Backend from '../../../Backend/Backend';

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

function GameBoxContainer(props) {
  const { width } = useWindowSize();
  const { games, platform } = props;
  const [gamesSort, setGamesSort] = useState([]);

  useEffect(() => {
    setGamesSort(games);
  }, [games]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newSortedgames = arrayMove(gamesSort, oldIndex, newIndex);
    setGamesSort(newSortedgames);

    Backend.updateProfile(props.userData.username, props.userData.token, {
      sortedGames: newSortedgames,
      platform: platform,
      list: 'owned_list',
      action: 'reorder',
    });
  };

  return (
    <SortableList
      onSortEnd={onSortEnd}
      games={gamesSort}
      platform={platform}
      distance={5}
      axis={width > 800 ? 'xy' : 'y'}
    />
  );
}

function mapStateToProps(state) {
  return {
    userData: state.logged,
    profileInfo: state.profile,
  };
}

export default connect(mapStateToProps)(GameBoxContainer);
