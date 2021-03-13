import React from 'react';

import { AuthModal as AuthModalContent } from './AuthModal';
import { AuthModalProvider } from './context';

export function AuthModal(): JSX.Element {
  return (
    <AuthModalProvider>
      <AuthModalContent />
    </AuthModalProvider>
  );
}
