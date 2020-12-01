import React, { useRef, useEffect } from 'react';
import uniqueId from 'lodash/uniqueId';
import styles from './KnobToggler.module.scss';

export default function KnobToggler(props) {
  const { width = '50px', labelTxt, onChangeHandler, checked } = props;
  const id = uniqueId('knob_id');
  const input = useRef();

  useEffect(() => {
    if (input.current) input.current.style.setProperty('--checkbox-width', width);
  }, [input, width]);

  return (
    <div className={styles.KnobToggler}>
      <label htmlFor={id}>{labelTxt}</label>
      <input id={id} ref={input} checked={checked} type='checkbox' onChange={onChangeHandler}></input>
    </div>
  );
}
