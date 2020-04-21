import React, { useRef, useEffect } from 'react';
import styles from '../KnobToggler/KnobToggler.module.scss';

export default function KnobToggler(props) {
  const { width = '50px' } = props;
  const input = useRef();

  useEffect(() => {
    if (input.current)
      input.current.style.setProperty('--checkbox-width', width);
  }, [input]);

  return (
    <div className={styles.KnobToggler}>
      <h3>Name</h3>
      <input ref={input} type="checkbox"></input>
    </div>
  );
}
