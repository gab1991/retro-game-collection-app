import React, { useState } from 'react';
import styles from './InputAuth.module.scss';
import eyeicon from '../../../../Assets/images/ui/eye-regular.svg';

export default function InputAuth(props) {
  const {
    type,
    label,
    value,
    placeholder,
    disabled,
    desc,
    onChange,
    onKeyPress,
    wrong,
    addToggler,
    autoComplete = 'on',
  } = props;
  const [typeChanger, setTypeChanger] = useState(type);

  const passVisibilityHandler = (e) => {
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
          desc={desc}
          type={typeChanger}
          placeholder={placeholder}
          onChange={(e) => onChange(e, desc)}
          onKeyPress={onKeyPress}
          disabled={disabled}
          value={value}
        />
        {addToggler === 'hideShowToggler' && (
          <div
            className={`${styles.HideShowToggler} ${
              typeChanger === 'text' ? styles.HideShowTogglerActive : null
            }`}
            onClick={passVisibilityHandler}>
            <img src={eyeicon} alt="eyeicon"></img>
          </div>
        )}
      </div>
      {wrong && <div className={styles.WrongMessage}>{wrong}</div>}
    </>
  );
}
