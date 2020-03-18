import React from 'react';
import styles from './Input.css';

export default function Input(props) {
  const { type, placeholder, name, onChange, onKeyPress } = props;
  return (
    <input
      className={styles.Input}
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  );
}
