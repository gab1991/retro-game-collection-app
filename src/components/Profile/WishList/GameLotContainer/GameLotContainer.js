import React, { useState, useEffect } from 'react';
import useWindowSize from '../../../../CustomHooks/useWindowSize';
import { connect } from 'react-redux';
import styles from './GameLotContainer.module.scss';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import Backend from '../../../../Backend/Backend';
import EbyaLotSection from './EbayLotSection/EbyaLotSection';

const SortableList = SortableContainer(
  ({ games, platform, removeFromArrayHandler }) => {
    return (
      <div className={styles.GameLotContainer}>
        {games.map((game, index) => {
          return (
            <SortableItem
              removeFromArrayHandler={removeFromArrayHandler}
              key={`${game.name}_${platform}`}
              index={index}
              ind={index}
              game={game}
              platform={platform}
            />
          );
        })}
      </div>
    );
  }
);

const SortableItem = SortableElement(
  ({ game, platform, removeFromArrayHandler, ind }) => (
    <div className={styles.GameLots}>
      <EbyaLotSection
        removeFromArray={removeFromArrayHandler}
        gameData={game}
        platform={platform}
        index={ind}
      />
    </div>
  )
);

function GameLotContainer(props) {
  const { width } = useWindowSize();
  const { games, platform, userData } = props;
  const [gamesSort, setGamesSort] = useState([]);

  useEffect(() => {
    setGamesSort(games);
  }, [games]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newSortedgames = arrayMove(gamesSort, oldIndex, newIndex);
    setGamesSort(newSortedgames);

    Backend.updateProfile(props.userData.token, {
      sortedGames: newSortedgames,
      platform: platform,
      list: 'wish_list',
      action: 'reorder',
    });
  };

  const removeFromArrayHandler = (index) => {
    console.log({ platform, index });
    const token = userData.token;
    const newSortedgames = [...gamesSort];
    const removedGame = newSortedgames.splice(index, 1)[0];

    console.log([removedGame, newSortedgames]);
    setGamesSort(newSortedgames);

    Backend.updateProfile(token, {
      action: 'removeGame',
      list: 'wish_list',
      platform: platform,
      game: removedGame,
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <SortableList
      removeFromArrayHandler={removeFromArrayHandler}
      onSortEnd={onSortEnd}
      games={gamesSort}
      platform={platform}
      distance={5}
      axis={'y'}
    />
  );
}

function mapStateToProps(state) {
  return {
    userData: state.logged,
    profileInfo: state.profile,
  };
}

export default connect(mapStateToProps)(GameLotContainer);
