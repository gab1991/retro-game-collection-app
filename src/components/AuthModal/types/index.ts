export enum EAuthModalSides {
  signIn = 'signIn',
  signUp = 'signUp',
}

export enum ESignUpInputs {
  email = 'email',
  passConfirm = 'passConfirm',
  password = 'password',
  username = 'username',
}

export enum ESignInInputs {
  password = 'password',
  username = 'username',
}

export interface IInputBody {
  errMsg?: string;
  label: string;
  placeholder: string;
  type: string;
  valid: boolean;
  value: string;
}

export type TSignUpInputs = { [key in ESignUpInputs]: IInputBody };
export type TSignInInputs = { [key in ESignInInputs]: IInputBody };
export type TAuthModalInputs = ESignUpInputs | ESignInInputs;
