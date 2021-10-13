import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PlatformBadge } from 'Components';

import { ButtonNeon } from 'Components/UI';
import { EAvailableLists } from 'Configs/appConfig';
import { DndShelf } from 'Routes/Profile/components';
import { selectWishedPlatforms } from 'Routes/Profile/reducer/selectors';
import { Routes } from 'Routes/routes';

import { GameLotContainer } from './components';

import styles from './WishList.module.scss';

export function WishList(): JSX.Element {
  const wishedPlatforms = useSelector(selectWishedPlatforms) || [];
  const history = useHistory();

  const toPlatfromSelecor = () => {
    history.push(Routes.PlatformSelector.template);
  };

  return (
    <div className={styles.WishLIst}>
      <h1 className={styles.SectionName}>Wish List</h1>
      <div className={styles.ShelvesContainer}>
        {wishedPlatforms.map(({ name: platform, games }) => (
          <div key={platform} className={styles.Shelf}>
            <PlatformBadge className={styles.PlatformLogo} platform={platform} />
            <hr></hr>
            <GameLotContainer>
              <DndShelf games={games} platform={platform} list={EAvailableLists.wishList} />
            </GameLotContainer>
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
