import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import { HttpRespStats } from 'Backend';

import {
  EAuthModalSides,
  ESignInInputs,
  ESignUpInputs,
  TAuthModalInputs,
  TSignInInputs,
  TSignUpInputs,
} from 'Components/AuthModal/types';

import { SIGN_IN_INPUTS, SIGN_UP_INPUTS } from 'Components/AuthModal/inputs';
import { validateAuthModalInput } from 'Components/AuthModal/validation';
import { selectIsMobile } from 'Store/appStateReducer/selectors';

const AuthModalContext = React.createContext<null | IAuthModalProviderContext>(null);

interface IAuthModalProviderProps {
  children?: JSX.Element;
}

interface IAuthModalProviderContext {
  activeSide: EAuthModalSides;
  isMobile: boolean;
  signInErrorCallBack: (err: AxiosError<{ err_message: string; field: ESignInInputs }>) => void;
  signInInputChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, input: ESignInInputs) => void;
  signInInputs: TSignInInputs;
  signUpErrorCallBack: (err: AxiosError<{ err_message: string; field: ESignInInputs }>) => void;
  signUpInputChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, input: ESignUpInputs) => void;
  signUpInputs: TSignUpInputs;
  toSignIn: () => void;
  toSignUp: () => void;
  validateSignInInputs: () => boolean;
  validateSignUpInputs: () => boolean;
}

export function AuthModalProvider({ children }: IAuthModalProviderProps): JSX.Element {
  const [activeSide, setActiveSide] = useState(EAuthModalSides.signIn);
  const [signInInputs, setSignInInputs] = useState(SIGN_IN_INPUTS);
  const [signUpInputs, setSignUpInputs] = useState(SIGN_UP_INPUTS);
  const isMobile = useSelector(selectIsMobile);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>, input: TAuthModalInputs, side: EAuthModalSides) => {
    const currentValue = e.currentTarget.value;

    if (side === EAuthModalSides.signIn) {
      setSignInInputs((prev) => ({ ...prev, [input]: { ...prev[input], value: currentValue } }));
    } else if (side === EAuthModalSides.signUp) {
      setSignUpInputs((prev) => ({ ...prev, [input]: { ...prev[input], value: currentValue } }));
    }

    const { errMessage, isValid } = validateAuthModalInput(input, currentValue);

    if (side === EAuthModalSides.signIn) {
      isValid
        ? setSignInInputs((prev) => ({ ...prev, [input]: { ...prev[input], errMsg: '', valid: true } }))
        : setSignInInputs((prev) => ({ ...prev, [input]: { ...prev[input], errMsg: errMessage, valid: false } }));
    } else if (side === EAuthModalSides.signUp) {
      isValid
        ? setSignUpInputs((prev) => ({ ...prev, [input]: { ...prev[input], errMsg: '', valid: true } }))
        : setSignUpInputs((prev) => ({ ...prev, [input]: { ...prev[input], errMsg: errMessage, valid: false } }));
    }
  };

  const signInInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, input: ESignInInputs) =>
    changeHandler(e, input, EAuthModalSides.signIn);

  const signUpInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, input: ESignUpInputs) =>
    changeHandler(e, input, EAuthModalSides.signUp);

  const validateInputs = (side: EAuthModalSides) => {
    const isSignInSide = side === EAuthModalSides.signIn;

    let isValid = true;

    const currentInputs = isSignInSide ? signInInputs : signUpInputs;
    const inputsNames = Object.keys(currentInputs);

    inputsNames.forEach((input) => {
      if (!currentInputs[input].valid) {
        isValid = false;
        isSignInSide
          ? setSignInInputs((prev) => ({
              ...prev,
              [input]: { ...prev[input], errMsg: 'This field is empty', valid: false },
            }))
          : setSignUpInputs((prev) => ({
              ...prev,
              [input]: { ...prev[input], errMsg: 'This field is empty', valid: false },
            }));
      }
    });

    return isValid;
  };

  const validateSignInInputs = () => validateInputs(EAuthModalSides.signIn);

  const validateSignUpInputs = () => validateInputs(EAuthModalSides.signUp);

  const signInErrorCallBack = (err: AxiosError<{ err_message: string; field: ESignInInputs }>) => {
    if (err.response?.status === HttpRespStats.badRequest && err.response.data.field) {
      const { err_message, field } = err.response.data;
      setSignInInputs((prev) => ({ ...prev, [field]: { ...prev[field], errMsg: err_message, valid: false } }));
    }
  };

  const signUpErrorCallBack = (err: AxiosError<{ err_message: string; field: ESignInInputs }>) => {
    if (err.response?.status === HttpRespStats.badRequest && err.response.data.field) {
      const { err_message, field } = err.response.data;
      setSignUpInputs((prev) => ({ ...prev, [field]: { ...prev[field], errMsg: err_message, valid: false } }));
    }
  };

  const toSignUp = () => setActiveSide(EAuthModalSides.signUp);

  const toSignIn = () => setActiveSide(EAuthModalSides.signIn);

  return (
    <AuthModalContext.Provider
      value={{
        activeSide,
        isMobile,
        signInErrorCallBack,
        signInInputChangeHandler,
        signInInputs,
        signUpErrorCallBack,
        signUpInputChangeHandler,
        signUpInputs,
        toSignIn,
        toSignUp,
        validateSignInInputs,
        validateSignUpInputs,
      }}
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
