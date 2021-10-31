import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { isToggleableElms } from 'Routes/GameDetailed/reducer/types';
import { DeepReadonly } from 'utility-types';

import { EAvailableLists, TPlatformNames } from 'Configs/appConfig';
import { setIsOwned, toggleElmVisibility } from 'Routes/GameDetailed/reducer/actions';
import { selectGameDetails, selectIsOwned, selectIsWished } from 'Routes/GameDetailed/reducer/selectors';
import { addGame, removeGame } from 'Routes/GameDetailed/reducer/thunks';
import { selectIsMobile } from 'Store/appStateReducer/selectors';
import { IRawgGameDetails } from 'Typings/rawgData';

const GameDetailedContext = React.createContext<null | IGameDetailedProviderValue>(null);

interface IGameDetailedProviderProps {
  children?: JSX.Element;
}

interface IGameDetailedProviderValue {
  gameDetails: DeepReadonly<IRawgGameDetails> | null;
  isMobile: boolean;
  isOwned: boolean;
  isWished: boolean;
  name?: string;
  platform: TPlatformNames;
  slug: string;
  toggleBlockVisibilty: (e: SyntheticEvent) => void;
  toggleList: (platform: TPlatformNames, gameName: string, list: EAvailableLists, slug: string) => void;
}

export function GameDetailedProvider({ children }: IGameDetailedProviderProps): JSX.Element {
  const dispatch = useDispatch();
  const { slug, platformName } = useParams<{ platformName: TPlatformNames; slug: string }>();
  const isMobile = useSelector(selectIsMobile);
  const gameDetails = useSelector(selectGameDetails);
  const isWished = useSelector(selectIsWished);
  const isOwned = useSelector(selectIsOwned);

  const toggleBlockVisibilty = (e: SyntheticEvent) => {
    const elm = e.currentTarget.getAttribute('data-elm');
    if (elm && isToggleableElms(elm)) {
      dispatch(toggleElmVisibility(elm));
    }
  };

  const toggleList = (platform: TPlatformNames, game: string, list: EAvailableLists, slug: string) => {
    if (list === EAvailableLists.wishList) {
      isWished ? dispatch(removeGame(game, list, platform)) : dispatch(addGame({ game, list, platform, slug }));
    } else if (list === EAvailableLists.ownedList) {
      dispatch(setIsOwned(!isOwned));
      isOwned ? dispatch(removeGame(game, list, platform)) : dispatch(addGame({ game, list, platform, slug }));
    }
  };

  return (
    <GameDetailedContext.Provider
      value={{
        gameDetails,
        isMobile,
        isOwned,
        isWished,
        name: gameDetails?.name,
        platform: platformName,
        slug,
        toggleBlockVisibilty,
        toggleList,
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
