import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PlatformBadge } from 'Components';

import { ButtonNeon } from 'Components/UI';
import { EAvailableLists } from 'Configs/appConfig';
import { DndShelf } from 'Routes/Profile/components';
import { selectOwnedPlatforms } from 'Routes/Profile/reducer/selectors';
import { Routes } from 'Routes/routes';

import { GameBoxContainer } from './components';

import styles from './CollectionList.module.scss';

export function CollectionList(): JSX.Element {
  const ownedPlatforms = useSelector(selectOwnedPlatforms) || [];

  const history = useHistory();

  const toPlatfromSelecor = () => {
    history.push(Routes.PlatformSelector.makePath());
  };

  return (
    <div className={styles.CollectionList}>
      <h1 className={styles.SectionName}>My Collection</h1>
      <div className={styles.ShelvesContainer}>
        {ownedPlatforms.map(({ name: platform, games }) => (
          <div key={platform} className={styles.Shelf}>
            <PlatformBadge className={styles.PlatformLogo} platform={platform} />
            <GameBoxContainer>
              <DndShelf games={games} platform={platform} list={EAvailableLists.ownedList} />
            </GameBoxContainer>
          </div>
        ))}
        <div className={styles.EmptyList}>
          <h1>Wanna add some?</h1>
          <ButtonNeon onClick={toPlatfromSelecor}>Start Adding Games</ButtonNeon>
        </div>
      </div>
    </div>
  );
}
