import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { ButtonNeon } from 'Components/UI';
import { hideCornerNotifier } from 'Store/appStateReducer/actions';

import styles from './CornerNotifier.module.scss';

export interface ICornerNotifierProps {
  message: string;
  linkText: string;
  linkDir: string;
  btnText: string;
  onCancelClick: () => void;
  corner: string;
  show: boolean;
  removeTime: number;
}

export function CornerNotifier(props: ICornerNotifierProps): JSX.Element {
  const { message, linkText, linkDir, btnText, onCancelClick, corner, show, removeTime } = props;
  const [showing, setShowing] = useState(false);
  const [grabbed, setGrabbed] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setShowing(show);
  }, [show]);

  useEffect(() => {
    if (removeTime && show) {
      const interval = setTimeout(() => {
        setShowing(false);
        dispatch(hideCornerNotifier());
      }, removeTime);
      return () => clearInterval(interval);
    }
  }, [removeTime, show, dispatch]);

  const hide = () => {
    setShowing(false);
    setGrabbed(false);
  };

  const grab = (val) => {
    setGrabbed(val);
  };

  return (
    <div
      className={`${styles.CornerNotifier} ${styles[corner]}  ${showing ? styles.Showing : null} ${
        grabbed ? styles.Showing : null
      }`}
      onMouseEnter={() => grab(true)}
      onMouseLeave={() => grab(false)}
    >
      <p>
        {message}
        {linkDir && <Link to={linkDir}>{linkText}</Link>}
        {btnText && (
          <ButtonNeon
            txtContent={btnText}
            color='red'
            onClick={() => {
              onCancelClick();
              hide();
            }}
          />
        )}
      </p>
    </div>
  );
}
