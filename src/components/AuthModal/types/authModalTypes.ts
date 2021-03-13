export enum ESignUpInputs {
  email = 'email',
  passConfirm = 'passConfirm',
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
