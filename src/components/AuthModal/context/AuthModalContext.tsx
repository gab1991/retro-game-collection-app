import React, { SyntheticEvent, useCallback, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import { Backend, HttpRespStats } from 'Backend';

import { ISignUpData } from 'Backend/types';
import {
  ESignInInputs,
  ESignUpInputs,
  TAuthModalInputs,
  TSignInInputs,
  TSignUpInputs,
} from 'Components/AuthModal/types';

import { validateAuthModalInput } from 'Components/AuthModal/validation';
import { selectIsMobile } from 'Store/appStateReducer/selectors';

const SIGN_IN_INPUTS: TSignInInputs = {
  password: {
    label: 'Password',
    placeholder: 'Type your password',
    type: 'password',
    valid: false,
    value: '',
  },
  username: {
    label: 'Username',
    placeholder: 'Type name of your account',
    type: 'text',
    valid: false,
    value: '',
  },
};

const AuthModalContext = React.createContext<null | IAuthModalProviderContext>(null);

enum EAuthModalSides {
  signIn = 'signIn',
  signUp = 'signUp',
}

interface IAuthModalProviderProps {
  children?: JSX.Element;
}

interface IAuthModalProviderContext {
  isMobile: boolean;
  isSending: boolean;
  signInErrorCallBack: (err: AxiosError<{ err_message: string; field: ESignInInputs }>) => void;
  signInInputChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, input: ESignInInputs) => void;
  signInInputs: TSignInInputs;
  validateSignInInputs: () => boolean;
}

export function AuthModalProvider({ children }: IAuthModalProviderProps): JSX.Element {
  const dispatch = useDispatch();
  const [signInInputs, setSignInInputs] = useState<TSignInInputs>(SIGN_IN_INPUTS);
  const isMobile = useSelector(selectIsMobile);
  const [isSending, setIsSending] = useState(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>, input: TAuthModalInputs, side: EAuthModalSides) => {
    const currentValue = e.currentTarget.value;

    if (side === EAuthModalSides.signIn) {
      setSignInInputs((prev) => ({ ...prev, [input]: { ...prev[input], value: currentValue } }));
    }

    const { errMessage, isValid } = validateAuthModalInput(input, currentValue);

    if (side === EAuthModalSides.signIn) {
      isValid
        ? setSignInInputs((prev) => ({ ...prev, [input]: { ...prev[input], errMsg: '', valid: true } }))
        : setSignInInputs((prev) => ({ ...prev, [input]: { ...prev[input], errMsg: errMessage, valid: false } }));
    }
  };

  const signInInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, input: ESignInInputs) =>
    changeHandler(e, input, EAuthModalSides.signIn);

  const validateSignInInputs = () => {
    let isValid = true;

    const inputsNames = Object.keys(signInInputs);

    inputsNames.forEach((input) => {
      if (!signInInputs[input].valid) {
        isValid = false;
        setSignInInputs((prev) => ({
          ...prev,
          [input]: { ...prev[input], errMsg: 'This field is empty', valid: false },
        }));
      }
    });

    return isValid;
  };

  const signInErrorCallBack = (err: AxiosError<{ err_message: string; field: ESignInInputs }>) => {
    if (err.response?.status === HttpRespStats.badRequest && err.response.data.field) {
      const { err_message, field } = err.response.data;
      setSignInInputs((prev) => ({ ...prev, [field]: { ...prev[field], errMsg: err_message, valid: false } }));
    }
  };

  return (
    <AuthModalContext.Provider
      value={{ isMobile, isSending, signInErrorCallBack, signInInputChangeHandler, signInInputs, validateSignInInputs }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModalContext(): IAuthModalProviderContext {
  const context = React.useContext(AuthModalContext);

  if (!context) {
    throw new Error('useAuthModalContext has to be used within AuthModalContext');
  }
  return context;
}
