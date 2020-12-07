import React from 'react';
import { useDispatch } from 'react-redux';

import { hideInfoModal } from '../../../../Store/Actions/appStateActions';
import { Backdrop, ButtonNeon } from 'Components/UI';
import { InfoSvg } from 'Components/UI/LogoSvg';

import styles from './InfoModal.module.scss';

interface IInfoModalProps {
  message: string;
  btnTxtContent: string;
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
          <ButtonNeon txtContent={btnTxtContent} onClick={hideModal} color={'red'} />
        </div>
      </div>
    </div>
  );
}
