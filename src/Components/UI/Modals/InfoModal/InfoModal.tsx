import React from 'react';
import { useDispatch } from 'react-redux';

import { Backdrop, ButtonNeon } from 'Components/UI';
import { InfoSvg } from 'Components/UI/LogoSvg';
import { hideInfoModal } from 'Store/appStateReducer/actions';

import styles from './InfoModal.module.scss';

export interface IInfoModalProps {
  btnTxtContent?: string;
  message?: string;
}

export function InfoModal(props: IInfoModalProps): JSX.Element {
  const dispatch = useDispatch();
  const { message, btnTxtContent = 'OK' } = props;

  const hideModal = () => {
    dispatch(hideInfoModal());
  };

  return (
    <div className={styles.InfoModal}>
      <Backdrop onClick={hideModal} show />
      <div className={styles.InfoModalMain}>
        <div className={styles.InfoSvgContainer}>
          <InfoSvg />
        </div>
        <div className={styles.MessageSection}>
          <p>{message}</p>
          <ButtonNeon onClick={hideModal} color='red'>
            {btnTxtContent}
          </ButtonNeon>
        </div>
      </div>
    </div>
  );
}
