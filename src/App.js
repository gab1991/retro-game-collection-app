import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { GameSelector, PlatformSelector } from 'Routes';

import GameDetailed from './Components/GameDetailed/GameDetailed';
import Layout from './Components/Layout/Layout';
import Profile from './Components/Profile/Profile';
import useWindowSize from './CustomHooks/useWindowSize';
import { checkCredentials } from './Store/Actions/authActions';
import { getProfileInfo } from './Store/Actions/profileActions';
import { setIsMobile } from 'Store/appStateReducer/actions';

import styles from './App.module.scss';
import sassVars from './Сonfigs/Variables.scss';

const mobileBreakPointWidth = parseInt(sassVars['breakpoints-mobile']);

function App(props) {
  const { isLogged } = props;
  const { width } = useWindowSize();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkCredentials());
  }, [dispatch]);

  useEffect(() => {
    if (!isLogged) return;
    dispatch(getProfileInfo());
  }, [isLogged, dispatch]);

  useEffect(() => {
    if (width < mobileBreakPointWidth) {
      dispatch(setIsMobile(true));
    } else {
      dispatch(setIsMobile(false));
    }
  }, [width, dispatch]);

  console.log('1');

  return (
    <div className={styles.App}>
      <Layout>
        <Switch>
          <Route path='/profile/:section?' component={Profile} />
          <Route path='/:platformName/:gameSlug' component={GameDetailed} />
          <Route exact path='/:platformName' component={GameSelector} />
          <Route exact path='/' component={PlatformSelector} />
        </Switch>
      </Layout>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isLogged: state.logged,
  };
}

export default connect(mapStateToProps)(App);
