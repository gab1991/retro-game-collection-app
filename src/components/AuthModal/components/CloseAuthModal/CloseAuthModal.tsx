import React from 'react';
import { useDispatch } from 'react-redux';

import { CloseSvg } from 'Components/UI/LogoSvg';
import { showAuthModal } from 'Store/appStateReducer/actions';

import styles from './CloseAuthModal.module.scss';

export function CloseAuthModal(): JSX.Element {
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch(showAuthModal(false));
  };

  return (
    <div
      className={styles.CloseSvgWrapper}
      onClick={closeModalHandler}
      onKeyPress={closeModalHandler}
      role={'button'}
      tabIndex={0}
    >
      <CloseSvg />
    </div>
  );
}
