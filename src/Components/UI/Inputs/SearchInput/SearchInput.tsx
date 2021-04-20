import React, { ChangeEvent, SyntheticEvent } from 'react';

import { MemoMagnifyingGlassSvg } from 'Components/UI/LogoSvg';

import styles from './SearchInput.module.scss';

interface ISearchInput {
  className?: string;
  isFocused?: boolean;
  name?: string;
  onBtnClick?: (e: SyntheticEvent) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: SyntheticEvent) => void;
  placeholder?: string;
  type: string;
  value?: string;
}

export function SearchInput(props: ISearchInput): JSX.Element {
  const { type, placeholder, name, onChange, onKeyPress, onBtnClick, value, className } = props;

  return (
    <div className={`${styles.InputWrapper} ${className}`}>
      <input
        className={styles.Input}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        onKeyPress={onKeyPress}
        autoComplete='off'
        value={value}
        //autoFocus={isFocused} accesability issues
      />

      <button name='searchBtn' className={styles.SearchBtn} onClick={onBtnClick}>
        <MemoMagnifyingGlassSvg />
      </button>
    </div>
  );
}
