import React from 'react';

import { GameDetailedProvider } from './context';
import { GameDetailedPage } from './GameDetailedPage';

export function GameDetailed(): JSX.Element {
  return (
    <GameDetailedProvider>
      <GameDetailedPage />
    </GameDetailedProvider>
  );
}
