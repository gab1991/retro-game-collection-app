import React from 'react';
import { useDispatch } from 'react-redux';
import { hideInfoModal } from '../../../../Store/Actions/modalActions';
import InfoSvg from '../../LogoSvg/InfoSvg/InfoSvg';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import ButtonNeon from '../../../UI/Buttons/ButtonNeon/ButtonNeon';
import styles from './InfoModal.module.scss';

export default function InfoModal(props) {
  const dispatch = useDispatch();
  const { message, btnTxtContent = 'OK' } = props;

  const hideModal = () => {
    dispatch(hideInfoModal());
  };

  return (
    <div className={styles.InfoModal}>
      <Backdrop onClick={hideModal} closeIcon={true} show />
      <div className={styles.InfoModalMain}>
        <div className={styles.InfoSvgContainer}>
          <InfoSvg />
        </div>
        <div className={styles.MessageSection}>
          <p>{message}</p>
          <ButtonNeon
            txtContent={btnTxtContent}
            onClick={hideModal}
            color={'red'}
          />
        </div>
      </div>
    </div>
  );
}
