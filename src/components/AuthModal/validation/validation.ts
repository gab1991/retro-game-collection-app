import { ESignUpInputs } from 'Components/AuthModal/types';

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
  password = 'Password must contain at least one number and 4 to 15 chars',
  username = 'Only numbers and letters allowed',
}

interface IValidateAuthModalInputsReturn {
  errMessage: string;
  isValid: boolean;
}

export const validateAuthModalInput = (input: ESignUpInputs, value: string): IValidateAuthModalInputsReturn => {
  let isValid = true;
  let errMessage = '';

  if (!value) {
    isValid = false;
    errMessage = EValidateAuthModalInputErrors.emptyValue;
  }

  switch (input) {
    case ESignUpInputs.username: {
      isValid = validate('username', value);
      errMessage = EValidateAuthModalInputErrors.username;
      break;
    }
    case ESignUpInputs.email: {
      isValid = validate('email', value);
      errMessage = EValidateAuthModalInputErrors.email;
      break;
    }
    case ESignUpInputs.password:
    case ESignUpInputs.passConfirm: {
      isValid = validate('password', value);
      errMessage = EValidateAuthModalInputErrors.password;
      break;
    }
  }
  return { errMessage, isValid };
};
