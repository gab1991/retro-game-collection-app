import React, { ReactNode, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import arrayMove from 'array-move';

import { IProfileGame } from 'Routes/Profile/reducer/types';
import { DeepReadonly } from 'utility-types';

import { EAvailableLists, TPlatformNames } from 'Configs/appConfig';
import { GameBox } from 'Routes/Profile/components';
import { reorderGames } from 'Routes/Profile/reducer/thunks';
import { selectIsMobile } from 'Store/appStateReducer/selectors';

import styles from './GameBoxContainer.module.scss';
export interface IGameBoxContainerProps {
  // games: DeepReadonly<Array<IProfileGame>>;
  // platform: TPlatformNames;
  children?: ReactNode;
}

export function GameBoxContainer(props: IGameBoxContainerProps): JSX.Element {
  // const { games, platform } = props;

  return (
    <div className={styles.GameBoxContainer}>
      {props.children}
      {/* {games.map((game) => (
        <GameBox key={game.name} game={game} platform={platform} />
      ))} */}
    </div>
  );
}
