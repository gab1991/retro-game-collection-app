import React, { ChangeEvent, useState } from 'react';

import eyeicon from '../../../../Assets/images/svg/eye-regular.svg';

import styles from './InputAuth.module.scss';

export enum TogglerOptions {
  'hideShowToggler',
}

interface IInputAuthProps {
  addToggler: TogglerOptions;
  autoComplete: 'on' | 'off';
  dataDesc: string;
  disabled: boolean;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>, dataDesc: string) => void;
  onKeyPress: () => void;
  placeholder: string;
  type: string;
  value: string;
  wrong: boolean;
}

export function InputAuth(props: IInputAuthProps): JSX.Element {
  const {
    type,
    label,
    value,
    placeholder,
    disabled,
    dataDesc,
    onChange,
    onKeyPress,
    wrong,
    addToggler,
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
        ${wrong ? styles.WrongInput : null}
        `}
          autoComplete={autoComplete}
          data-desc={dataDesc}
          type={typeChanger}
          placeholder={placeholder}
          onChange={(e) => onChange(e, dataDesc)}
          onKeyPress={onKeyPress}
          disabled={disabled}
          value={value}
        />
        {addToggler === TogglerOptions['hideShowToggler'] && (
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
      {wrong && <div className={styles.WrongMessage}>{wrong}</div>}
    </>
  );
}
