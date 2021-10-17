import React, { InputHTMLAttributes, SyntheticEvent } from 'react';
import cn from 'classnames';

import { MemoMagnifyingGlassSvg } from 'Components/UI/LogoSvg';

import styles from './SearchInput.module.scss';

interface ISearchInput extends InputHTMLAttributes<HTMLInputElement> {
  onBtnClick?: (e: SyntheticEvent) => void;
  wrapperClassName?: string;
}

export function SearchInput(props: ISearchInput): JSX.Element {
  const { onBtnClick, wrapperClassName, className, ...htmlProps } = props;

  return (
    <div className={cn(styles.InputWrapper, wrapperClassName)}>
      <input className={cn(styles.Input, className)} autoComplete='off' {...htmlProps} />
      <button data-name='searchBtn' className={styles.SearchBtn} onClick={onBtnClick}>
        <MemoMagnifyingGlassSvg />
      </button>
    </div>
  );
}
