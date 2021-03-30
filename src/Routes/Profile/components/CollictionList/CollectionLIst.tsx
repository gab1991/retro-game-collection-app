import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PlatformBadge } from 'Components';

import { IProfilePlatform } from 'Routes/Profile/reducer/types';
import { DeepReadonly } from 'utility-types';

import { ButtonNeon } from 'Components/UI';
import { DraggableGameBox } from 'Routes/Profile/components';
import { selectOwnedPlatforms } from 'Routes/Profile/reducer/selectors';
import { Routes } from 'Routes/routes';

import { DroppableGameBoxContainer } from './components';

import styles from './CollectionList.module.scss';

export function CollectionList(): JSX.Element {
  const ownedPlatforms = useSelector(selectOwnedPlatforms);
  const history = useHistory();
  const [ownedList, setOwnedList] = useState<DeepReadonly<Array<IProfilePlatform>>>([]);

  useEffect(() => {
    setOwnedList(ownedPlatforms || []);
  }, [ownedPlatforms]);

  const toPlatfromSelecor = () => {
    history.push(Routes.PlatformSelector.makePath());
  };

  return (
    <div className={styles.CollectionList}>
      <h1 className={styles.SectionName}>My Collection</h1>
      <div className={styles.ShelvesContainer}>
        {ownedList.map(({ name: platformName, games }) => (
          <div key={platformName} className={styles.Shelf}>
            <PlatformBadge className={styles.PlatformLogo} platform={platformName} />
            {/* <GameBoxContainer platform={platformName} games={games} /> */}
            <DroppableGameBoxContainer platform={platformName}>
              {games.map((game, index) => (
                <DraggableGameBox key={game.slug} index={index} game={game} platform={platformName} />
              ))}
            </DroppableGameBoxContainer>
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
