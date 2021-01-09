import React from 'react';
import { connect, useSelector } from 'react-redux';

import AuthModal from '../AuthModal/AuthModal';
import Header from '../Header/Header';
import { CornerNotifier, ErrorModal, InfoModal } from 'Components/UI/Modals';
import {
  selectAuthModalShowState,
  selectCornerNotifierShowState,
  selectErrorModalShowState,
  selectInfoMoadlShowState,
} from 'Store/appStateReducer/selectors';

import styles from './Layout.module.scss';

export default function Layout(props) {
  const showAuth = useSelector(selectAuthModalShowState);
  const showErr = useSelector(selectErrorModalShowState);
  const showInfo = useSelector(selectInfoMoadlShowState);
  const showCornNotifier = useSelector(selectCornerNotifierShowState);

  return (
    <div className={styles.Layout}>
      <Header />
      <main> {props.children}</main>
      <footer className={styles.Footer}>
        <p>
          <a href='https://rawg.io/' rel='noopener noreferrer' target='_blank'>
            RAWG
          </a>
          {'  is the source of the data and screenshots / boxarts are provided by '}
          <a href='https://emumovies.com/' rel='noopener noreferrer' target='_blank'>
            emumovies.com
          </a>
        </p>
      </footer>
      {showAuth && <AuthModal />}
      {showErr && <ErrorModal {...showErr} />}
      {showInfo && <InfoModal {...showInfo} />}
      {showCornNotifier && <CornerNotifier {...showCornNotifier} />}
    </div>
  );
}
