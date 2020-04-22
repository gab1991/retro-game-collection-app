import React, { useState, useEffect, useRef } from 'react';
import useWindowSize from '../../../../CustomHooks/useWindowSize';
import { connect } from 'react-redux';
import styles from './GameLotContainer.module.scss';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import Backend from '../../../../Backend/Backend';
import EbyaLotSection from './EbayLotSection/EbyaLotSection';

const SortableList = SortableContainer(
  ({
    games,
    platform,
    removeFromArrayHandler,
    containerRef,
    ebayshowHandler,
    isEbayShowed,
  }) => {
    return (
      <div className={styles.GameLotContainer} ref={containerRef}>
        {games.map((game, index) => {
          return (
            <SortableItem
              isEbayShowed={isEbayShowed}
              ebayshowHandler={ebayshowHandler}
              containerRef={containerRef}
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
  ({
    game,
    platform,
    removeFromArrayHandler,
    ind,
    containerRef,
    ebayshowHandler,
    isEbayShowed,
  }) => (
    <div
      className={`${styles.GameLots} ${
        isEbayShowed ? styles.EbayShowing : ''
      }`}>
      <EbyaLotSection
        showingEbay={ebayshowHandler}
        containerRef={containerRef}
        removeFromArray={removeFromArrayHandler}
        gameData={game}
        platform={platform}
        index={ind}
      />
    </div>
  )
);

function GameLotContainer(props) {
  const containerRef = useRef();
  const { width } = useWindowSize();
  const { games, platform, userData } = props;
  const [gamesSort, setGamesSort] = useState([]);
  const [isEbayShowed, setIsEbayShowed] = useState();
  // const [containerWidth, setContainerWidth] = useState();

  useEffect(() => {
    setGamesSort(games);
  }, [games]);

  // const getSize = (elmRef) => {
  //   if (elmRef.current) setContainerWidth(elmRef.current.clientWidth);
  // };
  // getSize(container);

  const ebayshowHandler = (bool) => {
    console.log({ ebayshowHandler, bool });
    setIsEbayShowed(bool);
  };

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

  console.log();

  return (
    <SortableList
      isEbayShowed={isEbayShowed}
      ebayshowHandler={ebayshowHandler}
      containerRef={containerRef}
      removeFromArrayHandler={removeFromArrayHandler}
      onSortEnd={onSortEnd}
      games={gamesSort}
      platform={platform}
      distance={5}
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

export default connect(mapStateToProps)(GameLotContainer);
