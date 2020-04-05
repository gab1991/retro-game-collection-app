import React from 'react';
import styles from './Input.module.css';

export default function Input(props) {
  const { type, placeholder, name, onChange, onKeyPress } = props;
  return (
    <div className={styles.InputWrapper}>
      <input
        className={styles.Input}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </div>
  );
}
