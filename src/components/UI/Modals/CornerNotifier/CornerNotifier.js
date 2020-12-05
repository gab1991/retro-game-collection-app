import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { hideCornerNotifier } from '../../../../Store/Actions/appStateActions';
import { ButtonNeon } from 'Components/UI';

import styles from './CornerNotifier.module.scss';

export default function CornerNotifier(props) {
  const { message, linkText, linkDir, btnText, onCancelClick, corner, show, removeTime } = props;
  const [showing, setShowing] = useState();
  const [grabbed, setGrabbed] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setShowing(show);
  }, [show]);

  useEffect(() => {
    if (removeTime && show) {
      let interval;
      interval = setTimeout(() => {
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
