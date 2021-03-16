import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import { HttpRespStats } from 'Backend';
import { produce } from 'immer';

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

type TSideInputs = { [EAuthModalSides.signIn]: TSignInInputs; [EAuthModalSides.signUp]: TSignUpInputs };

export function AuthModalProvider({ children }: IAuthModalProviderProps): JSX.Element {
  const isMobile = useSelector(selectIsMobile);
  const [activeSide, setActiveSide] = useState(EAuthModalSides.signIn);
  const [inputs, setInputs] = useState<TSideInputs>({ signIn: SIGN_IN_INPUTS, signUp: SIGN_UP_INPUTS });
  const signInInputs = inputs.signIn;
  const signUpInputs = inputs.signUp;

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputName: TAuthModalInputs,
    side: EAuthModalSides
  ) => {
    const currentValue = e.currentTarget.value;

    const inputInd = inputs[side].findIndex((input) => input.name === inputName);

    if (inputInd < 0) {
      return;
    }

    const { errMessage, isValid } = validateAuthModalInput(inputName, currentValue);

    const updInputs = produce(inputs, (draft) => {
      draft[side][inputInd].value = currentValue;
      draft[side][inputInd].valid = isValid ? true : false;
      draft[side][inputInd].errMsg = errMessage ? errMessage : '';
    });

    setInputs(updInputs);
  };

  const signInInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, input: ESignInInputs) =>
    changeHandler(e, input, EAuthModalSides.signIn);

  const signUpInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, input: ESignUpInputs) =>
    changeHandler(e, input, EAuthModalSides.signUp);

  const validateInputs = (side: EAuthModalSides) => {
    let isValid = true;

    const updInputs = produce(inputs, (draft) => {
      draft[side].forEach((input) => {
        if (!input.valid) {
          isValid = false;
          if (input.value.length === 0) {
            input.errMsg = 'This field is empty';
          }
        }
      });
    });

    setInputs(updInputs);

    return isValid;
  };

  const validateSignInInputs = () => validateInputs(EAuthModalSides.signIn);

  const validateSignUpInputs = () => validateInputs(EAuthModalSides.signUp);

  const signInErrorCallBack = (err: AxiosError<{ err_message: string; field: ESignInInputs }>) => {
    if (err.response?.status === HttpRespStats.badRequest && err.response.data.field) {
      const { err_message, field } = err.response.data;
      // setSignInInputs((prev) => ({ ...prev, [field]: { ...prev[field], errMsg: err_message, valid: false } }));
    }
  };

  const signUpErrorCallBack = (err: AxiosError<{ err_message: string; field: ESignInInputs }>) => {
    if (err.response?.status === HttpRespStats.badRequest && err.response.data.field) {
      const { err_message, field } = err.response.data;
      // setSignUpInputs((prev) => ({ ...prev, [field]: { ...prev[field], errMsg: err_message, valid: false } }));
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
