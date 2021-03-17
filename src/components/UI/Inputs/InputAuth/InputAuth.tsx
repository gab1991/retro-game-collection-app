import React, { ChangeEvent, useState } from 'react';

import eyeicon from '../../../../Assets/images/svg/eye-regular.svg';

import styles from './InputAuth.module.scss';

interface IInputAuthProps {
  addToggler?: boolean;
  autoComplete?: 'on' | 'off';
  disabled: boolean;
  errorMsg?: string;
  label?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  // onKeyPress: () => void;
  placeholder?: string;
  type: string;
  value: string;
}

export function InputAuth(props: IInputAuthProps): JSX.Element {
  const {
    type,
    label,
    value,
    placeholder,
    disabled,
    // dataDesc,
    onChange,
    // onKeyPress,
    errorMsg,
    addToggler = false,
    autoComplete = 'on',
  } = props;

  const [typeChanger, setTypeChanger] = useState(type);

  const passVisibilityHandler = () => {
    setTypeChanger((prevType) => (prevType === 'text' ? 'password' : 'text'));
  };

  return (
    <>
      {label && <label className={styles.Label}>{label}</label>}
      <div className={styles.InputContainer}>
        <input
          className={`${styles.InputAuth}
        ${errorMsg ? styles.WrongInput : null}
        `}
          autoComplete={autoComplete}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onKeyPress={() => null}
          disabled={disabled}
          value={value}
        />
        {addToggler && (
          <div
            className={`${styles.HideShowToggler} ${typeChanger === 'text' ? styles.HideShowTogglerActive : null}`}
            onClick={passVisibilityHandler}
            onKeyPress={passVisibilityHandler}
            role='button'
            tabIndex={0}
          >
            <img src={eyeicon} alt='eyeicon'></img>
          </div>
        )}
      </div>
      {errorMsg && <div className={styles.WrongMessage}>{errorMsg}</div>}
    </>
  );
}
