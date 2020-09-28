import React, { useState, useEffect } from 'react';
import useWindowSize from '../../../../CustomHooks/useWindowSize';
import { connect, useDispatch } from 'react-redux';
import { removeGameFromList } from '../../../../Store/Actions/actions';
import styles from './GameLotContainer.module.scss';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import Backend from '../../../../Backend/Backend';
import EbyaLotSection from './EbayLotSection/EbyaLotSection';
import sassVar from '../../../../Сonfigs/Variables.scss';

const SortableList = SortableContainer(
  ({
    games,
    platform,
    removeFromArrayHandler,
    ebayshowHandler,
    isEbayShowedList,
  }) => {
    return (
      <div className={styles.GameLotContainer}>
        <hr></hr>
        {games.map((game, index) => {
          return (
            <SortableItem
              isEbayShowedList={isEbayShowedList}
              ebayshowHandler={ebayshowHandler}
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

const tabletBreakPoint = parseInt(sassVar['breakpoints-tablet']);

const SortableItem = SortableElement(
  ({
    game,
    platform,
    removeFromArrayHandler,
    ind,
    ebayshowHandler,
    isEbayShowedList,
  }) => (
    <div
      className={`${styles.GameLots} ${
        isEbayShowedList[game.name] ? styles.EbayShowing : ''
      }`}>
      <EbyaLotSection
        showingEbay={ebayshowHandler}
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
  const isPC = width > tabletBreakPoint;
  const { games, platform, userData } = props;
  const [gamesSort, setGamesSort] = useState([]);
  const [isEbayShowedList, setIsEbayShowedList] = useState({});
  const dispatch = useDispatch();

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
    });

    dispatch(removeGameFromList('wish_list', platform, removedGame.name));
  };

  return (
    <SortableList
      isEbayShowedList={isEbayShowedList}
      ebayshowHandler={ebayshowHandler}
      removeFromArrayHandler={removeFromArrayHandler}
      onSortEnd={onSortEnd}
      games={gamesSort}
      platform={platform}
      pressDelay={isPC ? 0 : 200}
      distance={isPC ? 5 : 0}
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
