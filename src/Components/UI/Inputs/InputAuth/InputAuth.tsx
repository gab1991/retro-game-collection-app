import React, { ChangeEvent, useState } from 'react';

import styles from './InputAuth.module.scss';

interface IInputAuthProps {
  addToggler?: boolean;
  autoComplete?: 'on' | 'off';
  disabled: boolean;
  errorMsg?: string;
  label?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
    onChange,
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
          ></div>
        )}
      </div>
      {errorMsg && <div className={styles.WrongMessage}>{errorMsg}</div>}
    </>
  );
}
