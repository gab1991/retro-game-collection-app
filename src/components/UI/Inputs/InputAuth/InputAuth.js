import React, { useState } from 'react';
import styles from './InputAuth.css';
import eyeicon from '../../../../assets/images/ui/eye-regular.svg';

export default function InputAuth(props) {
  const {
    type,
    label,
    placeholder,
    desc,
    onChange,
    onKeyPress,
    wrong,
    addToggler
  } = props;
  const [typeChanger, setTypeChanger] = useState(type);

  const passVisibilityHandler = e => {
    setTypeChanger(prevType => (prevType === 'text' ? 'password' : 'text'));
  };

  return (
    <>
      {label && <label className={styles.Label}>{label}</label>}
      <div className={styles.InputContainer}>
        <input
          className={`${styles.InputAuth}
        ${wrong ? styles.WrongInput : null}
        `}
          desc={desc}
          type={typeChanger}
          placeholder={placeholder}
          onChange={e => onChange(e, desc)}
          onKeyPress={onKeyPress}
        />
        {addToggler === 'hideShowToggler' && (
          <div
            className={`${styles.HideShowToggler} ${
              typeChanger === 'text' ? styles.HideShowTogglerActive : null
            }`}
            onClick={passVisibilityHandler}>
            <img src={eyeicon}></img>
          </div>
        )}
      </div>
      {wrong && <div className={styles.WrongMessage}>{wrong}</div>}
    </>
  );
}
