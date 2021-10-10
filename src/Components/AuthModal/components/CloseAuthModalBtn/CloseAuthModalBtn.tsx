import React, { HTMLAttributes } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import { CloseSvg } from 'Components/UI/LogoSvg';
import { showAuthModal } from 'Store/appStateReducer/actions';

import styles from './CloseAuthModalBtn.module.scss';

type TCloseAuthModalBtn = HTMLAttributes<HTMLButtonElement>;

export function CloseAuthModalBtn(props: TCloseAuthModalBtn): JSX.Element {
  const { className, ...htmlProps } = props;
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch(showAuthModal(false));
  };

  return (
    <button className={cn(styles.CloseAuthBtn, className)} onClick={closeModalHandler} {...htmlProps}>
      <CloseSvg fill='white' />
    </button>
  );
}
