import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import arrayMove from 'array-move';

import { IProfileGame } from 'Routes/Profile/reducer/types';
import { DeepReadonly } from 'utility-types';

import { TPlatformNames } from 'Configs/appConfig';

import { EbayLotSection } from './components';

import styles from './GameLotContainer.module.scss';

interface IGameLotContainerProps {
  games: DeepReadonly<Array<IProfileGame>>;
  platform: TPlatformNames;
}

export function GameLotContainer(props: IGameLotContainerProps): JSX.Element {
  const { games, platform } = props;

  return (
    <div className={styles.GameLotContainer}>
      <hr></hr>
      {games.map((game) => (
        <div key={game.slug} className={`${styles.GameLots}`}>
          <EbayLotSection gameData={game} platform={platform} />
        </div>
      ))}
    </div>
  );
}
