import React, { Suspense, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { useWindowSize } from 'CustomHooks';
import { GameSelector, PlatformSelector, Profile } from 'Routes';

import Layout from './Components/Layout/Layout';
import { setIsMobile } from 'Store/appStateReducer/actions';
import { checkCredentials } from 'Store/authReducer/thunks';
import { getProfileInfo } from 'Store/profileReducer/thunks';

import styles from './App.module.scss';
import sassVars from './Configs/Variables.scss';

const mobileBreakPointWidth = parseInt(sassVars['breakpoints-mobile']);

const GameDetailed = React.lazy(() =>
  import(
    /* webpackChunkName: "GameDetailedPage" */
    './Routes/GameDetailed'
  ).then((module) => ({ default: module.GameDetailed }))
);

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

  return (
    <div className={styles.App}>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Layout>
          <Switch>
            <Route path='/profile/:section?' component={Profile} />
            <Route path='/:platformName/:slug' component={GameDetailed} />
            <Route exact path='/:platformName' component={GameSelector} />
            <Route exact path='/' component={PlatformSelector} />
          </Switch>
        </Layout>
      </Suspense>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isLogged: state.logged.username,
  };
}

export default connect(mapStateToProps)(App);
