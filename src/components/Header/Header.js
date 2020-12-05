import React, { useReducer } from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { showAuthModal } from '../../Store/Actions/appStateActions';
import { logOut } from '../../Store/Actions/authActions';
import ButtonNeon from '../UI/Buttons/ButtonNeon/ButtonNeon';
import MenuSideSlider from '../UI/MenuSideSlider/MenuSideSlider';
import { Backdrop } from 'Components/UI';

import styles from './Header.module.scss';

function headerReducer(state, { type, payload }) {
  switch (type) {
    case 'TOGGLE_MENU_SLIDER': {
      const { showMenuSlider, showBackdrop } = state;
      return {
        ...state,
        showMenuSlider: !showMenuSlider,
        showBackdrop: !showBackdrop,
      };
    }
    case 'HIDE_MENU': {
      return {
        ...state,
        showMenuSlider: false,
        showBackdrop: false,
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
    showMenuSlider: false,
    showBackdrop: false,
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
              { option: 'SELECT PLATFORM', onClick: toPlatformSelector },
              userData && { option: 'LOG OUT', onClick: loggingOut },
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
    userData: state.logged,
    profileInfo: state.profile,
  };
}
export default connect(mapStateToProps)(withRouter(Header));
