import React, { useReducer } from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Backdrop, ButtonNeon, MenuSideSlider } from 'Components/UI';
import { showAuthModal } from 'Store/appStateReducer/actions';
import { logOut } from 'Store/authReducer/actions';

import styles from './Header.module.scss';

function headerReducer(state, { type, payload }) {
  switch (type) {
    case 'TOGGLE_MENU_SLIDER': {
      const { showMenuSlider, showBackdrop } = state;
      return {
        ...state,
        showBackdrop: !showBackdrop,
        showMenuSlider: !showMenuSlider,
      };
    }
    case 'HIDE_MENU': {
      return {
        ...state,
        showBackdrop: false,
        showMenuSlider: false,
      };
    }
    default:
      return state;
  }
}

function Header(props) {
  const { userData } = props;
  const dispatchGlobal = useDispatch();
  const [{ showMenuSlider, showBackdrop }, dispatchLocal] = useReducer(headerReducer, {
    showBackdrop: false,
    showMenuSlider: false,
  });

  const toggleMenuSlider = () => {
    dispatchLocal({ type: 'TOGGLE_MENU_SLIDER' });
  };

  const hideMenu = () => {
    dispatchLocal({ type: 'HIDE_MENU' });
  };

  const toPlatformSelector = () => {
    props.history.push('/');
    toggleMenuSlider();
  };

  const toProfile = () => {
    props.history.push('/profile');
  };

  const loggingOut = () => {
    toPlatformSelector();
    hideMenu();
    dispatchGlobal(logOut());
  };

  const showAuth = () => {
    dispatchGlobal(showAuthModal(true));
  };

  return (
    <header className={styles.Header}>
      <Backdrop onClick={hideMenu} show={showBackdrop} />
      <nav className={styles.Nav}>
        <ul className={styles.List}>
          <li className={styles.ListItem} onClick={toggleMenuSlider}>
            MENU
          </li>
          <MenuSideSlider
            slideLeft
            show={showMenuSlider}
            list={[
              { onClick: toPlatformSelector, option: 'SELECT PLATFORM' },
              !!userData && { onClick: loggingOut, option: 'LOG OUT' },
            ]}
          />
          {userData ? (
            <li onClick={toProfile} className={`${styles.ProfileDesctop} ${styles.ListItem}`}>
              PROFILE
            </li>
          ) : (
            <ButtonNeon txtContent='Login' color={'green'} className={styles.Btn} rectangular onClick={showAuth} />
          )}
        </ul>
      </nav>
    </header>
  );
}

function mapStateToProps(state) {
  return {
    profileInfo: state.profile,
    userData: state.logged.username,
  };
}
export default connect(mapStateToProps)(withRouter(Header));
