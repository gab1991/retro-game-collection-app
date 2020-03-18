import React from 'react';
import styles from './InputAuth.css';

export default function InputAuth(props) {
  const { type, label, placeholder, desc, onChange, onKeyPress, wrong } = props;

  return (
    <>
      {label && <label className={styles.Label}>{label}</label>}
      <input
        className={`${styles.InputAuth}
        ${wrong ? styles.WrongInput : null}
        `}
        desc={desc}
        type={type}
        placeholder={placeholder}
        onChange={e => onChange(e, desc)}
        onKeyPress={onKeyPress}
      />
      {wrong && <div className={styles.WrongMessage}>{wrong}</div>}
    </>
  );
}

// {
//     desc: 'Username',
//     type: 'text',
//     placeholder: 'Type name of your account'
//   },
