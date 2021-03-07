import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import { IProfileGame } from 'Store/profileReducer/types';
import { DeepReadonly } from 'utility-types';

import { EAvailableLists, TPlatformNames } from 'Configs/appConfig';
import { GameBox } from 'Routes/Profile/components';
import { selectIsMobile } from 'Store/appStateReducer/selectors';
import { reorderGames } from 'Store/profileReducer/thunks';

import styles from './GameBoxContainer.module.scss';

const SortableList = SortableContainer(({ games, platform, isSorting }) => {
  return (
    <div className={styles.GameBoxContainer}>
      {games.map((game: { name: string; slug: string }, index: number) => (
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

interface IGameBoxContainerProps {
  games: DeepReadonly<Array<IProfileGame>>;
  platform: TPlatformNames;
}

export function GameBoxContainer(props: IGameBoxContainerProps): JSX.Element {
  const dispatch = useDispatch();
  const isMobile = useSelector(selectIsMobile);
  const { games, platform } = props;
  const [gamesSort, setGamesSort] = useState(games || []);
  const [isSorting, setisSorting] = useState(false);

  const reorderSorted = ({ oldIndex, newIndex }) => {
    const newSortedgames = arrayMove(gamesSort, oldIndex, newIndex);
    setGamesSort(newSortedgames);
    dispatch(reorderGames(newSortedgames as Array<IProfileGame>, platform, EAvailableLists.ownedList));
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
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      pressDelay={isMobile ? 200 : 0}
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      distance={isMobile ? 0 : 5}
      axis={'xy'}
    />
  );
}
