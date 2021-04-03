import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import arrayMove from 'array-move';
import { PlatformBadge } from 'Components';

import { ButtonNeon } from 'Components/UI';
import { EAvailableLists } from 'Configs/appConfig';
import { DraggableGameBox } from 'Routes/Profile/components';
import { selectOwnedPlatforms } from 'Routes/Profile/reducer/selectors';
import { reorderGamesThunk } from 'Routes/Profile/reducer/thunks';
import { Routes } from 'Routes/routes';

import { DroppableGameBoxContainer } from './components';

import styles from './CollectionList.module.scss';

export function CollectionList(): JSX.Element {
  const dispatch = useDispatch();
  const ownedPlatforms = useSelector(selectOwnedPlatforms) || [];
  const history = useHistory();

  const toPlatfromSelecor = () => {
    history.push(Routes.PlatformSelector.makePath());
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    const updPlatformInd = ownedPlatforms.findIndex(({ name }) => name === source.droppableId);

    if (!destination || updPlatformInd < 0) {
      return;
    }

    const changedPlatform = ownedPlatforms[updPlatformInd];

    const newOrderGames = arrayMove(changedPlatform.games, source.index, destination.index);

    dispatch(
      reorderGamesThunk({
        list: EAvailableLists.ownedList,
        newSortedGames: newOrderGames,
        platform: changedPlatform.name,
      })
    );
  };

  return (
    <div className={styles.CollectionList}>
      <h1 className={styles.SectionName}>My Collection</h1>
      <div className={styles.ShelvesContainer}>
        {ownedPlatforms.map(({ name: platformName, games }) => (
          <div key={platformName} className={styles.Shelf}>
            <PlatformBadge className={styles.PlatformLogo} platform={platformName} />
            <DragDropContext onDragEnd={onDragEnd}>
              <DroppableGameBoxContainer platform={platformName}>
                {games.map((game, index) => (
                  <DraggableGameBox key={game.slug} index={index} game={game} platform={platformName} />
                ))}
              </DroppableGameBoxContainer>
            </DragDropContext>
          </div>
        ))}
        <div className={styles.EmptyList}>
          <h1>Wanna add some?</h1>
          <ButtonNeon txtContent={'Start Adding Games'} onClick={toPlatfromSelecor} />
        </div>
      </div>
    </div>
  );
}
