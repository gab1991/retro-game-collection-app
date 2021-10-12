import React, { HtmlHTMLAttributes } from 'react';
import cn from 'classnames';

import { EyeSvg } from 'Components/UI/LogoSvg';

import styles from './Toggler.module.scss';

interface IClassicInputToggler extends HtmlHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
}

export function Toggler(props: IClassicInputToggler): JSX.Element {
  const { className, pressed, ...htmlProps } = props;

  return (
    <button className={cn(styles.Toggler, { [styles.Toggler_pressed]: pressed }, className)} {...htmlProps}>
      <EyeSvg className={styles.EveSvg} />
    </button>
  );
}
