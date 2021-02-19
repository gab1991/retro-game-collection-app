import React from 'react';

import { GameDetailedProvider } from './context';
import { GameDetailedContent } from './GameDetailedContent';

export function GameDetailed(): JSX.Element {
  return (
    <GameDetailedProvider>
      <GameDetailedContent />
    </GameDetailedProvider>
  );
}
