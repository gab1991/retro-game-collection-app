import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PlatformBadge } from 'Components';

import { IProfilePlatform } from 'Routes/Profile/reducer/types';
import { DeepReadonly } from 'utility-types';

import { ButtonNeon } from 'Components/UI';
import { selectWishedPlatforms } from 'Routes/Profile/reducer/selectors';
import { Routes } from 'Routes/routes';

import { GameLotContainer } from './components';

import styles from './WishList.module.scss';

export function WishList(): JSX.Element {
  const wishedPlatforms = useSelector(selectWishedPlatforms);
  const history = useHistory();
  const [wishedList, setWishedList] = useState<DeepReadonly<Array<IProfilePlatform>>>([]);

  useEffect(() => {
    setWishedList(wishedPlatforms || []);
  }, [wishedPlatforms]);

  const toPlatfromSelecor = () => {
    history.push(Routes.PlatformSelector.makePath());
  };

  return (
    <div className={styles.WishLIst}>
      <h1 className={styles.SectionName}>Wish List</h1>
      <div className={styles.ShelvesContainer}>
        {wishedList.map(({ name: platformName, games }) => (
          <div key={platformName} className={styles.Shelf}>
            <PlatformBadge className={styles.PlatformLogo} platform={platformName} />
            <GameLotContainer platform={platformName} games={games} />
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
