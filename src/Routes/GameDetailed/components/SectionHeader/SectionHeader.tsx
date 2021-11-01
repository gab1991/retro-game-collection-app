import React, { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

import { ChevronSvg, EscSvg } from 'Components/UI/Svg';

import styles from './SectionHeader.module.scss';

interface ISectionHeaderProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen?: boolean;
}

export function SectionHeader(props: ISectionHeaderProps) {
  const { children, isOpen, className, ...htmlProps } = props;

  return (
    <button className={cn(styles.SectionHeaderBtn, className)} {...htmlProps}>
      <h2>{children}</h2>
      {isOpen ? <EscSvg className={styles.SvgIcon} /> : <ChevronSvg className={styles.SvgIcon} />}
      <hr></hr>
    </button>
  );
}
