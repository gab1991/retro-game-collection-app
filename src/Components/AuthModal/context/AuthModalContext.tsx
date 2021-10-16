import React, { useState } from 'react';
import { produce } from 'immer';

import {
  EAuthModalSides,
  ESignInInputs,
  ESignUpInputs,
  ISignInInput,
  ISignUpInput,
  TAuthModalInputs,
  TSignInInputs,
  TSignUpInputs,
} from 'Components/AuthModal/types';

import { SIGN_IN_INPUTS, SIGN_UP_INPUTS } from 'Components/AuthModal/inputs';
import { validateAuthModalInput } from 'Components/AuthModal/validation';

const AuthModalContext = React.createContext<null | IAuthModalProviderContext>(null);

interface IAuthModalProviderProps {
  children?: JSX.Element;
}

interface IAuthModalProviderContext {
  activeSide: EAuthModalSides;
  setSignInErrField: (err_message: string, field: TAuthModalInputs) => void;
  setSignUpErrField: (err_message: string, field: TAuthModalInputs) => void;
  signInInputChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, input: ESignInInputs) => void;
  signInInputs: TSignInInputs;
  signUpInputChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, input: ESignUpInputs) => void;
  signUpInputs: TSignUpInputs;
  toSignIn: () => void;
  toSignUp: () => void;
  validateSignInInputs: () => boolean;
  validateSignUpInputs: () => boolean;
}

type TSideInputs = { [EAuthModalSides.signIn]: TSignInInputs; [EAuthModalSides.signUp]: TSignUpInputs };

export function AuthModalProvider({ children }: IAuthModalProviderProps): JSX.Element {
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

    const inputInd = inputs[side].findIndex((input: ISignInInput | ISignUpInput) => input.name === inputName);

    if (inputInd < 0) {
      return;
    }

    const { errMessage, isValid } = validateAuthModalInput(inputName, currentValue, inputs[side]);

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
      draft[side].forEach((input: ISignInInput | ISignUpInput) => {
        if (!input.valid) {
          isValid = false;

          if (!input.value.length) input.errMsg = 'This field is empty';
        }
      });
    });

    setInputs(updInputs);

    return isValid;
  };

  const validateSignInInputs = () => validateInputs(EAuthModalSides.signIn);

  const validateSignUpInputs = () => validateInputs(EAuthModalSides.signUp);

  const setErrField = (err_message: string, field: TAuthModalInputs, side: EAuthModalSides) => {
    const updInputs = produce(inputs, (draft) => {
      const updIndex = draft[side].findIndex((input: ISignInInput | ISignUpInput) => input.name === field);

      if (updIndex < -1) {
        return;
      }

      draft[side][updIndex].errMsg = err_message;
      draft[side][updIndex].valid = false;
    });

    setInputs(updInputs);
  };

  const setSignInErrField = (err_message: string, field: TAuthModalInputs) =>
    setErrField(err_message, field, EAuthModalSides.signIn);

  const setSignUpErrField = (err_message: string, field: TAuthModalInputs) =>
    setErrField(err_message, field, EAuthModalSides.signUp);

  const toSignUp = () => setActiveSide(EAuthModalSides.signUp);

  const toSignIn = () => setActiveSide(EAuthModalSides.signIn);

  return (
    <AuthModalContext.Provider
      value={{
        activeSide,
        setSignInErrField,
        setSignUpErrField,
        signInInputChangeHandler,
        signInInputs,
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
