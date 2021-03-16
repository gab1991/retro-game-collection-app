import { ESignInInputs, ESignUpInputs, TSignInInputs, TSignUpInputs } from 'Components/AuthModal/types';

export const SIGN_IN_INPUTS: TSignInInputs = [
  {
    label: 'Username',
    name: ESignInInputs.username,
    placeholder: 'Type name of your account',
    type: 'text',
    valid: false,
    value: '',
  },
  {
    label: 'Password',
    name: ESignInInputs.password,
    placeholder: 'Type your password',
    type: 'password',
    valid: false,
    value: '',
  },
];

export const SIGN_UP_INPUTS: TSignUpInputs = [
  {
    label: 'Username',
    name: ESignUpInputs.username,
    placeholder: 'Type name of your account',
    type: 'text',
    valid: false,
    value: '',
  },
  {
    label: 'Email',
    name: ESignUpInputs.email,
    placeholder: 'Current email',
    type: 'email',
    valid: false,
    value: '',
  },
  {
    label: 'Password',
    name: ESignUpInputs.password,
    placeholder: 'Type your password',
    type: 'password',
    valid: false,
    value: '',
  },
  {
    label: 'Confirm Password',
    name: ESignUpInputs.passConfirm,
    placeholder: 'Confirm your password once again',
    type: 'password',
    valid: false,
    value: '',
  },
];
