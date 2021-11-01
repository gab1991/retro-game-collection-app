import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffectCallback } from 'CustomHooks';
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
import { TAuthModalErrors } from 'Store/authReducer/types';

import { SIGN_IN_INPUTS, SIGN_UP_INPUTS } from 'Components/AuthModal/inputs';
import { validateAuthModalInput } from 'Components/AuthModal/validation';
import { selectSignInErrs, selectSignUpErrs } from 'Store/authReducer/selectors';

const AuthModalContext = React.createContext<null | IAuthModalProviderContext>(null);

interface IAuthModalProviderProps {
  children?: JSX.Element;
}

interface IAuthModalProviderContext {
  activeSide: EAuthModalSides;
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
  const signInErrors = useSelector(selectSignInErrs);
  const singUpErrors = useSelector(selectSignUpErrs);
  const signInInputs = inputs.signIn;
  const signUpInputs = inputs.signUp;

  const setApiErr = useEffectCallback((errObj: TAuthModalErrors, side: EAuthModalSides): void => {
    const { err, field } = errObj;

    const updState = produce(inputs, (draft) => {
      const ind = draft[side].findIndex((input: ISignInInput | ISignUpInput) => input.name === field);
      draft[side][ind].errMsg = err;
      draft[side][ind].valid = false;
    });

    setInputs(updState);
  });

  useEffect(() => {
    if (signInErrors) {
      setApiErr(signInErrors, EAuthModalSides.signIn);
    }
    if (singUpErrors) {
      setApiErr(singUpErrors, EAuthModalSides.signUp);
    }
  }, [signInErrors, singUpErrors, setApiErr]);

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

  const toSignUp = () => setActiveSide(EAuthModalSides.signUp);

  const toSignIn = () => setActiveSide(EAuthModalSides.signIn);

  return (
    <AuthModalContext.Provider
      value={{
        activeSide,
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
