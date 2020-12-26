import React from 'react';
import { connect, useSelector } from 'react-redux';

import AuthModal from '../AuthModal/AuthModal';
import Header from '../Header/Header';
import { CornerNotifier, ErrorModal, InfoModal } from 'Components/UI/Modals';
import {
  getCornerNotifierShowState,
  getErrorModalShowState,
  getInfoMoadlShowState,
  getShowAuthModalState,
} from 'Store/appStateReducer/selectors';

import styles from './Layout.module.scss';

function Layout(props) {
  const showAuth = useSelector(getShowAuthModalState);
  const showErr = useSelector(getErrorModalShowState);
  const showInfo = useSelector(getInfoMoadlShowState);
  const showCornNotifier = useSelector(getCornerNotifierShowState);

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

function mapStateToProps(state) {
  return {
    userData: state.logged,
  };
}

export default connect(mapStateToProps)(Layout);
