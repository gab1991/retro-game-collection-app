import { ESignUpInputs, TAuthModalInputs, TSignInInputs, TSignUpInputs } from 'Components/AuthModal/types';

const regexList = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*\d).{4,15}$/,
  username: /^[a-zA-Z0-9]+$/,
};

type TAcceptableNames = keyof typeof regexList;

function validate(name: TAcceptableNames, value: string): boolean {
  return regexList[name].test(value);
}

enum EValidateAuthModalInputErrors {
  email = 'Wrong email',
  emptyValue = 'Fill this field',
  passConfirm = 'Passwords must match',
  password = 'Password must contain at least one number and 4 to 15 chars',
  username = 'Only numbers and letters allowed',
}

interface IValidateAuthModalInputsReturn {
  errMessage: EValidateAuthModalInputErrors | null;
  isValid: boolean;
}

export const validateAuthModalInput = (
  input: TAuthModalInputs,
  value: string,
  inputs: TSignInInputs | TSignUpInputs
): IValidateAuthModalInputsReturn => {
  let isValid = true;
  let errMessage: EValidateAuthModalInputErrors | null = null;

  if (!value) {
    isValid = false;
    errMessage = EValidateAuthModalInputErrors.emptyValue;
  }

  switch (input) {
    case ESignUpInputs.username: {
      isValid = validate('username', value);
      errMessage = isValid ? null : EValidateAuthModalInputErrors.username;
      break;
    }
    case ESignUpInputs.email: {
      isValid = validate('email', value);
      errMessage = isValid ? null : EValidateAuthModalInputErrors.email;
      break;
    }
    case ESignUpInputs.password: {
      isValid = validate('password', value);
      errMessage = isValid ? null : EValidateAuthModalInputErrors.password;
      break;
    }
    case ESignUpInputs.passConfirm: {
      const passValue = (inputs as TSignUpInputs).find((input) => input.name === ESignUpInputs.password)?.value || '';
      isValid = passValue === value;
      errMessage = isValid ? null : EValidateAuthModalInputErrors.passConfirm;
      break;
    }
  }
  return { errMessage, isValid };
};
