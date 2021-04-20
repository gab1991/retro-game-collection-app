import React, { useEffect, useRef } from 'react';

import uniqueId from 'lodash/uniqueId';

import styles from './KnobToggler.module.scss';

interface IKnobTogglerProps {
  checked: boolean;
  labelTxt: string;
  onChangeHandler: () => void;
  width: string;
}

export function KnobToggler(props: IKnobTogglerProps): JSX.Element {
  const { width = '50px', labelTxt, onChangeHandler, checked } = props;
  const id = uniqueId('knob_id');
  const input = useRef<HTMLInputElement>(null);

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
