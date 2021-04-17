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

export interface ISignUpInput extends IInputBody {
  name: ESignUpInputs;
}
export interface ISignInInput extends IInputBody {
  name: ESignInInputs;
}

export type TSignUpInputs = Array<ISignUpInput>;
export type TSignInInputs = Array<ISignInInput>;

export type TAuthModalInputs = ESignUpInputs | ESignInInputs;
