import React from 'react';
import styles from './Layout.module.scss';
import { connect } from 'react-redux';
import Navigation from '../Navigation/Navigation';
import AuthModal from '../AuthModal/AuthModal';

function Layout(props) {
  const { showAuth } = props;

  return (
    <div className={styles.Layout}>
      <Navigation />
      {props.children}
      <footer className={styles.Footer}>
        <p>
          <a href="https://rawg.io/" target="_blank">
            RAWG
          </a>
          {
            '  is the source of the data and screenshots / boxarts are provided by '
          }
          <a href="https://emumovies.com/" target="_blank">
            emumovies.com
          </a>
        </p>
      </footer>
      {showAuth && <AuthModal />}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.logged,
    showAuth: state.showAuth,
  };
}

export default connect(mapStateToProps)(Layout);
