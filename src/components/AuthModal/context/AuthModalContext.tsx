import React, { SyntheticEvent, useCallback, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import { Backend, HttpRespStats } from 'Backend';

import { ISignUpData } from 'Backend/types';

import { selectIsMobile } from 'Store/appStateReducer/selectors';

const AuthModalContext = React.createContext<null | IAuthModalProviderContext>(null);

interface IAuthModalProviderProps {
  children?: JSX.Element;
}

interface IAuthModalProviderContext {
  isMobile: boolean;
  isSending: boolean;
}

export function AuthModalProvider({ children }: IAuthModalProviderProps): JSX.Element {
  const dispatch = useDispatch();
  const isMobile = useSelector(selectIsMobile);
  const [isSending, setIsSending] = useState(false);

  return <AuthModalContext.Provider value={{ isMobile, isSending }}>{children}</AuthModalContext.Provider>;
}

export function useAuthModalContext(): IAuthModalProviderContext {
  const context = React.useContext(AuthModalContext);

  if (!context) {
    throw new Error('useAuthModalContext has to be used within AuthModalContext');
  }
  return context;
}
