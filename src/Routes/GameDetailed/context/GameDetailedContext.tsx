import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { isToggleableElms } from 'Store/gameDetailedReducer/types';
import { DeepReadonly } from 'utility-types';

import { TPlatformNames } from 'Configs/appConfig';
import { selectIsMobile } from 'Store/appStateReducer/selectors';
import { toggleElmVisibility } from 'Store/gameDetailedReducer/actions';
import { selectGameDetails } from 'Store/gameDetailedReducer/selectors';
import { IRawgGameDetails } from 'Typings/RawgData';

const GameDetailedContext = React.createContext<null | IGameDetailedProviderValue>(null);

interface IGameDetailedProviderProps {
  children?: JSX.Element;
}

interface IGameDetailedProviderValue {
  gameDetails: DeepReadonly<IRawgGameDetails> | null;
  isMobile: boolean;
  name?: string;
  platformName: TPlatformNames;
  slug: string;
  toggleBlockVisibilty: (e: SyntheticEvent) => void;
}

export function GameDetailedProvider({ children }: IGameDetailedProviderProps): JSX.Element {
  const dispatch = useDispatch();
  const { slug, platformName } = useParams<{ platformName: TPlatformNames; slug: string }>();
  const isMobile = useSelector(selectIsMobile);
  const gameDetails = useSelector(selectGameDetails);

  const toggleBlockVisibilty = (e: SyntheticEvent) => {
    const elm = e.currentTarget.getAttribute('data-elm');
    // analyze later
    if (elm && isToggleableElms(elm)) {
      dispatch(toggleElmVisibility(elm));
    }
  };

  return (
    <GameDetailedContext.Provider
      value={{
        gameDetails,
        isMobile,
        name: gameDetails?.name,
        platformName,
        slug,
        toggleBlockVisibilty,
      }}
    >
      {children}
    </GameDetailedContext.Provider>
  );
}

export function useGameDetailedContext(): IGameDetailedProviderValue {
  const context = React.useContext(GameDetailedContext);
  if (!context) {
    throw new Error('useGameDetailedContext has to be used within GameDetailedContext');
  }
  return context;
}
