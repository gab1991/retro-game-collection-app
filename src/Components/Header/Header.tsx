import React, { useMemo, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Routes } from 'Routes';

import { EHeaderReducerActions } from './reducer/types';

import { Backdrop, ButtonNeon, MenuSideSlider } from 'Components/UI';
import { showAuthModal } from 'Store/appStateReducer/actions';
import { selectLoggedUser } from 'Store/authReducer/selectors';
import { logOutThunk } from 'Store/authReducer/thunks';

import { headerReducer, initial } from './reducer';

import styles from './Header.module.scss';

export function Header(): JSX.Element {
  const loggedUser = useSelector(selectLoggedUser);
  const history = useHistory();
  const dispatchGlobal = useDispatch();
  const [{ showMenuSlider, showBackdrop }, dispatchLocal] = useReducer(headerReducer, initial);

  const toggleMenuSlider = () => {
    dispatchLocal({ type: EHeaderReducerActions.TOGGLE_MENU_SLIDER });
  };

  const hideMenu = () => {
    dispatchLocal({ type: EHeaderReducerActions.HIDE_MENU });
  };

  const toPlatformSelector = () => {
    history.push(Routes.PlatformSelector.makePath());
    toggleMenuSlider();
  };

  const toProfile = () => {
    history.push(Routes.Profile.makePath());
  };

  const loggingOut = () => {
    toPlatformSelector();
    hideMenu();
    dispatchGlobal(logOutThunk());
  };

  const showAuth = () => {
    dispatchGlobal(showAuthModal(true));
  };

  const menuSliderOptions = useMemo(() => {
    const standartOptions = [{ onClick: toPlatformSelector, option: 'SELECT PLATFORM' }];
    loggedUser && standartOptions.push({ onClick: loggingOut, option: 'LOG OUT' });
    return standartOptions;
  }, [loggedUser]);

  return (
    <header className={styles.Header}>
      <Backdrop onClick={hideMenu} show={showBackdrop} />
      <nav className={styles.Nav}>
        <ul className={styles.List}>
          <li>
            <button onClick={toggleMenuSlider} className={styles.ListItemBtn}>
              MENU
            </button>
          </li>
          <MenuSideSlider show={showMenuSlider} list={menuSliderOptions} />
          {loggedUser ? (
            <li className={`${styles.ProfileDesctop}`}>
              <button onClick={toProfile} className={styles.ListItemBtn}>
                PROFILE
              </button>
            </li>
          ) : (
            <ButtonNeon color={'green'} className={styles.Btn} rectangular onClick={showAuth}>
              Login
            </ButtonNeon>
          )}
        </ul>
      </nav>
    </header>
  );
}
