import React, { SyntheticEvent } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { isToggleableElms } from 'Routes/GameDetailed/reducer/types';
import { DeepReadonly } from 'utility-types';

import { EAvailableLists, TPlatformNames } from 'Configs/appConfig';
import { setIsOwned, setIsWished, toggleElmVisibility } from 'Routes/GameDetailed/reducer/actions';
import { selectGameDetails, selectIsOwned, selectIsWished } from 'Routes/GameDetailed/reducer/selectors';
import { addGame } from 'Routes/GameDetailed/reducer/thunks';
import { removeGame } from 'Routes/Profile/reducer/thunks';
import { selectIsMobile } from 'Store/appStateReducer/selectors';
import { IRawgGameDetails } from 'Typings/RawgData';

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
  toggleList: (platform: TPlatformNames, gameDetails: IRawgGameDetails, list: EAvailableLists) => void;
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
    // analyze later
    if (elm && isToggleableElms(elm)) {
      dispatch(toggleElmVisibility(elm));
    }
  };

  const toggleList = (platform: TPlatformNames, gameDetails: IRawgGameDetails, list: EAvailableLists) => {
    if (list === EAvailableLists.wishList) {
      batch(() => {
        dispatch(setIsWished(!isWished));
        isWished
          ? dispatch(removeGame(gameDetails.name, list, platform))
          : dispatch(addGame(gameDetails, list, platform));
      });
    } else if (list === EAvailableLists.ownedList) {
      dispatch(setIsOwned(!isOwned));
      isOwned ? dispatch(removeGame(gameDetails.name, list, platform)) : dispatch(addGame(gameDetails, list, platform));
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
