import React, { InputHTMLAttributes, useState } from 'react';
import cn from 'classnames';

import { Toggler } from '../Toggler/Toggler';

import styles from './Input.module.scss';

type TClassicInputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input(props: TClassicInputProps): JSX.Element {
  const { className, ...htmlProps } = props;

  return <input className={cn(styles.Input, className)} {...htmlProps} />;
}

interface IInputWithToggler extends InputHTMLAttributes<HTMLInputElement> {
  togglerType?: string;
}

export function InputWithToggler(props: IInputWithToggler): JSX.Element {
  const { className, type: propType = 'text', togglerType = 'text', ...htmlProps } = props;

  const [type, setType] = useState(propType);

  const onTogglerClick = () => setType((prev) => (prev === propType ? togglerType : propType));

  return (
    <div className={styles.TogglerInputContainer}>
      <input className={cn(styles.Input, className)} type={type} {...htmlProps} />
      <Toggler className={cn(styles.TogglerBtn)} onClick={onTogglerClick} pressed={type !== propType} />
    </div>
  );
}
