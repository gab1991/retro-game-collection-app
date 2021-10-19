import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import cn from 'classnames';

import styles from './KnobToggler.module.scss';

interface IKnobTogglerProps extends InputHTMLAttributes<HTMLInputElement> {
  labelClassName?: string;
  width: string;
}

export function KnobToggler(props: IKnobTogglerProps): JSX.Element {
  const { width = '50px', children, labelClassName, ...htmlProps } = props;
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    //set up css var dynamically
    if (input.current) input.current.style.setProperty('--checkbox-width', width);
  }, [input, width]);

  htmlProps;
  return (
    <label className={cn(styles.KnobToggler, labelClassName)}>
      {children} <input ref={input} {...htmlProps} type='checkbox' />
    </label>
  );
}
