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

const desktopBreakPoint = 900;

function GameBoxContainer(props) {
  const { width } = useWindowSize();
  const isDesktop = width > desktopBreakPoint;
  const { games, platform } = props;
  const [gamesSort, setGamesSort] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) setGamesSort(games);
    return () => {
      isSubscribed = false;
    };
  }, [games]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newSortedgames = arrayMove(gamesSort, oldIndex, newIndex);
    setGamesSort(newSortedgames);

    Backend.updateProfile(props.userData.token, {
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
      pressDelay={isDesktop ? 0 : 200}
      axis={'xy'}
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
