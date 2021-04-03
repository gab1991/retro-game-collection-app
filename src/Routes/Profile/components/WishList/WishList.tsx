import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PlatformBadge } from 'Components';

import { DraggableEbayLotSection, EbayLotSection } from './components/GameLotContainer/components';
import { ButtonNeon } from 'Components/UI';
import { selectWishedPlatforms } from 'Routes/Profile/reducer/selectors';
import { Routes } from 'Routes/routes';

import { DroppableGameLotCont, GameLotContainer } from './components';

import styles from './WishList.module.scss';

export function WishList(): JSX.Element {
  const wishedPlatforms = useSelector(selectWishedPlatforms) || [];
  const history = useHistory();

  const toPlatfromSelecor = () => {
    history.push(Routes.PlatformSelector.makePath());
  };

  const onDragEnd = (result: DropResult) => {
    console.log(result);
  };

  return (
    <div className={styles.WishLIst}>
      <h1 className={styles.SectionName}>Wish List</h1>
      <div className={styles.ShelvesContainer}>
        {wishedPlatforms.map(({ name: platform, games }) => (
          <div key={platform} className={styles.Shelf}>
            <PlatformBadge className={styles.PlatformLogo} platform={platform} />
            <hr></hr>
            <DragDropContext onDragEnd={onDragEnd}>
              <DroppableGameLotCont platform={platform}>
                {games.map((game, index) => (
                  <DraggableEbayLotSection key={game.slug} index={index} game={game} platform={platform} />
                ))}
              </DroppableGameLotCont>
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
