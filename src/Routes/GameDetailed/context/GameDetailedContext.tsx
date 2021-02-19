import React from 'react';

const GameDetailedContext = React.createContext<null | IGameDetailedProviderValue>(null);

interface IGameDetailedProviderProps {
  children?: JSX.Element;
}

interface IGameDetailedProviderValue {
  check: string;
}

export function GameDetailedProvider(props: IGameDetailedProviderProps): JSX.Element {
  const { children } = props;

  return (
    <GameDetailedContext.Provider
      value={{
        check: 'true',
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
