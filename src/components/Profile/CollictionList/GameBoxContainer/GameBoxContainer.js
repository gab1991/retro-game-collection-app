import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import { reorderGames } from '../../../../Store/Actions/profileActions';
import GameBox from './GameBox/GameBox';

import styles from './GameBoxContainer.module.scss';

const SortableList = SortableContainer(({ games, platform, isSorting }) => {
  return (
    <div className={styles.GameBoxContainer}>
      {games.map((game, index) => (
        <SortableItem
          key={`${game.name}_${platform}`}
          index={index}
          game={game}
          isSorting={isSorting}
          platform={platform}
        />
      ))}
    </div>
  );
});

const SortableItem = SortableElement(({ game, platform, isSorting }) => (
  <GameBox game={game} platform={platform} showDesc={isSorting ? false : true} />
));

function GameBoxContainer(props) {
  const dispatch = useDispatch();
  const { games, platform, isMobile } = props;
  const [gamesSort, setGamesSort] = useState(games || []);
  const [isSorting, setisSorting] = useState(false);

  const reorderSorted = ({ oldIndex, newIndex }) => {
    const newSortedgames = arrayMove(gamesSort, oldIndex, newIndex);
    setGamesSort(newSortedgames);
    dispatch(reorderGames(newSortedgames, platform, 'owned_list'));
  };

  return (
    <SortableList
      onSortStart={() => {
        setisSorting(true);
      }}
      onSortEnd={(settings) => {
        setisSorting(false);
        reorderSorted(settings);
      }}
      isSorting={isSorting}
      games={gamesSort}
      platform={platform}
      pressDelay={isMobile ? 200 : 0}
      distance={isMobile ? 0 : 5}
      axis={'xy'}
    />
  );
}

function mapStateToProps(state) {
  return {
    isMobile: state.appState.isMobile,
    profileInfo: state.profile,
  };
}

export default connect(mapStateToProps)(GameBoxContainer);
