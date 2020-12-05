import React from 'react';
import { useDispatch } from 'react-redux';

import { hideErrModal } from '../../../../Store/Actions/appStateActions';
import ButtonNeon from '../../../UI/Buttons/ButtonNeon/ButtonNeon';
import FailureSvg from '../../LogoSvg/FailureSvg/FailureSvg';
import { Blackdrop } from 'Components/UI';

import styles from './ErrorModal.module.scss';

export default function ErrorModal(props) {
  const dispatch = useDispatch();
  const {
    message,
    btnTxtContent = 'OK',
    onBackdropClick = () => {
      dispatch(hideErrModal());
    },
    onBtnClick = () => {
      dispatch(hideErrModal());
    },
  } = props;

  return (
    <div className={styles.ErrorModal}>
      <Backdrop onClick={onBackdropClick} closeIcon={true} show />
      <div className={styles.ErrorModalMain}>
        <div className={styles.ErrorSvgContainer}>
          <FailureSvg />
        </div>
        <div className={styles.MessageSection}>
          <p>{message}</p>
          <ButtonNeon txtContent={btnTxtContent} onClick={onBtnClick} color={'red'} />
        </div>
      </div>
    </div>
  );
}
