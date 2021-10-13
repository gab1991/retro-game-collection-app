import React, { InputHTMLAttributes, useState } from 'react';
import cn from 'classnames';

import { Toggler } from '../Toggler/Toggler';

import styles from './Input.module.scss';

interface IClassicInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hintText?: string;
  isError?: boolean;
}

export function Input(props: IClassicInputProps): JSX.Element {
  const { className, hintText, isError, children, ...htmlProps } = props;

  return (
    <div className={styles.InputContainer}>
      <input className={cn(styles.Input, { [styles.Input_err]: isError }, className)} {...htmlProps} />
      {children}
      {hintText && <p className={styles.HintText}>{hintText}</p>}
    </div>
  );
}

interface IInputWithToggler extends IClassicInputProps {
  togglerType?: string;
}

export function InputWithToggler(props: IInputWithToggler): JSX.Element {
  const { type: propType = 'text', togglerType = 'text', ...htmlProps } = props;

  const [type, setType] = useState(propType);

  const onTogglerClick = () => setType((prev) => (prev === propType ? togglerType : propType));

  return (
    <Input {...htmlProps} type={type}>
      <Toggler className={cn(styles.TogglerBtn)} onClick={onTogglerClick} pressed={type !== propType} />
    </Input>
  );
}
