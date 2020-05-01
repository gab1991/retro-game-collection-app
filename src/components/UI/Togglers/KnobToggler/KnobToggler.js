import React, { useRef, useEffect } from 'react';
import styles from '../KnobToggler/KnobToggler.module.scss';

export default function KnobToggler(props) {
  const { width = '50px', message, onChangeHandler, checked } = props;
  const input = useRef();

  useEffect(() => {
    if (input.current)
      input.current.style.setProperty('--checkbox-width', width);
  }, [input, width]);

  return (
    <div className={styles.KnobToggler}>
      <p>{message}</p>
      <input
        ref={input}
        checked={checked}
        type="checkbox"
        onChange={onChangeHandler}></input>
    </div>
  );
}
