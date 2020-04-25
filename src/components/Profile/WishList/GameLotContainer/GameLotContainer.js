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
    isEbayShowedList,
  }) => {
    return (
      <div className={styles.GameLotContainer} ref={containerRef}>
        {games.map((game, index) => {
          return (
            <SortableItem
              isEbayShowedList={isEbayShowedList}
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

const desktopBreakPoint = 900;

const SortableItem = SortableElement(
  ({
    game,
    platform,
    removeFromArrayHandler,
    ind,
    containerRef,
    ebayshowHandler,
    isEbayShowedList,
  }) => (
    <div
      className={`${styles.GameLots} ${
        isEbayShowedList[game.name] ? styles.EbayShowing : ''
      }`}>
      {/* {console.log(isEbayShowedList[game.name])} */}
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
  const isDesktop = width > desktopBreakPoint;
  const { games, platform, userData } = props;
  const [gamesSort, setGamesSort] = useState([]);
  const [isEbayShowedList, setIsEbayShowedList] = useState({});

  useEffect(() => {
    setGamesSort(games);
  }, [games]);

  const ebayshowHandler = (game, bool) => {
    setIsEbayShowedList((prevList) => {
      const updList = { ...prevList };
      updList[game] = bool;
      return updList;
    });
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
    const token = userData.token;
    const newSortedgames = [...gamesSort];
    const removedGame = newSortedgames.splice(index, 1)[0];

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
      isEbayShowedList={isEbayShowedList}
      ebayshowHandler={ebayshowHandler}
      containerRef={containerRef}
      removeFromArrayHandler={removeFromArrayHandler}
      onSortEnd={onSortEnd}
      games={gamesSort}
      platform={platform}
      axis={'xy'}
      pressDelay={isDesktop ? 0 : 200}
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
